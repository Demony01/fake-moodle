from django.contrib.auth.models import User
from rest_framework import serializers
from .models import University, HomeTask, YearlyGrade, Teacher, Student, Group, InterestClub, Course, Lecture, AssignmentType, Assignment, Grade, StudentRating, TeacherRating

class UniversitySerializer(serializers.ModelSerializer):
    class Meta:
        model = University
        fields = '__all__'


class CreateTeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = '__all__'


class TeacherSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    university = UniversitySerializer(read_only=True)

    class Meta:
        model = Teacher
        fields = '__all__'



class CreateStudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'


class StudentSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    university = UniversitySerializer(read_only=True)

    class Meta:
        model = Student
        fields = '__all__'


class CreateGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = '__all__'


class CreateInterestClubSerializer(serializers.ModelSerializer):
    class Meta:
        model = InterestClub
        fields = '__all__'


class InterestClubSerializer(serializers.ModelSerializer):
    university = UniversitySerializer(read_only=True)
    members = serializers.ReadOnlyField(source='members.count')

    class Meta:
        model = InterestClub
        fields = '__all__'


class CreateCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'


class HomeTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomeTask
        fields = '__all__'


class CreateLectureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lecture
        fields = '__all__'


class LectureSerializer(serializers.ModelSerializer):
    task = HomeTaskSerializer(read_only=True)
    class Meta:
        model = Lecture
        fields = '__all__'


class CourseSerializer(serializers.ModelSerializer):
    teacher = TeacherSerializer(read_only=True)
    students = StudentSerializer(many=True, read_only=True)
    lectures = LectureSerializer(many=True, read_only=True)


    class Meta:
        model = Course
        fields = '__all__'


class AssignmentTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssignmentType
        fields = '__all__'
       
       


class GradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields = '__all__'

class CreateAssignmentSerializer(serializers.ModelSerializer):
    grade = GradeSerializer(read_only=True)
    class Meta:
        model = Assignment
        fields = '__all__'

class AssignmentSerializer(serializers.ModelSerializer):
    course = CourseSerializer(read_only=True)
    assignment_type = AssignmentTypeSerializer(read_only=True)
    grade = GradeSerializer()

    class Meta:
        model = Assignment
        fields = '__all__'


class CreateGradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields = '__all__'


class CreateTeacherRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeacherRating
        fields = '__all__'


class TeacherRatingSerializer(serializers.ModelSerializer):
    teacher = TeacherSerializer(read_only=True)
    class Meta:
        model = TeacherRating
        fields = '__all__'


class CreateStudentRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentRating
        fields = '__all__'


class StudentRatingSerializer(serializers.ModelSerializer):
    student = StudentSerializer(read_only=True)
    class Meta:
        model = StudentRating
        fields = '__all__'



class CreateYearlyGradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = YearlyGrade
        fields = '__all__'


class YearlyGradeSerializer(serializers.ModelSerializer):
    related_grades = GradeSerializer(many=True, read_only=True)
    course = CourseSerializer(read_only=True)

    class Meta:
        model = YearlyGrade
        fields = '__all__'



class CreateGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = '__all__'
        

class GroupSerializer(serializers.ModelSerializer):
    teacher = TeacherSerializer(read_only=True)
    students = StudentSerializer(many=True, read_only=True)
    curator = TeacherSerializer(read_only=True)
    course = CourseSerializer(many=True, read_only=True)

    class Meta:
        model = Group
        fields = '__all__'
