from django.test import TestCase, Client
from django.urls import reverse

from apps.photos.models import PhotoSession
from apps.users.models import Photographer, Customer, Manager, BaseUser


class PhotoSessionsViewTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        self.url = reverse('photo-sessions-url')

        # Create users
        self.admin = BaseUser.objects.create_superuser(username='admin', password='123')
        self.manager = Manager.objects.create_user(username='manager', password='testpass')
        self.photographer1 = Photographer.objects.create_user(
            username='photographer1', password='testpass', supervisor=self.manager,
        )
        self.photographer2 = Photographer.objects.create_user(
            username='photographer2', password='testpass', supervisor=self.manager,
        )
        self.customer1 = Customer.objects.create_user(username='customer1', password='testpass')
        self.customer2 = Customer.objects.create_user(username='customer2', password='testpass')

        # Create photo sessions
        self.session1 = PhotoSession.objects.create(
            photographer=self.photographer1,
            address='123 Main St',
            start_time='2024-01-01T10:00:00Z',
            end_time='2024-01-01T12:00:00Z',
        )
        self.session1.customers.add(self.customer1)
        self.session2 = PhotoSession.objects.create(
            photographer=self.photographer1,
            address='456 Elm St',
            start_time='2024-01-02T10:00:00Z',
            end_time='2024-01-02T12:00:00Z',
        )
        self.session2.customers.add(self.customer1)
        self.session3 = PhotoSession.objects.create(
            photographer=self.photographer2,
            address='789 Oak St',
            start_time='2024-01-03T10:00:00Z',
            end_time='2024-01-03T12:00:00Z',
        )
        self.session2.customers.add(self.customer2)

    def test_photographer_get_sessions(self):
        """Test that a photographer gets their own sessions' PKs"""
        self.client.login(username='photographer1', password='testpass')
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.json(),
            {
                'user_role': 'photographer',
                'session_data': [{'pk': self.session1.pk}, {'pk': self.session2.pk}],
            },
        )

    def test_customer_get_sessions(self):
        """Test that a customer gets their own sessions' PKs"""
        self.client.login(username='customer1', password='testpass')
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.json(),
            {
                'user_role': 'customer',
                'session_data': [
                    {
                        'pk': self.session1.pk,
                        'is_paid': self.session1.is_paid,
                    },
                    {
                        'pk': self.session2.pk,
                        'is_paid': self.session2.is_paid,
                    },
                ],
            },
        )

    def test_manager_get_sessions(self):
        """Test that a manager gets all sessions for their photographers"""
        self.client.login(username='manager', password='testpass')

        self.session1.refresh_from_db()
        self.session2.refresh_from_db()
        self.session3.refresh_from_db()

        expected_response = {
            'user_role': 'manager',
            'session_data': [
                {
                    'ph_username': self.photographer1.username,
                    'photo_sessions': [{'pk': self.session1.pk}, {'pk': self.session2.pk}],
                },
                {
                    'ph_username': self.photographer2.username,
                    'photo_sessions': [{'pk': self.session3.pk}],
                },
            ],
        }

        response = self.client.get(self.url)
        response_data = response.json()

        expected_response['session_data'].sort(key=lambda x: x['ph_username'])
        response_data['session_data'].sort(key=lambda x: x['ph_username'])

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            expected_response,
            response_data,
        )

    def test_admin_get_sessions(self):
        self.client.login(username='admin', password='123')

        response = self.client.get(self.url)

        expected_response = {
            'user_role': 'admin',
            'session_data': [
                {
                    'manager': [
                        {
                            self.photographer1.username: [
                                {'pk': self.session1.pk},
                                {'pk': self.session2.pk},
                            ],
                        },
                        {
                            self.photographer2.username: [
                                {'pk': self.session3.pk},
                            ],
                        },
                    ],
                },
            ],
        }

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.json(),
            expected_response,
        )

    def test_unauthenticated_access(self):
        """Test that unauthenticated users get a 403 response"""
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 403)
