from django.urls import path
from . import views

urlpatterns = [
    path("specialties/", views.SpecialtyListCreate.as_view(), name="specialty-list"),
    path('specialty-stats/', views.SpecialtyStatsView.as_view(), name='specialty-stats'),
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete_note"),
    
    path('current-user/', views.CurrentUserView.as_view(), name='current-user'),
]
