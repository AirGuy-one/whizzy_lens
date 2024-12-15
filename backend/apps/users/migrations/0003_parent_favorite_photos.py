# Generated by Django 5.1 on 2024-08-16 12:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('photos', '0003_remove_photo_is_favorite'),
        ('users', '0002_alter_photographer_options_parent'),
    ]

    operations = [
        migrations.AddField(
            model_name='parent',
            name='favorite_photos',
            field=models.ManyToManyField(blank=True, related_name='favorite_for', to='photos.photo'),
        ),
    ]
