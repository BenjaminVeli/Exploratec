from django.urls import path
from . import views

urlpatterns = [
    path("specialties/", views.SpecialtyListCreate.as_view(), name="specialty-list"),
    path('specialty-stats/', views.SpecialtyStatsView.as_view(), name='specialty-stats'),
    path("note-list/", views.NoteListView.as_view(), name="note-list"),
    path("note-create/", views.NoteListCreate.as_view(), name="note-create"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete_note"),
    
    
    path('request-list/', views.RequestListView.as_view(), name='request-list'),
    path('request-delete/<int:pk>/', views.RequestListDelete.as_view(), name='request-list'),
    path('request-update/<int:pk>/', views.RequestListUpdate.as_view(), name='request-update'),

    path('user-list/', views.UserListView.as_view(), name='user-list'),
    path('user-update/<int:pk>/', views.UserListUpdate.as_view(), name='user-update'),
    
    
    path('current-user/', views.CurrentUserView.as_view(), name='current-user'),
    path('change-password/', views.ChangePasswordView.as_view(), name='change-password'),
    
    path('user-count/', views.UserCountView.as_view(), name='user-count'),
    path('request-count/', views.RequestCountView.as_view(), name='request-count'),
    path('gender-count/', views.GenderCountView.as_view(), name='gender-count'),
    path('weekly-user-registrations/', views.WeeklyUserRegistrationsView.as_view(), name='weekly-user-registrations'),
    path('visits-monthly/', views.MonthlyVisitCountView.as_view(), name='visits-monthly'),
    path('visits-today/', views.VisitTodayListView.as_view(), name='visits-today'),
]
