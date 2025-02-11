from django.contrib.auth.models import AbstractUser
from django.db import models
from datetime import datetime

class User(AbstractUser):
    ROLES = (
        ('ADMIN', 'Admin'),
        ('TEAM_LEADER', 'Team Leader'),
        ('LABOUR', 'Labour')
    )
    role = models.CharField(max_length=20, choices=ROLES)
    phone = models.CharField(max_length=15)

    def __str__(self):
        return f"{self.username} - {self.role}"

class Project(models.Model):
    STATUS_CHOICES = (
        ('PENDING', 'Pending'),
        ('IN_PROGRESS', 'In Progress'),
        ('COMPLETED', 'Completed')
    )
    
    name = models.CharField(max_length=200)
    project_number = models.CharField(max_length=50, unique=True)
    description = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField()
    team_leader = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.project_number})"

class LabourAssignment(models.Model):
    labour = models.ForeignKey(User, on_delete=models.CASCADE, related_name='assignments')
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    assigned_date = models.DateField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        unique_together = ('labour', 'project')

    def __str__(self):
        return f"{self.labour.username} - {self.project.name}"

class TimeCard(models.Model):
    labour = models.ForeignKey(User, on_delete=models.CASCADE)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    date = models.DateField()
    in_time = models.TimeField()
    out_time = models.TimeField()
    project_photo = models.ImageField(upload_to='project_photos/')
    submitted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def working_hours(self):
        in_datetime = datetime.combine(self.date, self.in_time)
        out_datetime = datetime.combine(self.date, self.out_time)
        duration = out_datetime - in_datetime
        return duration.total_seconds() / 3600

    def __str__(self):
        return f"{self.labour.username} - {self.date}"
