# Generated by Django 4.2.10 on 2024-03-08 17:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("main", "0016_alter_assignment_grade"),
    ]

    operations = [
        migrations.AlterField(
            model_name="hometask",
            name="date_start",
            field=models.DateField(auto_now_add=True),
        ),
    ]
