# Generated by Django 2.2.3 on 2020-02-13 07:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AttractionInfo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pid', models.IntegerField(verbose_name='景区标示')),
                ('attraction_name', models.CharField(db_column='attraction', max_length=32, verbose_name='景区名')),
                ('img', models.ImageField(null=True, upload_to='media/attraction', verbose_name='景区图片')),
                ('longitude', models.FloatField(verbose_name='经度')),
                ('latitude', models.FloatField(verbose_name='纬度')),
                ('geographic', models.TextField(help_text='存储景区经纬度范围的字典数据{{longitude,latitude},,,,,}', verbose_name='景区经纬度范围')),
            ],
            options={
                'db_table': 'attractionInfo',
            },
        ),
        migrations.CreateModel(
            name='AttractionTagInfo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tag', models.CharField(max_length=32, verbose_name='标签')),
            ],
            options={
                'db_table': 'tagInfo',
            },
        ),
        migrations.CreateModel(
            name='CityInfo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('city_name', models.CharField(db_column='city', max_length=32, verbose_name='景区所处城市名')),
                ('pid', models.IntegerField(verbose_name='城市标示')),
                ('longitude', models.FloatField(verbose_name='经度')),
                ('latitude', models.FloatField(verbose_name='纬度')),
                ('source', models.CharField(choices=[('B', 'BaiDu'), ('G', 'GaoDe')], max_length=1, verbose_name='交通数据来源')),
            ],
            options={
                'db_table': 'cityInfo',
            },
        ),
        migrations.CreateModel(
            name='HeatSource',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('way', models.CharField(choices=[('B', 'BaiDu'), ('W', 'WeiXin'), ('S', 'SouGou')], max_length=1, verbose_name='搜索热度来源')),
            ],
            options={
                'db_table': 'heat_source',
            },
        ),
        migrations.CreateModel(
            name='ProvinceInfo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('province', models.CharField(max_length=32)),
                ('pic', models.ImageField(upload_to='media/img/')),
            ],
            options={
                'db_table': 'provinceInfo',
            },
        ),
        migrations.CreateModel(
            name='RealTimeCityTraffic',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('collect_datetime', models.DateTimeField(verbose_name='采集数据时间')),
                ('congestion_index', models.FloatField(verbose_name='拥堵指数')),
                ('city', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='city_traffic', to='attractions.CityInfo')),
            ],
            options={
                'db_table': 'attraction_traffic',
            },
        ),
        migrations.CreateModel(
            name='RealTimeAttractionPopulationDistribution',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('collect_datetime', models.DateTimeField(verbose_name='采集数据时间')),
                ('longitude', models.FloatField(verbose_name='经度')),
                ('latitude', models.FloatField(verbose_name='纬度')),
                ('num', models.IntegerField(help_text='某个经纬度上的人数', verbose_name='')),
                ('attraction', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='population_distribution', to='attractions.AttractionInfo')),
            ],
            options={
                'db_table': 'population_distribution',
            },
        ),
        migrations.CreateModel(
            name='RealTimeAttractionPersonTraffic',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('collect_datetime', models.DateTimeField(verbose_name='采集数据时间')),
                ('num', models.IntegerField(help_text='景区客流量数据', verbose_name='流量')),
                ('attraction', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='person_traffic', to='attractions.AttractionInfo')),
            ],
            options={
                'db_table': 'attraction_person_traffic',
            },
        ),
        migrations.CreateModel(
            name='RealTimeAttractionAirState',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('collect_datetime', models.DateTimeField(verbose_name='采集数据时间')),
                ('aqi', models.SmallIntegerField()),
                ('pm2', models.SmallIntegerField()),
                ('pm10', models.SmallIntegerField()),
                ('co', models.FloatField()),
                ('no2', models.SmallIntegerField()),
                ('o3', models.SmallIntegerField()),
                ('so2', models.SmallIntegerField()),
                ('attraction', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='air_state', to='attractions.AttractionInfo')),
            ],
            options={
                'db_table': 'air_state',
            },
        ),
        migrations.AddField(
            model_name='cityinfo',
            name='province',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='city_info', to='attractions.ProvinceInfo'),
        ),
        migrations.CreateModel(
            name='AttractionSearchHeatKeyWord',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('keyword', models.CharField(max_length=32, verbose_name='搜索关键词')),
                ('attraction', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='search_keyword', to='attractions.AttractionInfo')),
                ('source', models.ManyToManyField(related_name='data_source', to='attractions.HeatSource', verbose_name='数据来源')),
            ],
            options={
                'db_table': 'search_keyword',
            },
        ),
        migrations.CreateModel(
            name='AttractionSearchHeat',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('collect_datetime', models.DateTimeField(verbose_name='采集数据时间')),
                ('heat', models.IntegerField(verbose_name='搜索热度')),
                ('search_keyWord', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='search_heat', to='attractions.AttractionSearchHeatKeyWord')),
            ],
            options={
                'db_table': 'search_heat',
            },
        ),
        migrations.AddField(
            model_name='attractioninfo',
            name='city',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='attraction_info', to='attractions.CityInfo'),
        ),
        migrations.AddField(
            model_name='attractioninfo',
            name='tags',
            field=models.ManyToManyField(related_name='tags', to='attractions.AttractionTagInfo'),
        ),
    ]
