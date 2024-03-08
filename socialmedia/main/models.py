from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator

class University(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return self.name


gender = (
    ('male', 'Мужской'),
    ('female', 'Женский')
)


class Teacher(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=256, null=True)
    last_name = models.CharField(max_length=256, null=True)
    university = models.ForeignKey(University, on_delete=models.CASCADE)
    birth_date = models.DateField()
    address = models.CharField(max_length=256)
    gender = models.CharField(max_length=8,choices=gender)
    phone_number = models.CharField(max_length=12)
    type = models.CharField(default='Teacher', max_length=256)

    def __str__(self):
        return self.user.username


class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=256, null=True)
    last_name = models.CharField(max_length=256, null=True)
    university = models.ForeignKey(University, on_delete=models.CASCADE)
    major = models.CharField(max_length=255)
    year = models.IntegerField()
    clubs_in = models.ManyToManyField('InterestClub', null=True)
    birth_date = models.DateField()
    address = models.CharField(max_length=256)
    gender = models.CharField(max_length=8,choices=gender)
    phone_number = models.CharField(max_length=12)
    type = models.CharField(default='Student', max_length=256)

    def __str__(self):
        return self.user.username


class Group(models.Model):
    name = models.CharField(max_length=255)
    teacher = models.ForeignKey(Teacher, on_delete=models.SET_NULL, null=True, blank=True)
    students = models.ManyToManyField(Student, related_name='groups')
    curator = models.ForeignKey(Teacher, on_delete=models.SET_NULL, null=True, blank=True, related_name='curator_groups')
    course = models.ManyToManyField('Course', null=True)

    def __str__(self):
        return self.name


class InterestClub(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    img = models.ImageField(upload_to='club/', null=True)
    university = models.ForeignKey(University, on_delete=models.CASCADE)  # Добавлено поле для связи с университетом
    members = models.ManyToManyField(User, related_name='interest_clubs')

    def __str__(self):
        return self.name


class Course(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    students = models.ManyToManyField(Student, related_name='course_students')
    lectures = models.ManyToManyField('Lecture', null=True)

    def __str__(self):
        return self.title

class Lecture(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    file = models.FileField(upload_to='lectures/')
    task = models.ForeignKey('HomeTask', on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.title
        

class HomeTask(models.Model):
    text = models.TextField()
    # file = models.FileField(upload_to='task/', null=True)
    date_start = models.DateField(auto_now_add=True)
    date_end = models.DateField()

    def __str__(self):
        return str(self.date_start)



class AssignmentType(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Assignment(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE, null=True)
    hometask = models.ForeignKey(HomeTask, on_delete=models.SET_NULL, null=True)
    due_date = models.DateField(auto_now_add=True)
    file = models.FileField(upload_to='assignments/')
    grade = models.ForeignKey('Grade', on_delete=models.SET_NULL, null=True, blank=True)
    assignment_type = models.ForeignKey(AssignmentType, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.due_date)

class Grade(models.Model):
    score = models.PositiveIntegerField(validators=[MaxValueValidator(100)])
    feedback = models.TextField()
    is_resubmitted = models.BooleanField(default=False)

    def __str__(self):
        return str(self.pk)


class TeacherRating(models.Model):
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    rating = models.PositiveIntegerField(validators=[MaxValueValidator(5)])
    anonymous = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.teacher.user.username} - Rating: {self.rating}"


class StudentRating(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    rating = models.PositiveIntegerField(validators=[MaxValueValidator(5)])
    anonymous = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.student.user.username} - Rating: {self.rating}"



class YearlyGrade(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    related_grades = models.ManyToManyField(Grade)
    average_score = models.FloatField()
    course = models.ForeignKey(Course, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return str(self.average_score)

