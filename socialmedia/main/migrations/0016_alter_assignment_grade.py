# Generated by Django 4.2.10 on 2024-03-05 15:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("main", "0015_remove_grade_assignment_remove_grade_student_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="assignment",
            name="grade",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                to="main.grade",
            ),
        ),
    ]
