from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, status
from .serializers import UserSerializer , SpecialtySerializer, NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note, Specialty
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Count

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

class RequestListView(APIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request):
        notes = Note.objects.all()
        serializer = self.serializer_class(notes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class SpecialtyListCreate(generics.ListCreateAPIView):
    serializer_class = SpecialtySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Specialty.objects.all()

    def perform_create(self, serializer):
        serializer.save()

class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)

class SpecialtyStatsView(APIView):
    permission_classes = [AllowAny] 

    def get(self, request):
        specialties = Specialty.objects.all()
        stats = Note.objects.values('specialty__name').annotate(total=Count('specialty')).order_by('specialty__name')
        stats_dict = {stat['specialty__name']: stat['total'] for stat in stats}
        
        all_stats = []
        for specialty in specialties:
            all_stats.append({
                'specialty__name': specialty.name,
                'total': stats_dict.get(specialty.name, 0)
            })
        
        return Response(all_stats)