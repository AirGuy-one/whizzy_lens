from django.test import TestCase, Client
from django.urls import reverse

from apps.users.models import BaseUser


class LogoutViewTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        self.url = reverse("logout-url")
        self.user = BaseUser.objects.create_user(username="test_user", password="test_user")
        self.client.login(username="test_user", password="test_user")

    def test_logout_success(self):
        """Test successful logout"""
        response = self.client.post(self.url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["message"], "Logged out successfully")

    def test_logout_invalid_method_get(self):
        """Test logout with invalid method"""
        response = self.client.get(self.url)  # Invalid method - GET, not POST
        self.assertEqual(response.status_code, 405)
        self.assertEqual(response.json()["error"], "Invalid method")
