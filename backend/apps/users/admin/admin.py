from django.contrib import admin
from apps.users.models import Photographer
from apps.users.models import Customer
from apps.users.models import Manager

admin.site.register(Photographer)
admin.site.register(Customer)
admin.site.register(Manager)
