from django.test import TestCase, Client
from django.urls import reverse

from apps.photos.models import PhotoSession
from apps.users.models import Customer
from apps.users.models import Photographer


class PaySessionViewTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        self.customer = Customer.objects.create_user(username='customer1', password='pass')
        self.photographer = Photographer.objects.create(username='photographer1', password='pass')
        self.session = PhotoSession.objects.create(
            photographer=self.photographer,
            address='Test Address',
            start_time='2024-09-15T10:00:00Z',
            end_time='2024-09-15T11:00:00Z'
        )
        self.session_url = reverse('pay-session-url', kwargs={'session_pk': self.session.pk})

    def test_pay_session_success(self):
        self.client.login(username='customer1', password='pass')
        response = self.client.post(self.session_url)
        self.session.refresh_from_db()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.json()['detail'],
            f'Session {self.session.pk} marked as paid',
        )
        self.assertTrue(self.session.is_paid)

    def test_non_existent_session_id(self):
        self.client.login(username='customer1', password='pass')
        response = self.client.post(
            reverse('pay-session-url', kwargs={'session_pk': self.session.pk + 1})
        )
        self.assertEqual(response.status_code, 404)

    def test_already_paid_session(self):
        self.client.login(username='customer1', password='pass')
        self.session.mark_as_paid()
        response = self.client.post(self.session_url)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()['detail'], 'Session is already paid')

    def test_method_not_allowed(self):
        self.client.login(username='customer1', password='pass')
        response = self.client.get(self.session_url)
        self.assertEqual(response.status_code, 405)
        self.assertEqual(response.json()['detail'], 'Method not allowed')
