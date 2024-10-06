from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, status
from .serializers import UserSerializer , SpecialtySerializer, NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
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
    

# ------------------------- Request CRUD -------------------------

class RequestListView(APIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request):
        notes = Note.objects.all()
        serializer = self.serializer_class(notes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class RequestListDelete(generics.DestroyAPIView):
    queryset = Note.objects.all()  
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]
    
class RequestListUpdate(generics.UpdateAPIView):
    queryset = Note.objects.all()  # Define el conjunto de datos a actualizar
    serializer_class = NoteSerializer  # Define el serializador
    permission_classes = [IsAuthenticated, IsAdminUser]  # Define permisos

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)  # Si deseas actualizaciones parciales (PATCH), define `partial=True`
        instance = self.get_object()  # Obtén la instancia del objeto que se va a actualizar
        serializer = self.get_serializer(instance, data=request.data, partial=partial)  # Valida los datos
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)  # Realiza la actualización
        return Response(serializer.data, status=status.HTTP_200_OK)

    def perform_update(self, serializer):
        serializer.save()

# ------------------------- User CRUD -------------------------

class UserListView(APIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request):
        users = User.objects.all()
        serializer = self.serializer_class(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class UserListUpdate(generics.UpdateAPIView):
    queryset = User.objects.all()  # Define el conjunto de datos a actualizar
    serializer_class = UserSerializer  # Define el serializador
    permission_classes = [IsAuthenticated, IsAdminUser]  # Define permisos

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)  # Si deseas actualizaciones parciales (PATCH), define `partial=True`
        instance = self.get_object()  # Obtén la instancia del objeto que se va a actualizar
        serializer = self.get_serializer(instance, data=request.data, partial=partial)  # Valida los datos
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)  # Realiza la actualización
        return Response(serializer.data, status=status.HTTP_200_OK)

    def perform_update(self, serializer):
        serializer.save()