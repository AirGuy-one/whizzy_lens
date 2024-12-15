# Generated by Django 5.1 on 2024-08-08 20:30

import django.contrib.auth.models
import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('photos', '0002_initial'),
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='photographer',
            options={'verbose_name': 'photographer', 'verbose_name_plural': 'photographers'},
        ),
        migrations.CreateModel(
            name='Parent',
            fields=[
                ('baseuser_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('school_class', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='parent_users', to='photos.schoolclass')),
            ],
            options={
                'verbose_name': 'parent',
                'verbose_name_plural': 'parents',
            },
            bases=('users.baseuser',),
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
    ]