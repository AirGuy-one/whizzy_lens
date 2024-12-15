from django.http import JsonResponse
from django.views import View
from django.shortcuts import get_object_or_404
from apps.photos.models import PhotoSession


class PhotoSessionDetailsView(View):
    def get(self, request, pk):
        photo_session = get_object_or_404(PhotoSession, pk=pk)

        photos_data = []
        for photo in photo_session.photos.all():
            photos_data.append({
                'id': photo.id,
                'url': photo.image.url,
                'uploaded_on': photo.uploaded_on.isoformat() if photo.uploaded_on else None,
            })

        response_data = {
            'photo_session': {
                'id': photo_session.id,
                'photographer': photo_session.photographer.first_name if photo_session.photographer else None,
                'start_time': photo_session.start_time.isoformat(),
                'end_time': photo_session.end_time.isoformat(),
            },
            'photos': photos_data,
        }

        return JsonResponse(response_data)
