import json

from django.contrib.auth.hashers import make_password
from django.test import TestCase, Client
from django.urls import reverse

from apps.photos.models import PhotoSession
from apps.users.models import Customer, Photographer


class BookSessionNSignUpCustomerViewTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        self.url = reverse('book-session-n-sign-up-url')
        self.customer = Customer.objects.create(
            username='test_user',
            email='test@example.com',
            password=make_password('test_pass'),
        )
        self.photographer = Photographer.objects.create(first_name='John')

    def test_book_session_n_sign_up_customer_success(self):
        request_data = {
            'email': 'test@example.com',
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
        response_data = response.json()

        self.assertEqual(response.status_code, 200)
        self.assertTrue(Customer.objects.filter(email='test@example.com').exists())
        self.assertTrue(PhotoSession.objects.filter(address='123 Sample Street').exists())
        self.assertIn('username', response_data)
        self.assertIn('password', response_data)
        self.assertEqual(
            response_data['message'],
            'Customer and photo session successfully created',
        )

    def test_missing_field(self):
        request_data = {
            'email': 'test@example.com',
            'selectedYear': 2024,
            'selectedMonth': 9,
            'selectedDay': 12,
            # 'selectedTimes' field is missing
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

    def test_invalid_time(self):
        request_data = {
            'email': 'test@example.com',
            'selectedYear': 2024,
            'selectedMonth': 9,
            'selectedDay': 12,
            'selectedTimes': [15, 14],
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

    def test_invalid_email(self):
        request_data = {
            'email': 'invalid-email',
            'selectedYear': 2024,
            'selectedMonth': 9,
            'selectedDay': 12,
            'selectedTimes': [14, 15],
            'address': '123 Sample Street',
        }

        response = self.client.post(
            self.url,
            data=json.dumps(request_data),
            content_type='application/json',
        )
        response_data = response.json()

        self.assertEqual(response.status_code, 400)
        self.assertIn('errors', response_data)

    def test_no_photographer_available(self):
        Photographer.objects.all().delete()

        request_data = {
            'email': 'test@example.com',
            'selectedYear': 2024,
            'selectedMonth': 9,
            'selectedDay': 12,
            'selectedTimes': [14, 15],
            'address': '123 Sample Street',
        }

        response = self.client.post(
            self.url,
            data=json.dumps(request_data),
            content_type='application/json',
        )
        response_data = response.json()

        self.assertEqual(response.status_code, 404)
        self.assertEqual(
            response_data['error'],
            'No photographers found in the database'
        )
