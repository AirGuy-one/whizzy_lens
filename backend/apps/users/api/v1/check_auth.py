from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import JsonResponse
from django.views import View


class CheckAuthView(LoginRequiredMixin, View):
    def get(self, request, *args, **kwargs):
        """Return JSON confirming authentication status"""
        return JsonResponse({'detail': 'User is authenticated.'})

    def handle_no_permission(self):
        """Return JSON with 401 status for unauthenticated users"""
        return JsonResponse({'detail': 'User is not authenticated.'}, status=401)
