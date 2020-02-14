# Generated by Django 2.2.3 on 2020-02-14 07:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('attractions', '0005_auto_20200214_0649'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cityinfo',
            name='source',
            field=models.CharField(choices=[('B', 'BaiDu'), ('G', 'GaoDe'), ('D', 'DaiDing')], max_length=1, verbose_name='交通数据来源'),
        ),
    ]
