# Generated by Django 4.2.10 on 2024-03-01 03:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("main", "0014_remove_group_course_group_course"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="grade",
            name="assignment",
        ),
        migrations.RemoveField(
            model_name="grade",
            name="student",
        ),
        migrations.AddField(
            model_name="assignment",
            name="grade",
            field=models.ForeignKey(
                null=True, on_delete=django.db.models.deletion.SET_NULL, to="main.grade"
            ),
        ),
    ]