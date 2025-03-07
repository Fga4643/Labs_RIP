# Generated by Django 4.2.5 on 2023-12-15 22:41

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('spares', '0002_remove_spare_condition_alter_order_date_created_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='order',
            options={'ordering': ('-date_of_formation',), 'verbose_name': 'Заказ', 'verbose_name_plural': 'Заказы'},
        ),
        migrations.AlterField(
            model_name='order',
            name='date_created',
            field=models.DateTimeField(default=datetime.datetime(2023, 12, 15, 22, 41, 54, 180422, tzinfo=datetime.timezone.utc), verbose_name='Дата создания'),
        ),
        migrations.AlterField(
            model_name='order',
            name='delivery_date',
            field=models.IntegerField(default=-1, verbose_name='Дата доставки'),
        ),
        migrations.AlterField(
            model_name='order',
            name='status',
            field=models.IntegerField(choices=[(1, 'Введён'), (2, 'В работе'), (3, 'Завершён'), (4, 'Отменён'), (5, 'Удалён')], db_index=True, default=1, verbose_name='Статус'),
        ),
        migrations.AlterField(
            model_name='spare',
            name='image',
            field=models.ImageField(default='spares/default.jpg', upload_to='spares', verbose_name='Фото'),
        ),
    ]
