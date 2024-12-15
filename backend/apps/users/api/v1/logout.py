from django.contrib.auth import logout
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt


@method_decorator(csrf_exempt, name='dispatch')
class LogoutView(View):
    def get(self, request, *args, **kwargs):
        return JsonResponse({'error': 'Invalid method'}, status=405)

    def post(self, request, *args, **kwargs):
        logout(request)
        return JsonResponse({'message': 'Logged out successfully'})
