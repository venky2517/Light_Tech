from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from django.contrib.auth import get_user_model

User = get_user_model()

class ViewTests(APITestCase):
    def setUp(self):
        self.admin = User.objects.create_user(
            username='admin',
            password='testpass123',
            role='ADMIN'
        )
        
        self.client.force_authenticate(user=self.admin)

    def test_user_list(self):
        url = reverse('user-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
