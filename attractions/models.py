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
    geographic = models.TextField(verbose_name="景区经纬度范围", help_text="存储景区经纬度范围的字典数据{{longitude,latitude},,,,,}")
    air_id = models.IntegerField(verbose_name="天气标示")

    class Meta:
        db_table = 'attractionInfo'


class RealTimeAttractionPersonTraffic(models.Model):
    attraction = models.ForeignKey(to=AttractionInfo, on_delete=models.CASCADE, related_name='attraction')
    collect_datetime = models.DateTimeField(verbose_name="采集数据时间", help_text="")
    num = models.IntegerField(verbose_name="流量", help_text="景区客流量数据")

    class Meta:
        db_table = 'attraction_person_traffic'


class RealTimeCityTraffic(models.Model):
    city = models.ForeignKey(to=CityInfo, on_delete=models.CASCADE, related_name="city")
    collect_datetime = models.DateTimeField(verbose_name="采集数据时间", help_text="")
    congestion_index = models.FloatField(verbose_name="拥堵指数")

    class Meta:
        db_table = 'attraction_traffic'


class RealTimeAttractionAirState(models.Model):
    attraction = models.ForeignKey(to=AttractionInfo, on_delete=models.CASCADE, related_name='attraction')
    aqi = models.SmallIntegerField()
    pm2 = models.SmallIntegerField()
    pm10 = models.SmallIntegerField()
    co = models.FloatField()
    no2 = models.SmallIntegerField()
    o3 = models.SmallIntegerField()
    so2 = models.SmallIntegerField()

    class Meta:
        db_table = 'air_state'


class RealTimeAttractionPopulationDistribution(models.Model):
    attraction = models.ForeignKey(to=AttractionInfo, on_delete=models.CASCADE, related_name='attraction')
    collect_datetime = models.DateTimeField(verbose_name="采集数据时间", help_text="")
    longitude = models.FloatField()
    latitude = models.FloatField()
    num = models.IntegerField(verbose_name="", help_text="某个经纬度上的人数")

    class Meta:
        db_table = 'population_distribution'
