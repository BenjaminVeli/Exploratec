from django.urls import path
from . import views

urlpatterns = [
    path("specialties/", views.SpecialtyListCreate.as_view(), name="specialty-list"),
]
