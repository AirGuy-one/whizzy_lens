import json

from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import JsonResponse, HttpResponseForbidden
from django.shortcuts import get_object_or_404
from django.utils import timezone
from django.utils.dateparse import parse_datetime
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt

from apps.photos.forms import BookSessionForm
from apps.photos.models import PhotoSession
from apps.users.models import Customer
from apps.users.models import Photographer


@method_decorator(csrf_exempt, name='dispatch')
class BookSessionView(LoginRequiredMixin, View):
    def handle_no_permission(self):
        return HttpResponseForbidden('You are not authorized to perform this action')

    def get(self, request):
        return JsonResponse({
            'message': 'GET request is not supported. Please use POST to book a session.'
        })

    @csrf_exempt
    def post(self, request):
        form = BookSessionForm(json.loads(request.body))
        if form.is_valid():
            data = form.cleaned_data
            selected_year, selected_month = data.get('selectedYear'), data.get('selectedMonth')
            selected_day, selected_times = data.get('selectedDay'), data.get('selectedTimes')
            address = data.get('address')
            start, end = selected_times[0], selected_times[-1]
            start_time = timezone.make_aware(
                parse_datetime(
                    f'{selected_year}-{selected_month:02}-{selected_day:02}T{start:02}:00:00'
                )
            )
            end_time = timezone.make_aware(
                parse_datetime(
                    f'{selected_year}-{selected_month:02}-{selected_day:02}T{end:02}:00:00'
                )
            )

            customer = get_object_or_404(Customer, username=request.user.username)
            # FIXME it will get the random available photographer
            photographer = Photographer.objects.order_by('?').first()
            if photographer is None:
                return JsonResponse(
                    {"error": "No photographers found in the database"}, status=404
                )

            photo_session = PhotoSession(
                photographer=photographer,
                address=address,
                start_time=start_time,
                end_time=end_time,
            )
            photo_session.save()
            photo_session.customers.add(customer)

            return JsonResponse({
                'message': 'Photo session for the current logged in customer successfully created'
            })
        return JsonResponse({'errors': form.errors}, status=400)
