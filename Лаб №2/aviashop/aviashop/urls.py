from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static

from aviashop import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include("spares.urls")),
    path("__reload__/", include("django_browser_reload.urls")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
