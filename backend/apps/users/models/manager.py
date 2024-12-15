from django.db import models

from apps.users.models.base_user import BaseUser


class Manager(BaseUser):
    phone_number = models.CharField(blank=True, max_length=12)
    tin = models.IntegerField(blank=True, null=True)
    bank_card = models.IntegerField(blank=True, null=True)

    class Meta:
        verbose_name = 'manager'
        verbose_name_plural = 'managers'

    def __str__(self):
        return self.first_name
