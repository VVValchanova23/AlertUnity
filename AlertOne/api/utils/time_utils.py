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

def last_n_weeks(n=7):
    """
    Returns a list of week numbers (0 = this week, 1 = last week, etc.) for the last n weeks.
    """
    return list(reversed(range(n)))

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

    return [monthly_counts.get(m, 0) for m in months_list]

def group_by_week(incidents, weeks=7):
    """
    Returns a list of counts of incidents per week for the last N weeks.
    """
    weekly_counts = defaultdict(int)
    now = datetime.now()

    for incident in incidents:
        ts = incident.get("timestamp")
        if ts:
            dt = firestore_to_datetime(ts)
            week_diff = (now - dt).days // 7
            if week_diff < weeks:
                weekly_counts[week_diff] += 1

    return [weekly_counts.get(i, 0) for i in reversed(range(weeks))]
