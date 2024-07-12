from django.urls import path

from spares.views import *

urlpatterns = [
    path('send/', sender),
    path('upload/', getter),
    # Набор методов для услуг (Авизапчастей)
   
]