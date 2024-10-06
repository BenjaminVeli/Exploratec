from django.urls import path
from . import views

urlpatterns = [
    path("specialties/", views.SpecialtyListCreate.as_view(), name="specialty-list"),
    path('specialty-stats/', views.SpecialtyStatsView.as_view(), name='specialty-stats'),
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete_note"),
    
    
    path('request-list/', views.RequestListView.as_view(), name='request-list'),
    path('request-delete/<int:pk>/', views.RequestListDelete.as_view(), name='request-list'),
    path('request-update/<int:pk>/', views.RequestListUpdate.as_view(), name='request-update'),

    path('user-list/', views.UserListView.as_view(), name='user-list'),
    path('user-update/<int:pk>/', views.UserListUpdate.as_view(), name='user-update'),
    
    
    path('current-user/', views.CurrentUserView.as_view(), name='current-user'),
]
