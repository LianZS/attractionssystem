from django.contrib import admin
from .models import AttractionInfo, CityInfo, ProvinceInfo


# Register your models here.
@admin.register(AttractionInfo)
class AttractionInfoAdmin(admin.ModelAdmin):
    list_per_page = 10


@admin.register(CityInfo)
class CityInfoAdmin(admin.ModelAdmin):
    list_per_page = 10


@admin.register(ProvinceInfo)
class ProvinceModelAdmin(admin.ModelAdmin):
    list_per_page = 10
