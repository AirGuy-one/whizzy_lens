from django.conf import settings
from django.test import TestCase, Client
from django.urls import reverse

from apps.users.models import BaseUser


class CheckAuthViewTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        self.url = reverse('check-auth-url')
        self.user = BaseUser.objects.create_user(username='test_user', password='test_pass')

    def test_check_auth_authenticated(self):
        """Test access to CheckAuthView when authenticated"""
        self.client.login(username='test_user', password='test_pass')

        response = self.client.get(self.url)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['detail'], 'User is authenticated.')

    def test_check_auth_unauthenticated(self):
        """Test access to CheckAuthView when not authenticated"""
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 401)
