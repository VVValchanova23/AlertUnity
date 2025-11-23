from config.firebase import get_db
from utils.time_utils import (
    group_by_month,
    get_severity_distribution,
    get_severity_trend,
    get_cumulative_reports,
    get_hourly_distribution
)
import logging

logger = logging.getLogger(__name__)

class DisasterService:
    def __init__(self):
        self.db = get_db()
        self._cache = {}
    
    def get_incidents_from_firestore(self, collection_name):
        """Fetch incidents from Firestore collection"""
        try:
            collection_ref = self.db.collection(collection_name)
            docs = collection_ref.stream()
            
            incidents = []
            for doc in docs:
                data = doc.to_dict()
                data['id'] = doc.id
                incidents.append(data)
            
            return incidents
        
        except Exception as e:
            logger.error(f"Error fetching from {collection_name}: {str(e)}")
            return []
    
    def process_disaster_data(self, disaster_type):
        """Process disaster data for a specific type with chart data"""
        incidents = self.get_incidents_from_firestore(disaster_type)
        
        return {
            'type': disaster_type,
            'total_incidents': len(incidents),
            'monthly_trend': group_by_month(incidents),
            'incidents': incidents,
            'charts': {
                'severity_distribution': get_severity_distribution(incidents),
                'severity_trend': get_severity_trend(incidents),
                'cumulative_reports': get_cumulative_reports(incidents),
                'hourly_distribution': get_hourly_distribution(incidents)
            }
        }
    
    def get_all_disasters_data(self):
        """Get data for all disaster types with aggregated charts"""
        disaster_types = ['fires', 'floods', 'hurricanes', 'earthquakes']
        all_data = {}
        all_incidents = []
        
        for disaster_type in disaster_types:
            all_data[disaster_type] = self.process_disaster_data(disaster_type)
            all_incidents.extend(self.get_incidents_from_firestore(disaster_type))
        
        # Add aggregated charts for all disasters
        all_data['aggregated_charts'] = {
            'severity_distribution': get_severity_distribution(all_incidents),
            'severity_trend': get_severity_trend(all_incidents),
            'cumulative_reports': get_cumulative_reports(all_incidents),
            'hourly_distribution': get_hourly_distribution(all_incidents)
        }
        
        return all_data
    
    def get_overall_stats(self):
        """Get overall statistics across all disaster types with aggregated charts"""
        disaster_types = ['fires', 'floods', 'hurricanes', 'earthquakes']
        total_incidents = 0
        stats_by_type = {}
        all_incidents = []
        
        for disaster_type in disaster_types:
            incidents = self.get_incidents_from_firestore(disaster_type)
            count = len(incidents)
            total_incidents += count
            stats_by_type[disaster_type] = count
            all_incidents.extend(incidents)
        
        return {
            'total_incidents': total_incidents,
            'by_type': stats_by_type,
            'charts': {
                'severity_distribution': get_severity_distribution(all_incidents),
                'severity_trend': get_severity_trend(all_incidents),
                'cumulative_reports': get_cumulative_reports(all_incidents),
                'hourly_distribution': get_hourly_distribution(all_incidents)
            }
        }

disaster_service = DisasterService()