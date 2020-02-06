from django.urls import path,include
from .views import first_page_view
urlpatterns = [
    path('',first_page_view),

]