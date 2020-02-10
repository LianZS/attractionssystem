from django.urls import path
from django.conf import settings

from .views import ProvinceNavigation
from django.conf.urls.static import static

app_name = 'attractions'
urlpatterns = [
                  path('navigation', ProvinceNavigation.as_view(), name='province_list'),

              ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + \
              static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
