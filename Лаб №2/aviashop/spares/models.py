import math

from django.db import models, connection
from datetime import datetime
from django.utils import timezone
from django.urls import reverse


class Spare(models.Model):
    STATUS_CHOICES = (
        ('Enabled', 'Действует'),
        ('Deleted', 'Удалена'),
    )

    CONDITION_CHOICES = (
        ('Б/У', 'Б/У'),
        ('Новое', 'Новое')
    )

    name = models.CharField(max_length=100, default="Название авиазапчасти", verbose_name="Название")
    status = models.CharField(choices=STATUS_CHOICES, default='Enabled', verbose_name="Статус")
    image = models.ImageField(default="spares/default.jpg", upload_to="spares", verbose_name="Фото")
    description = models.TextField(max_length=500, default='Описание авиазапчасти', verbose_name="Описание")
    price = models.IntegerField(default=1000, verbose_name="Цена")
    weight = models.FloatField(default=10.0, verbose_name="Вес")
    condition = models.CharField(default="Новое", choices=CONDITION_CHOICES, verbose_name="Состояние")
    rating = models.FloatField(default=4.5, verbose_name="Рейтинг")

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("spare_details", kwargs={"spare_id": self.pk})

    def get_delete_url(self):
        return reverse("delete", kwargs={"spare_id": self.pk})

    def get_stars_count_fill(self):
        return range(math.floor(self.rating))

    def get_stars_count_empty(self):
        return range(5 - math.floor(self.rating))

    def delete(self):
        with connection.cursor() as cursor:
            cursor.execute("UPDATE spares_spare SET status = 'Deleted' WHERE id = %s", [self.pk])

    class Meta:
        verbose_name = "Авиазапчасть"
        verbose_name_plural = "Авиазапчасти"


class Order(models.Model):
    STATUS_CHOICES = (
        ('Injected', 'Введён'),
        ('At work', 'В работе'),
        ('Сompleted', 'Завершён'),
        ('Cancelled', 'Отменён'),
        ('Deleted', 'Удалён'),
    )

    status = models.CharField(max_length=100, choices=STATUS_CHOICES, default='Injected', verbose_name="Статус")
    date_created = models.DateTimeField(default=datetime.now(tz=timezone.utc), verbose_name="Дата создания")
    date_of_formation = models.DateTimeField(default=datetime.now(tz=timezone.utc), verbose_name="Дата формирования")
    date_complete = models.DateTimeField(default=datetime.now(tz=timezone.utc), verbose_name="Дата завершения")
    spares = models.ManyToManyField(Spare, verbose_name="Авиазапчасти", null=False)

    def __str__(self):
        return "Заказ №" + str(self.pk)

    class Meta:
        verbose_name = "Заказ"
        verbose_name_plural = "Заказы"
