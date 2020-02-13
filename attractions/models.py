from django.db import models


# Create your models here.

class ProvinceInfo(models.Model):
    """
    省份信息
    """
    province = models.CharField(max_length=32)
    pic = models.ImageField(upload_to='media/img/')

    class Meta:
        db_table = 'provinceInfo'


class CityInfo(models.Model):
    """
    城市信息
    """
    province = models.ForeignKey(to=ProvinceInfo, on_delete=models.CASCADE, related_name="city_info")
    city_name = models.CharField(max_length=32, verbose_name="景区所处城市名", db_column='city')

    class Meta:
        db_table = 'cityInfo'


class AttractionTagInfo(models.Model):
    """
    景区标签
    """
    tag = models.CharField(max_length=32, verbose_name="标签")

    class Meta:
        db_table = 'tagInfo'


class AttractionInfo(models.Model):
    """
    景区信息
    """
    city = models.ForeignKey(to=CityInfo, on_delete=models.CASCADE, related_name='attraction_info')
    pid = models.IntegerField(verbose_name="景区标示")
    attraction_name = models.CharField(max_length=32, db_column='attraction', verbose_name="景区名")
    img = models.ImageField(upload_to='media/attraction', null=True, verbose_name="景区图片")
    geographic = models.TextField(verbose_name="景区经纬度范围", help_text="存储景区经纬度范围的字典数据{{longitude,latitude},,,,,}")
    tags = models.ManyToManyField(to=AttractionTagInfo, related_name='tags')

    class Meta:
        db_table = 'attractionInfo'


class RealTimeAttractionPersonTraffic(models.Model):
    """
    景区流量数据
    """
    attraction = models.ForeignKey(to=AttractionInfo, on_delete=models.CASCADE, related_name='person_traffic')
    collect_datetime = models.DateTimeField(verbose_name="采集数据时间", help_text="")
    num = models.IntegerField(verbose_name="流量", help_text="景区客流量数据")

    class Meta:
        db_table = 'attraction_person_traffic'


class RealTimeCityTraffic(models.Model):
    """
    城市交通数据
    """
    city = models.ForeignKey(to=CityInfo, on_delete=models.CASCADE, related_name="city_traffic")
    collect_datetime = models.DateTimeField(verbose_name="采集数据时间", help_text="")
    congestion_index = models.FloatField(verbose_name="拥堵指数")

    class Meta:
        db_table = 'attraction_traffic'


class RealTimeAttractionAirState(models.Model):
    """
    景区空气质量数据
    """
    attraction = models.ForeignKey(to=AttractionInfo, on_delete=models.CASCADE, related_name='air_state')
    collect_datetime = models.DateTimeField(verbose_name="采集数据时间", help_text="")
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
    """
    景区人口密度分布
    """
    attraction = models.ForeignKey(to=AttractionInfo, on_delete=models.CASCADE, related_name='population_distribution')
    collect_datetime = models.DateTimeField(verbose_name="采集数据时间", help_text="")
    longitude = models.FloatField()
    latitude = models.FloatField()
    num = models.IntegerField(verbose_name="", help_text="某个经纬度上的人数")

    class Meta:
        db_table = 'population_distribution'


class HeatSource(models.Model):
    """
    搜索热度数据来源
    """
    CHOIC = [('B', 'BaiDu'), ('W', 'WeiXin'), ('S', 'SouGou')]
    way = models.CharField(max_length=1, verbose_name="搜索热度来源", choices=CHOIC)

    class Meta:
        db_table = 'heat_source'


class AttractionSearchHeatKeyWord(models.Model):
    """
    景区搜索关键词
    """
    attraction = models.OneToOneField(to=AttractionInfo, on_delete=models.CASCADE, related_name='search_keyword')
    keyword = models.CharField(max_length=32, verbose_name="搜索关键词")
    source = models.ManyToManyField(to=HeatSource, related_name='data_source', verbose_name="数据来源")

    class Meta:
        db_table = 'search_keyword'


class AttractionSearchHeat(models.Model):
    """
    景区搜索热度
    """
    search_keyWord = models.ForeignKey(to=AttractionSearchHeatKeyWord, on_delete=models.CASCADE,
                                       related_name='search_heat')
    collect_datetime = models.DateTimeField(verbose_name="采集数据时间", help_text="")
    heat = models.IntegerField(verbose_name="搜索热度")

    class Meta:
        db_table = 'search_heat'
