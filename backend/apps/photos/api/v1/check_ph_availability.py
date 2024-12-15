from django.http import JsonResponse
from django.views import View
from django.views.decorators.csrf import csrf_exempt


class CheckPhotographerAvailabilityView(View):

    @csrf_exempt
    def get(self, request):
        return JsonResponse({
            'check': 'ph availability'
        })
