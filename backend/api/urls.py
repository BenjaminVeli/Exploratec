from django.urls import path
from . import views

urlpatterns = [
    path("especialidades/", views.EspecialidadListCreate.as_view(), name="especialidad-list"),
]
