from apps.users.models.base_user import BaseUser


class Customer(BaseUser):
    class Meta:
        verbose_name = 'customer'
        verbose_name_plural = 'customers'

    def __str__(self):
        return f'{self.username} {self.pk} ID'
