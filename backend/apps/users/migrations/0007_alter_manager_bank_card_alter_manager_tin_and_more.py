# Generated by Django 5.1 on 2024-08-31 19:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0006_remove_customer_name_remove_manager_name_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='manager',
            name='bank_card',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='manager',
            name='tin',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='photographer',
            name='bank_card',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='photographer',
            name='tin',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]