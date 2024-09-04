from django.urls import path
from . import views

urlpatterns = [
    path("specialties/", views.SpecialtyListCreate.as_view(), name="specialty-list"),
    path('specialty-stats/', views.SpecialtyStatsView.as_view(), name='specialty-stats'),
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),
]
