# Generated by Django 4.2.7 on 2023-12-25 15:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("main", "0003_remove_yearlygrade_year_yearlygrade_course"),
    ]

    operations = [
        migrations.AddField(
            model_name="interestclub",
            name="img",
            field=models.ImageField(null=True, upload_to="club/"),
        ),
    ]
