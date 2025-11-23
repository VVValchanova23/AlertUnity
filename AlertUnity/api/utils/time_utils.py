from datetime import datetime, timedelta
from collections import defaultdict

def firestore_to_datetime(timestamp):
    """
    Convert Firestore timestamp to Python datetime.
    Handles both Firestore Timestamp objects and regular datetime.
    """
    if hasattr(timestamp, "timestamp"):
        return datetime.fromtimestamp(timestamp.timestamp())
    return timestamp

def last_n_months(n=12):
    """
    Returns a list of month strings in 'YYYY-MM' format for the last n months.
    Most recent month is last in the list.
    """
    now = datetime.now()
    return [(now - timedelta(days=30*i)).strftime("%Y-%m") for i in reversed(range(n))]

def group_by_month(incidents, months=12):
    """
    Returns a list of counts of incidents per month for the last N months.
    """
    monthly_counts = defaultdict(int)
    months_list = last_n_months(months)

    for incident in incidents:
        ts = incident.get("timestamp")
        if ts:
            dt = firestore_to_datetime(ts)
            key = dt.strftime("%Y-%m")
            if key in months_list:
                monthly_counts[key] += 1

    return [monthly_counts.get(m, 0) for i, m in enumerate(months_list)]

def get_severity_distribution(incidents):
    """
    Returns count of incidents by severity level.
    Returns: {'high': count, 'medium': count, 'low': count}
    """
    severity_counts = {'high': 0, 'medium': 0, 'low': 0}
    
    for incident in incidents:
        severity = incident.get('severity', '').lower()
        if severity in severity_counts:
            severity_counts[severity] += 1
    
    return severity_counts

def get_severity_trend(incidents, months=12):
    """
    Returns severity counts per month for the last N months.
    Returns: {
        'labels': ['2024-01', '2024-02', ...],
        'high': [count1, count2, ...],
        'medium': [count1, count2, ...],
        'low': [count1, count2, ...]
    }
    """
    months_list = last_n_months(months)
    monthly_severity = {
        month: {'high': 0, 'medium': 0, 'low': 0} 
        for month in months_list
    }
    
    for incident in incidents:
        ts = incident.get("timestamp")
        severity = incident.get('severity', '').lower()
        
        if ts and severity in ['high', 'medium', 'low']:
            dt = firestore_to_datetime(ts)
            key = dt.strftime("%Y-%m")
            if key in monthly_severity:
                monthly_severity[key][severity] += 1
    
    return {
        'labels': months_list,
        'high': [monthly_severity[m]['high'] for m in months_list],
        'medium': [monthly_severity[m]['medium'] for m in months_list],
        'low': [monthly_severity[m]['low'] for m in months_list]
    }

def get_cumulative_reports(incidents, months=12):
    """
    Returns cumulative count of incidents over time.
    Returns: {
        'labels': ['2024-01', '2024-02', ...],
        'cumulative': [count1, count1+count2, ...]
    }
    """
    months_list = last_n_months(months)
    monthly_counts = defaultdict(int)
    
    for incident in incidents:
        ts = incident.get("timestamp")
        if ts:
            dt = firestore_to_datetime(ts)
            key = dt.strftime("%Y-%m")
            if key in months_list:
                monthly_counts[key] += 1
    
    cumulative = []
    running_total = 0
    for month in months_list:
        running_total += monthly_counts.get(month, 0)
        cumulative.append(running_total)
    
    return {
        'labels': months_list,
        'cumulative': cumulative
    }

def get_hourly_distribution(incidents):
    """
    Returns count of incidents per hour of the day (0-23).
    Returns: {
        'labels': ['0', '1', '2', ..., '23'],
        'counts': [count0, count1, ..., count23]
    }
    """
    hourly_counts = defaultdict(int)
    
    for incident in incidents:
        ts = incident.get("timestamp")
        if ts:
            dt = firestore_to_datetime(ts)
            hour = dt.hour
            hourly_counts[hour] += 1
    
    return {
        'labels': [str(i) for i in range(24)],
        'counts': [hourly_counts.get(i, 0) for i in range(24)]
    }