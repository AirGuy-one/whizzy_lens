from django.test import TestCase, Client
from django.urls import reverse
from django.utils import timezone
from apps.photos.models import PhotoSession, Photo
from apps.users.models import Photographer


class PhotoSessionDetailViewTestCase(TestCase):
    def setUp(self):
        self.client = Client()

        # Create a photographer
        self.photographer = Photographer.objects.create(first_name='John Doe')

        # Create a photo session
        self.photo_session = PhotoSession.objects.create(
            photographer=self.photographer,
            start_time=timezone.now(),
            end_time=timezone.now() + timezone.timedelta(hours=1)
        )

        # Create photos for the photo session
        self.photo1 = Photo.objects.create(
            photo_session=self.photo_session,
            image='path/to/photo1.jpg',
            uploaded_on=timezone.now()
        )

        self.photo2 = Photo.objects.create(
            photo_session=self.photo_session,
            image='path/to/photo2.jpg',
            uploaded_on=timezone.now() + timezone.timedelta(minutes=30)
        )

        # Define the URL for the view
        self.url = reverse('photo-session-details-url', kwargs={'pk': self.photo_session.pk})

    def test_photo_session_detail_view(self):
        response = self.client.get(self.url)

        # Check response status code
        self.assertEqual(response.status_code, 200)

        # Check response content type
        self.assertEqual(response['Content-Type'], 'application/json')

        # Check response data
        response_data = response.json()

        # Check photo session details
        self.assertEqual(response_data['photo_session']['id'], self.photo_session.pk)
        self.assertEqual(response_data['photo_session']['photographer'], self.photographer.first_name)
        self.assertEqual(response_data['photo_session']['start_time'], self.photo_session.start_time.isoformat())
        self.assertEqual(response_data['photo_session']['end_time'], self.photo_session.end_time.isoformat())

        # Check photos data
        self.assertEqual(len(response_data['photos']), 2)
        self.assertEqual(response_data['photos'][0]['id'], self.photo1.pk)
        self.assertEqual(response_data['photos'][0]['url'], self.photo1.image.url)
        self.assertEqual(response_data['photos'][0]['uploaded_on'], self.photo1.uploaded_on.isoformat())
        self.assertEqual(response_data['photos'][1]['id'], self.photo2.pk)
        self.assertEqual(response_data['photos'][1]['url'], self.photo2.image.url)
        self.assertEqual(response_data['photos'][1]['uploaded_on'], self.photo2.uploaded_on.isoformat())
