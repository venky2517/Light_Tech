from django.core.exceptions import ValidationError
from datetime import datetime

def validate_time_card(in_time, out_time, date):
    if in_time >= out_time:
        raise ValidationError("In time must be before out time")
    
    if date > datetime.now().date():
        raise ValidationError("Cannot create time card for future date")

def validate_project_dates(start_date, end_date):
    if start_date > end_date:
        raise ValidationError("Start date must be before end date")
