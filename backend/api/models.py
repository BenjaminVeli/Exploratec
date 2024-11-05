from django.db import models
from django.contrib.auth.models import User

class Specialty(models.Model):
    name = models.CharField(max_length=100)
    
    def __str__(self):
        return self.name

class Note(models.Model):
    name = models.CharField(max_length=100)
    lastname = models.CharField(max_length=100)
    dni = models.CharField(max_length=9)
    phone = models.CharField(max_length=9)
    specialty = models.ForeignKey(Specialty, on_delete=models.CASCADE, related_name="notes_especialidad")
    reason = models.TextField()
    is_accepted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes_author")
    visit_date = models.DateTimeField(null=True, blank=True)
    gender = models.CharField(max_length=100)
    family_name = models.CharField(max_length=100, null=True, blank=True)
    family_lastname = models.CharField(max_length=100, null=True, blank=True)
    family_dni = models.CharField(max_length=9, null=True, blank=True)
    