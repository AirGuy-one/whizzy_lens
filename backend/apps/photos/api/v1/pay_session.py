from typing import Any

from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpRequest
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt

from apps.photos.models import PhotoSession


@method_decorator(csrf_exempt, name='dispatch')
class PaySessionView(LoginRequiredMixin, View):
    """
    View to mark a photo session as paid.

    - Only authenticated users can access this view.
    - The photo session will be marked as paid when a valid request is made.
    - Requires the session ID to be provided in the URL.
    - Returns a success message or an error if the session is not found or already paid.
    """
    raise_exception = True

    @csrf_exempt
    def post(self, request: HttpRequest, *args: Any, **kwargs: Any) -> JsonResponse:
        session_pk: int = self.kwargs.get('session_pk')

        if not session_pk:
            return JsonResponse({'detail': 'Session ID is required'}, status=400)

        session: PhotoSession = get_object_or_404(PhotoSession, pk=session_pk)

        if session.is_paid:
            return JsonResponse({'detail': 'Session is already paid'}, status=400)

        session.mark_as_paid()
        return JsonResponse({'detail': f'Session {session_pk} marked as paid'}, status=200)

    def http_method_not_allowed(self, request: HttpRequest, *args: Any, **kwargs: Any) -> JsonResponse:
        return JsonResponse({'detail': 'Method not allowed'}, status=405)
