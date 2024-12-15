import json
import secrets
import uuid

from django.contrib.auth.hashers import make_password
from django.db import transaction
from django.http import JsonResponse
from django.utils import timezone
from django.utils.dateparse import parse_datetime
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt

from apps.photos.forms import BookSessionNSignUpCustomerForm
from apps.photos.models import PhotoSession
from apps.users.models import Customer
from apps.users.models import Photographer


@method_decorator(csrf_exempt, name='dispatch')
class BookSessionNSignUpCustomerView(View):
    def get(self, request):
        return JsonResponse({
            'message': 'GET request is not supported. Please use POST to book a session & sign up.'
        })

    @csrf_exempt
    def post(self, request):
        form = BookSessionNSignUpCustomerForm(json.loads(request.body))
        if form.is_valid():
            data = json.loads(request.body)
            email = data.get('email')
            selected_year, selected_month = data.get('selectedYear'), data.get('selectedMonth')
            selected_day, selected_times = data.get('selectedDay'), data.get('selectedTimes')
            address = data.get('address')
            start, end = selected_times[0], selected_times[1]

            with transaction.atomic():
                # Create customer
                username = secrets.token_urlsafe(12)
                password = secrets.token_urlsafe(12)
                customer = Customer(
                    username=username,
                    email=email,
                    password=make_password(password),
                )
                customer.save()

                # Create photo session
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

                # FIXME it will get the random available photographer
                photographer = Photographer.objects.order_by('?').first()
                if not photographer:
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
                'username': username,
                'password': password,
                'message': 'Customer and photo session successfully created'
            })
        return JsonResponse({'errors': form.errors}, status=400)
