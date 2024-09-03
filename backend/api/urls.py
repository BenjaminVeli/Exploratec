from django.urls import path
from . import views

urlpatterns = [
    path("specialties/", views.SpecialtyListCreate.as_view(), name="specialty-list"),
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),
]
