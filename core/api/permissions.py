from rest_framework import permissions

class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'ADMIN'

class IsTeamLeader(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'TEAM_LEADER'

class IsLabour(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'LABOUR'

class CanManageTimeCard(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user.role == 'ADMIN':
            return True
        if request.user.role == 'TEAM_LEADER':
            return obj.project.team_leader == request.user
        return obj.labour == request.user and not obj.submitted
