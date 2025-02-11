from django.test import TestCase
from django.contrib.auth import get_user_model
from api.models import Project, LabourAssignment, TimeCard
from datetime import date, time

User = get_user_model()

class ModelTests(TestCase):
    def setUp(self):
        self.admin = User.objects.create_user(
            username='admin',
            password='testpass123',
            role='ADMIN'
        )
        
        self.team_leader = User.objects.create_user(
            username='teamleader',
            password='testpass123',
            role='TEAM_LEADER'
        )
        
        self.labour = User.objects.create_user(
            username='labour',
            password='testpass123',
            role='LABOUR'
        )
        
        self.project = Project.objects.create(
            name='Test Project',
            project_number='TP001',
            team_leader=self.team_leader,
            start_date=date.today(),
            end_date=date.today(),
            status='IN_PROGRESS'
        )

    def test_user_creation(self):
        self.assertEqual(self.admin.role, 'ADMIN')
        self.assertTrue(self.admin.check_password('testpass123'))

    def test_project_creation(self):
        self.assertEqual(str(self.project), 'Test Project (TP001)')
