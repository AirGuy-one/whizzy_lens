from django.contrib import admin
from apps.photos.models import Photo
from apps.photos.models import PhotoSession

admin.site.register(Photo)
admin.site.register(PhotoSession)
