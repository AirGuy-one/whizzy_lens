from django.db import models


class Photo(models.Model):
    image = models.ImageField(upload_to='photos/')
    uploaded_on = models.DateTimeField(auto_now_add=True)
    photo_session = models.ForeignKey(
        'photos.PhotoSession',
        on_delete=models.CASCADE,
        related_name='photos',
    )

    def __str__(self):
        return f'photo from {self.photo_session}'
