from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Project, LabourAssignment, TimeCard

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'role', 'phone', 'is_staff')
    list_filter = ('role', 'is_staff', 'is_superuser')
    fieldsets = UserAdmin.fieldsets + (
        ('Additional Info', {'fields': ('role', 'phone')}),
    )

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'project_number', 'team_leader', 'status', 'start_date', 'end_date')
    list_filter = ('status', 'team_leader')
    search_fields = ('name', 'project_number')

@admin.register(LabourAssignment)
class LabourAssignmentAdmin(admin.ModelAdmin):
    list_display = ('labour', 'project', 'assigned_date', 'is_active')
    list_filter = ('is_active', 'assigned_date')
    search_fields = ('labour__username', 'project__name')

@admin.register(TimeCard)
class TimeCardAdmin(admin.ModelAdmin):
    list_display = ('labour', 'project', 'date', 'in_time', 'out_time', 'submitted')
    list_filter = ('submitted', 'date')
    search_fields = ('labour__username', 'project__name')
