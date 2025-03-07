from django.urls import path

from spares.views import *

urlpatterns = [
    path('', index, name="home"),
    path('spare/<int:spare_id>', spare_details, name="spare_details"),
    path('spare/<int:spare_id>/delete/', delete, name="delete"),
]
