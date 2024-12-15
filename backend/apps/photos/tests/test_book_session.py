import json
from traceback import print_tb

from django.contrib.auth.hashers import make_password
from django.test import TestCase, Client
from django.urls import reverse

from apps.photos.models import PhotoSession
from apps.users.models import Customer
from apps.users.models import Photographer


class BookSessionViewTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        self.url = reverse('book-session-url')
        self.customer = Customer.objects.create(
            username='test_user',
            password=make_password('test_pass'),
        )
        self.photographer = Photographer.objects.create(first_name='John')

    def test_book_session_success(self):
        self.client.login(username='test_user', password='test_pass')

        request_data = {
            'selectedYear': 2024,
            'selectedMonth': 9,
            'selectedDay': 12,
            'selectedTimes': [14, 15],
            'address': '123 Sample Street',
        }

        response = self.client.post(
            self.url,
            data=request_data,
            content_type='application/json'
        )
        response_data = response.json()

        self.assertEqual(response.status_code, 200)
        self.assertTrue(PhotoSession.objects.filter(address='123 Sample Street').exists())
        self.assertEqual(
            response_data['message'],
            'Photo session for the current logged in customer successfully created',
        )

    def test_book_session_unauthorized(self):
        request_data = {
            'selectedYear': 2024,
            'selectedMonth': 9,
            'selectedDay': 12,
            'selectedTimes': [14, 15],
            'address': '123 Sample Street',
        }
        response = self.client.post(
            self.url,
            data=json.dumps(request_data),
            content_type='application/json'
        )

        self.assertEqual(response.status_code, 403)

    def test_book_session_invalid_data(self):
        self.client.login(username='test_user', password='test_pass')

        request_data = {
            'selectedYear': 2024,
            'selectedMonth': 9,
            'selectedDay': 12,
            # selectedTimes' field is missing
            'address': '123 Sample Street',
        }

        response = self.client.post(
            self.url,
            data=json.dumps(request_data),
            content_type='application/json'
        )
        response_data = response.json()

        self.assertEqual(response.status_code, 400)
        self.assertIn('errors', response_data)

    def test_book_session_invalid_time(self):
        self.client.login(username='test_user', password='test_pass')

        # Invalid time format (end time earlier than start time)
        request_data = {
            'selectedYear': 2024,
            'selectedMonth': 9,
            'selectedDay': 12,
            'selectedTimes': [15, 14],
            'address': '123 Sample Street',
        }

        response = self.client.post(
            self.url, data=json.dumps(request_data), content_type='application/json'
        )
        response_data = response.json()

        self.assertEqual(response.status_code, 400)
        self.assertIn('errors', response_data)
