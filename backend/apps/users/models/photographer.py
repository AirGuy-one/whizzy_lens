from django.db import models

from apps.users.models import BaseUser


class Photographer(BaseUser):
    supervisor = models.ForeignKey(
        'users.Manager',
        on_delete=models.SET_NULL,
        related_name='photographers',
        null=True,
    )
    phone_number = models.CharField(blank=True, max_length=12)
    tin = models.IntegerField(blank=True, null=True)
    bank_card = models.IntegerField(blank=True, null=True)

    class Meta:
        verbose_name = 'photographer'
        verbose_name_plural = 'photographers'

    def __str__(self):
        return f'{self.first_name} - {self.pk}'
