from django.conf import settings
from django.test import TestCase, Client
from django.urls import reverse

from apps.users.models import BaseUser


class UserDetailViewTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        self.url = reverse('user-detail-url')
        self.user = BaseUser.objects.create_user(
            username='test_user',
            password='test_pass',
            email='test_user@example.com',
        )

    def test_user_detail_authenticated(self):
        """Test accessing user details when authenticated"""
        self.client.login(username='test_user', password='test_pass')
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        response_data = response.json()
        self.assertEqual(response_data['username'], 'test_user')
        self.assertEqual(response_data['email'], 'test_user@example.com')

    def test_user_detail_unauthenticated(self):
        """Test accessing user details when not authenticated"""
        response = self.client.get(self.url)
        expected_url = f'{settings.LOGIN_URL}?next={self.url}'

        self.assertEqual(response.status_code, 302)
        self.assertRedirects(response, expected_url)

