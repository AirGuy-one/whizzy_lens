# Generated by Django 5.1 on 2024-08-31 19:07

import django.contrib.auth.models
import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_remove_parent_favorite_photos_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('baseuser_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('name', models.CharField(max_length=100)),
                ('phone_number', models.CharField(max_length=12)),
            ],
            options={
                'verbose_name': 'customer',
                'verbose_name_plural': 'customers',
            },
            bases=('users.baseuser',),
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Manager',
            fields=[
                ('baseuser_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('name', models.CharField(max_length=100)),
                ('phone_number', models.CharField(blank=True, max_length=12)),
                ('tin', models.IntegerField(blank=True)),
                ('bank_card', models.IntegerField(blank=True)),
            ],
            options={
                'verbose_name': 'manager',
                'verbose_name_plural': 'managers',
            },
            bases=('users.baseuser',),
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.RemoveField(
            model_name='baseuser',
            name='favorite_photos',
        ),
        migrations.AddField(
            model_name='photographer',
            name='bank_card',
            field=models.IntegerField(blank=True, default=123),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='photographer',
            name='name',
            field=models.CharField(default='name', max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='photographer',
            name='phone_number',
            field=models.CharField(blank=True, max_length=12),
        ),
        migrations.AddField(
            model_name='photographer',
            name='tin',
            field=models.IntegerField(blank=True, default=123),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='photographer',
            name='supervisor',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='photographers', to='users.manager'),
        ),
        migrations.DeleteModel(
            name='Parent',
        ),
    ]
