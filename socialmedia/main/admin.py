from django.contrib import admin
from .models import University,AssignmentType, Lecture, Course, Group

# Register your models here.


admin.site.register(University)
admin.site.register(AssignmentType)
admin.site.register(Lecture)
admin.site.register(Course)
admin.site.register(Group)