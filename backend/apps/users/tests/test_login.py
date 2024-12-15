from django.test import TestCase, Client
from django.urls import reverse

from apps.users.models import BaseUser


class LoginViewTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        self.url = reverse("login-url")
        self.user = BaseUser.objects.create_user(username="test_user", password="test_user")

    def test_login_success(self):
        """Test successful login with valid credentials"""
        response = self.client.post(
            self.url, {"username": "test_user", "password": "test_user"}
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["message"], "Logged in successfully")

    def test_login_invalid_credentials(self):
        """Test login with invalid credentials"""
        response = self.client.post(
            self.url, {"username": "wrong_user", "password": "wrong_pass"}
        )
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()["error"], "Invalid credentials")

    def test_login_missing_fields(self):
        """Test login when missing fields"""
        response = self.client.post(
            self.url, {"username": "test_user"}
        )  # Missing password
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()["error"], "Invalid credentials")
