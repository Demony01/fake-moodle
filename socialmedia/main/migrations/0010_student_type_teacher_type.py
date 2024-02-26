# Generated by Django 4.2.7 on 2023-12-28 13:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("main", "0009_teacher_first_name_teacher_last_name"),
    ]

    operations = [
        migrations.AddField(
            model_name="student",
            name="type",
            field=models.CharField(default="Student", max_length=256),
        ),
        migrations.AddField(
            model_name="teacher",
            name="type",
            field=models.CharField(default="Teacher", max_length=256),
        ),
    ]