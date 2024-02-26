from django.contrib import admin
from .models import University,AssignmentType, Lecture

# Register your models here.


admin.site.register(University)
admin.site.register(AssignmentType)
admin.site.register(Lecture)