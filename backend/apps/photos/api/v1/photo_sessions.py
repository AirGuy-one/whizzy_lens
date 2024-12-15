from typing import Any, Dict, List, Union

from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpRequest, JsonResponse
from django.views.generic import View

from apps.photos.models import PhotoSession
from apps.users.models import Photographer, Manager


class PhotoSessionsView(LoginRequiredMixin, View):
    # FIXME provide for the case if user has no sessions
    """
    View to return a list of photo sessions based on the role of the currently logged-in user.

    - Only authenticated users can access this view.
    - Photographers get their own photo sessions' PKs.
    - Customers get their own photo sessions' PKs.
    - Managers get all photo sessions for their photographers with usernames and session PKs.
    - Admins get a list of all managers with their photographers and corresponding session PKs.
    - If the user is not authenticated - 403 response will be returned.
    """
    raise_exception = True

    def get(self, request: HttpRequest, *args: Any, **kwargs: Any) -> JsonResponse:
        """Return session PK values based on user role"""
        user = request.user
        user_role: str

        if hasattr(user, 'photographer'):
            user_role = 'photographer'
            sessions = PhotoSession.objects.filter(photographer=user)
            data = list(sessions.values('pk'))

        elif hasattr(user, 'customer'):
            user_role = 'customer'
            sessions = PhotoSession.objects.filter(customers=user)
            data = list(sessions.values('pk', 'is_paid'))

        elif hasattr(user, 'manager'):
            user_role = 'manager'
            photographers = Photographer.objects.filter(supervisor=user)
            data = []

            for photographer in photographers:
                photographer_sessions = PhotoSession.objects.filter(photographer=photographer)
                sessions = [{'pk': pk} for pk in photographer_sessions.values_list('pk', flat=True)]

                data.append({
                    'ph_username': photographer.username,
                    'photo_sessions': sessions,
                })

        elif user.is_superuser:
            user_role = 'admin'
            data = []
            managers = Manager.objects.all()

            for manager in managers:
                manager_data = {}
                photographers = Photographer.objects.filter(supervisor=manager)

                photographer_data = []
                for photographer in photographers:
                    photographer_sessions = PhotoSession.objects.filter(photographer=photographer)
                    sessions = [{'pk': pk} for pk in photographer_sessions.values_list('pk', flat=True)]

                    photographer_data.append({photographer.username: sessions})

                manager_data[manager.username] = photographer_data
                data.append(manager_data)

        else:
            return JsonResponse({'detail': 'User role not recognized'}, status=403)

        return JsonResponse({'user_role': user_role, 'session_data': data}, safe=False)
