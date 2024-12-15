from django.db import models

from apps.users.models import Customer
from apps.users.models import Photographer


class PhotoSession(models.Model):
    photographer = models.ForeignKey(
        Photographer,
        on_delete=models.SET_NULL,
        null=True,
        related_name='photo_sessions',
    )
    customers = models.ManyToManyField(Customer)
    address = models.CharField(max_length=100)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    is_paid = models.BooleanField(default=False)

    def __str__(self):
        first_customer = self.customers.first()
        customer_name = first_customer.email if first_customer else 'No customer'
        return f'session of {customer_name} by {self.photographer}'

    def mark_as_paid(self):
        self.is_paid = True
        self.save()
