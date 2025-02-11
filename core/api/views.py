from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q
from datetime import datetime
import pandas as pd
from django.http import HttpResponse
from .models import User, Project, LabourAssignment, TimeCard
from .serializers import UserSerializer, ProjectSerializer, LabourAssignmentSerializer, TimeCardSerializer
from .permissions import IsAdmin, IsTeamLeader

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdmin]

    @action(detail=False, methods=['GET'], permission_classes=[permissions.IsAuthenticated])
    def profile(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

class ProjectViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'ADMIN':
            return Project.objects.all()
        elif user.role == 'TEAM_LEADER':
            return Project.objects.filter(team_leader=user)
        return Project.objects.filter(labourassignment__labour=user, labourassignment__is_active=True)

class LabourAssignmentViewSet(viewsets.ModelViewSet):
    serializer_class = LabourAssignmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'ADMIN':
            return LabourAssignment.objects.all()
        elif user.role == 'TEAM_LEADER':
            return LabourAssignment.objects.filter(project__team_leader=user)
        return LabourAssignment.objects.filter(labour=user)

class TimeCardViewSet(viewsets.ModelViewSet):
    serializer_class = TimeCardSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'ADMIN':
            return TimeCard.objects.all()
        elif user.role == 'TEAM_LEADER':
            return TimeCard.objects.filter(project__team_leader=user)
        return TimeCard.objects.filter(labour=user)

    @action(detail=False, methods=['POST'])
    def export_report(self, request):
        start_date = request.data.get('start_date')
        end_date = request.data.get('end_date')
        labour_id = request.data.get('labour_id')
        export_format = request.data.get('format', 'xlsx')

        queryset = self.get_queryset()
        if start_date:
            queryset = queryset.filter(date__gte=start_date)
        if end_date:
            queryset = queryset.filter(date__lte=end_date)
        if labour_id:
            queryset = queryset.filter(labour_id=labour_id)

        df = pd.DataFrame(list(queryset.values()))
        
        if export_format == 'xlsx':
            response = HttpResponse(content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
            response['Content-Disposition'] = 'attachment; filename=timecard_report.xlsx'
            df.to_excel(response, index=False)
            return response
