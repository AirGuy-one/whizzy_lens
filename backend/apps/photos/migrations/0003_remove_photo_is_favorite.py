# Generated by Django 5.1 on 2024-08-11 17:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('photos', '0002_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='photo',
            name='is_favorite',
        ),
    ]