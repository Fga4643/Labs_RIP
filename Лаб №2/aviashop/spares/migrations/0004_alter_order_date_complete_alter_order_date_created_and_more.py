# Generated by Django 4.2.4 on 2023-09-16 17:03

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('spares', '0003_spare_status_alter_order_date_complete_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='date_complete',
            field=models.DateTimeField(default=datetime.datetime(2023, 9, 16, 17, 3, 13, 772193, tzinfo=datetime.timezone.utc), verbose_name='Дата завершения'),
        ),
        migrations.AlterField(
            model_name='order',
            name='date_created',
            field=models.DateTimeField(default=datetime.datetime(2023, 9, 16, 17, 3, 13, 772193, tzinfo=datetime.timezone.utc), verbose_name='Дата создания'),
        ),
        migrations.AlterField(
            model_name='order',
            name='date_of_formation',
            field=models.DateTimeField(default=datetime.datetime(2023, 9, 16, 17, 3, 13, 772193, tzinfo=datetime.timezone.utc), verbose_name='Дата формирования'),
        ),
        migrations.AlterField(
            model_name='spare',
            name='condition',
            field=models.CharField(choices=[('Б/У', 'Б/У'), ('Новое', 'Новое')], default='Новое', verbose_name='Состояние'),
        ),
        migrations.AlterField(
            model_name='spare',
            name='status',
            field=models.CharField(choices=[('Enabled', 'Действует'), ('Deleted', 'Удалена')], default='Enabled', verbose_name='Статус'),
        ),
    ]
