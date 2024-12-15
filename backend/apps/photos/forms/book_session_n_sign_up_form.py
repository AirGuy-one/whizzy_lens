from datetime import datetime

from django import forms
from django.core.exceptions import ValidationError


class BookSessionNSignUpCustomerForm(forms.Form):
    email = forms.EmailField()
    selectedYear = forms.IntegerField(
        min_value=datetime.now().year,
        max_value=datetime.now().year + 1,
    )
    selectedMonth = forms.IntegerField(min_value=1, max_value=12)
    selectedDay = forms.IntegerField(min_value=1, max_value=31)
    selectedTimes = forms.CharField()
    address = forms.CharField(max_length=255)

    def clean_selectedTimes(self):
        times_str = self.cleaned_data.get('selectedTimes')
        try:
            times = [int(time.strip()) for time in times_str[1:-1].split(',')]
            if len(times) < 2:
                raise ValidationError('Must provide at least two times')
            if times[0] >= times[-1]:
                raise ValidationError('Start time must be before end time')
            return times
        except (ValueError, TypeError):
            raise ValidationError('Invalid times format')

    def clean(self):
        cleaned_data = super().clean()
        selected_month = cleaned_data.get('selectedMonth')
        selected_day = cleaned_data.get('selectedDay')

        try:
            datetime(year=datetime.now().year, month=selected_month, day=selected_day)
        except ValueError:
            raise ValidationError('Invalid date')

        return cleaned_data
