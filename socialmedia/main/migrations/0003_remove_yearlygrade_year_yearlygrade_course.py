# Generated by Django 4.2.7 on 2023-12-25 14:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("main", "0002_yearlygrade_delete_generalgrade"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="yearlygrade",
            name="year",
        ),
        migrations.AddField(
            model_name="yearlygrade",
            name="course",
            field=models.ForeignKey(
                null=True, on_delete=django.db.models.deletion.CASCADE, to="main.course"
            ),
        ),
    ]
