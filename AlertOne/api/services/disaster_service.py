from config.firebase import get_db
from config.settings import Config
from services.data_processor import DataProcessor
import logging

logger = logging.getLogger(__name__)

class DisasterService:
    
    def __init__(self):
        self.db = get_db()
        self.processor = DataProcessor()
    
    def get_incidents(self, collection_name):
        try:
            docs = self.db.collection(collection_name).stream()
            incidents = []
            
            for doc in docs:
                data = doc.to_dict()
                data['id'] = doc.id
                incidents.append(data)
            
            return incidents
        
        except Exception as e:
            logger.error(f"Error fetching incidents from {collection_name}: {str(e)}")
            raise
    
    def process_disaster_data(self, collection_name):
        try:
            incidents = self.get_incidents(collection_name)
            
            severity_counts = self.processor.count_by_severity(incidents)
            
            active_incidents = self.processor.count_by_status(incidents, 'active')
            
            pie_data, pie_labels = self.processor.get_regional_distribution(incidents)
            
            regional_data, region_names = self.processor.get_regional_data(incidents)
            
            area_data = self.processor.get_status_over_time(incidents)
            
            weekly_data = self.processor.get_weekly_data(incidents)
            
            false_alarms = self.processor.count_by_status(incidents, 'false alarm')
            resolved = self.processor.count_by_status(incidents, 'inactive')
            
            return {
                'activeIncidents': active_incidents,
                'totalIncidents': len(incidents),
                'pie': pie_data,
                'pieLabels': pie_labels,
                'line': regional_data,
                'regionNames': region_names,
                'area': area_data,
                'bar': weekly_data,
                'severityCounts': severity_counts,
                'falseAlarms': false_alarms,
                'resolved': resolved
            }
        
        except Exception as e:
            logger.error(f"Error processing {collection_name}: {str(e)}")
            return self._get_empty_response(str(e))
    
    def get_all_disasters_data(self):
        return {
            'fire': self.process_disaster_data('fires'),
            'flood': self.process_disaster_data('floods'),
            'hurricane': self.process_disaster_data('hurricane'),
            'earthquake': self.process_disaster_data('earthquake')
        }
    
    def get_overall_stats(self):
        fire_data = self.process_disaster_data('fires')
        flood_data = self.process_disaster_data('floods')
        hurricane_data = self.process_disaster_data('hurricane')
        earthquake_data = self.process_disaster_data('earthquake')
        
        return {
            'fire': fire_data['activeIncidents'],
            'flood': flood_data['activeIncidents'],
            'hurricane': hurricane_data['activeIncidents'],
            'earthquake': earthquake_data['activeIncidents'],
            'totalActive': (
                fire_data['activeIncidents'] +
                flood_data['activeIncidents'] +
                hurricane_data['activeIncidents'] +
                earthquake_data['activeIncidents']
            )
        }
    
    @staticmethod
    def _get_empty_response(error_message=""):
        region_count = len(Config.REGIONS)
        
        return {
            'error': error_message,
            'activeIncidents': 0,
            'totalIncidents': 0,
            'pie': [0] * region_count,
            'pieLabels': Config.REGIONS,
            'line': [[0] * Config.DEFAULT_MONTHS] * region_count,
            'regionNames': Config.REGIONS,
            'area': [0] * Config.DEFAULT_AREA_MONTHS,
            'bar': [0] * Config.DEFAULT_WEEKS,
            'severityCounts': {'high': 0, 'medium': 0, 'low': 0},
            'falseAlarms': 0,
            'resolved': 0
        }

disaster_service = DisasterService()