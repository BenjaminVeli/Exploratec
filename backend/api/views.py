from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer , SpecialtySerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Specialty

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
class SpecialtyListCreate(generics.ListCreateAPIView):
    serializer_class = SpecialtySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Specialty.objects.all()

    def perform_create(self, serializer):
        serializer.save()
