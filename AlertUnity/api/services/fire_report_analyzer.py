from datetime import datetime

class FireReportAnalyzer:
    """Utility class for analyzing and processing fire report data for AI"""
    
    def prepare_fire_data(self, reports):
        """Prepare fire report data for AI analysis"""
        total_reports = len(reports)
        
        severity_counts = {}
        status_counts = {}
        location_counts = {}
        month_counts = {}
        
        report_data = []
        
        for report in reports:
            timestamp = report.get('timestamp')
            if isinstance(timestamp, str):
                try:
                    date = datetime.fromisoformat(timestamp.replace('Z', '+00:00'))
                except:
                    date = datetime.now()
            elif isinstance(timestamp, dict) and '_seconds' in timestamp:
                date = datetime.fromtimestamp(timestamp['_seconds'])
            else:
                date = datetime.now()
            
            location = report.get('location') or report.get('address') or 'Unknown'
            severity = report.get('severity', 'low')
            status = report.get('status', 'active')
            description = report.get('description', 'No description')
            
            severity_counts[severity] = severity_counts.get(severity, 0) + 1
            status_counts[status] = status_counts.get(status, 0) + 1
            location_counts[location] = location_counts.get(location, 0) + 1
            month = date.month
            month_counts[month] = month_counts.get(month, 0) + 1
            
            report_data.append({
                'date': date.strftime('%Y-%m-%d'),
                'location': location,
                'severity': severity,
                'status': status,
                'description': description,
                'month': month,
                'year': date.year
            })
        
        top_locations = sorted(location_counts.items(), key=lambda x: x[1], reverse=True)[:5]
        
        return {
            'total_reports': total_reports,
            'severity_counts': severity_counts,
            'status_counts': status_counts,
            'top_locations': top_locations,
            'month_counts': month_counts,
            'recent_reports': report_data[:10]
        }
    
    def generate_fallback_feedback(self, data):
        """Generate basic analysis when AI is unavailable"""
        month_names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        
        high_risk_months = sorted(data['month_counts'].items(), key=lambda x: x[1], reverse=True)[:3]
        high_risk_months_text = [f"{month_names[month-1]} ({count} reports)" 
                                 for month, count in high_risk_months]
        
        top_locations_text = [f"{location} ({count} incidents)" 
                              for location, count in data['top_locations'][:3]]
        
        high_severity_rate = (data['severity_counts'].get('high', 0) / data['total_reports'] * 100) if data['total_reports'] > 0 else 0
        
        return f"""
        <h3>🔥 Fire Report Analysis</h3>
        
        <h4>📊 Key Statistics:</h4>
        <ul>
          <li>Total Reports Analyzed: {data['total_reports']}</li>
          <li>High Severity Rate: {high_severity_rate:.1f}%</li>
          <li>Active Cases: {data['status_counts'].get('active', 0)}</li>
        </ul>

        <h4>📅 High-Risk Periods:</h4>
        <ul>
          {''.join(f'<li>{month}</li>' for month in high_risk_months_text)}
        </ul>

        <h4>📍 Frequent Fire Locations:</h4>
        <ul>
          {''.join(f'<li>{location}</li>' for location in top_locations_text)}
        </ul>

        <h4>💡 Recommendations:</h4>
        <ul>
          <li>Increase preventive measures during high-risk months</li>
          <li>Deploy additional resources to frequently affected areas</li>
          <li>Implement early warning systems in high-risk locations</li>
          <li>Regular safety inspections in areas with recurring incidents</li>
        </ul>

        <p><em>Note: This is a basic analysis. For advanced AI insights, please configure the OpenAI API key.</em></p>
        """