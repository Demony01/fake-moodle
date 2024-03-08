from django.urls import path
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from . import views

urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/token/', TokenObtainPairView.as_view(), name='token_obtain_view'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh_view'),
    path('logout/', views.Logout.as_view()),

    path('create/university', views.CreateUniversityView.as_view()),

    path('create/teacher', views.CreateTeacherView.as_view()),
    path('teacher/<int:pk>', views.DetailTeacherView.as_view()),
    
    path('create/student', views.CreateStudentView.as_view()),
    path('student/<int:pk>', views.DetailStudentView.as_view()),
    
    path('create/group', views.CreateGroupView.as_view()),
    path('group/<int:pk>', views.DetailGroupView.as_view()),
    
    path('create/club', views.CreateClubView.as_view()),
    path('club/<int:pk>', views.DetailClubView.as_view()),
     
    path('create/course', views.CreateCourseView.as_view()),
    path('course/<int:pk>', views.DetailCourseView.as_view()),
    path('change/course/<int:pk>', views.NICECourseView.as_view()),
    
    path('create/lecture', views.CreateLectureView.as_view()),
    
    path('create/assignmenttype',views.CreateAssignmentTypeView.as_view()),
    
    path('create/assignment', views.CreateAssignmentView.as_view()),
    path('assignment/<int:pk>', views.AssignmentView.as_view()),
    
    path('create/grade', views.CreateGradeView.as_view()),
    path('grade/<int:pk>', views.GradeView.as_view()),
    
    path('create/teacher-rating', views.CreateTeacherRatingView.as_view()),
    path('teacher-rating/<int:pk>/', views.TeacherRatingView.as_view()),
    
    path('create/student-rating', views.CreateTeacherRatingView.as_view()),
    path('student-rating/<int:pk>/', views.TeacherRatingView.as_view()),

    path('create/generalgrade', views.CreateGeneralGrade.as_view()),
    path('generalgrade/<int:pk>/', views.GeneralGradeView.as_view()),

    path('create/task', views.HomeTaskView.as_view()),
]