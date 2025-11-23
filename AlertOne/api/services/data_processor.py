from datetime import datetime, timedelta
from collections import defaultdict
from config.settings import Config
from services.user_service import user_service
import logging

logger = logging.getLogger(__name__)

class DataProcessor:
    
    @staticmethod
    def get_monthly_data(incidents, months=None):
        if months is None:
            months = Config.DEFAULT_MONTHS
        
        monthly_counts = defaultdict(int)
        now = datetime.now()
        
        for incident in incidents:
            timestamp = incident.get('timestamp')
            if timestamp:
                incident_date = DataProcessor._convert_timestamp(timestamp)
                month_key = incident_date.strftime('%Y-%m')
                monthly_counts[month_key] += 1
        
        result = []
        for i in range(months - 1, -1, -1):
            month_date = now - timedelta(days=30 * i)
            month_key = month_date.strftime('%Y-%m')
            result.append(monthly_counts.get(month_key, 0))
        
        return result
    
    @staticmethod
    def get_weekly_data(incidents, weeks=None):
        if weeks is None:
            weeks = Config.DEFAULT_WEEKS
        
        weekly_counts = defaultdict(int)
        now = datetime.now()
        
        for incident in incidents:
            timestamp = incident.get('timestamp')
            if timestamp:
                incident_date = DataProcessor._convert_timestamp(timestamp)
                days_diff = (now - incident_date).days
                week_num = days_diff // 7
                
                if week_num < weeks:
                    weekly_counts[week_num] += 1
        
        result = []
        for i in range(weeks - 1, -1, -1):
            result.append(weekly_counts.get(i, 0))
        
        return result
    
    @staticmethod
    def get_regional_data(incidents, months=None):
        if months is None:
            months = Config.DEFAULT_MONTHS
        
        region_list = Config.REGIONS
        regions = {region: [] for region in region_list}
        now = datetime.now()
        
        monthly_data = {region: defaultdict(int) for region in region_list}
        
        for incident in incidents:
            user_id = incident.get('userId')
            region = user_service.get_user_region(user_id)
        
            region_normalized = DataProcessor._normalize_region(region, region_list)
            
            if not region_normalized:
                continue
            
            timestamp = incident.get('timestamp')
            if timestamp:
                incident_date = DataProcessor._convert_timestamp(timestamp)
                month_key = incident_date.strftime('%Y-%m')
                monthly_data[region_normalized][month_key] += 1
        
        for region in region_list:
            for i in range(months - 1, -1, -1):
                month_date = now - timedelta(days=30 * i)
                month_key = month_date.strftime('%Y-%m')
                regions[region].append(monthly_data[region].get(month_key, 0))
        
        return [regions[region] for region in region_list], region_list
    
    @staticmethod
    def get_status_over_time(incidents, months=None):
        if months is None:
            months = Config.DEFAULT_AREA_MONTHS
        
        now = datetime.now()
        monthly_active = []
        
        for i in range(months - 1, -1, -1):
            month_start = now - timedelta(days=30 * (i + 1))
            month_end = now - timedelta(days=30 * i)
            
            active_count = 0
            for incident in incidents:
                timestamp = incident.get('timestamp')
                status = incident.get('status', 'active')
                
                if timestamp:
                    incident_date = DataProcessor._convert_timestamp(timestamp)
                    
                    if month_start <= incident_date <= month_end and status == 'active':
                        active_count += 1
            
            monthly_active.append(active_count)
        
        return monthly_active
    
    @staticmethod
    def get_regional_distribution(incidents):
        region_list = Config.REGIONS
        region_counts = {region: 0 for region in region_list}
        
        for incident in incidents:
            user_id = incident.get('userId')
            region = user_service.get_user_region(user_id)
            
            if region:
                region_normalized = DataProcessor._normalize_region(region, region_list)
                if region_normalized:
                    region_counts[region_normalized] += 1
        
        return [region_counts[region] for region in region_list], region_list
    
    @staticmethod
    def count_by_severity(incidents):
        severity_counts = {'high': 0, 'medium': 0, 'low': 0}
        
        for incident in incidents:
            severity = incident.get('severity', 'low').lower()
            if severity in severity_counts:
                severity_counts[severity] += 1
        
        return severity_counts
    
    @staticmethod
    def count_by_status(incidents, status):
        return sum(1 for inc in incidents if inc.get('status') == status)
    
    @staticmethod
    def _convert_timestamp(timestamp):
        if hasattr(timestamp, 'timestamp'):
            return datetime.fromtimestamp(timestamp.timestamp())
        return timestamp
    
    @staticmethod
    def _normalize_region(region, region_list):
        if not region:
            return None
        
        for standard_region in region_list:
            if region.strip().lower() == standard_region.lower():
                return standard_region
        
        return None