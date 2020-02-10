from django.db import models


# Create your models here.

class ProvinceInfo(models.Model):
    province = models.CharField(max_length=32)
    pic = models.ImageField(upload_to='media/img/')

    class Meta:
        db_table = 'provinces'


class CityInfo(models.Model):
    province = models.ForeignKey(to=ProvinceInfo, on_delete=models.CASCADE, related_name="city_info")
    city_name = models.CharField(max_length=32, verbose_name="景区所处城市名", db_column='city')

    class Meta:
        db_table = 'cityInfo'


class AttractionInfo(models.Model):
    city = models.ForeignKey(to=CityInfo, on_delete=models.CASCADE, related_name='attraction_info')
    pid = models.IntegerField(verbose_name="景区标示")
    attraction_name = models.CharField(max_length=32, db_column='attraction', verbose_name="景区名")
    img = models.ImageField(upload_to='media/attraction', null=True, verbose_name="景区图片")

    class Meta:
        db_table = 'attractionInfo'
