from django import forms

from apps.photos.models import PhotoSession


class PhotoSessionForm(forms.ModelForm):
    class Meta:
        model = PhotoSession
        fields = ['photographer', 'start_time', 'end_time', 'customers']
