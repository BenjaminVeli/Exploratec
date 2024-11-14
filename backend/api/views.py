from django.shortcuts import render
from rest_framework import generics, status
from .serializers import UserSerializer , SpecialtySerializer, NoteSerializer, NoteListSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from .models import Note, Specialty, User
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Count , Q
from rest_framework.pagination import PageNumberPagination
from datetime import timedelta
from django.utils import timezone
from django.db.models.functions import TruncMonth

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request):
        user = request.user
        current_password = request.data.get("current_password")
        new_password = request.data.get("new_password")

        # Verificar si el usuario ha cambiado la contraseña en el último minuto
        if user.last_password_change:
            time_since_last_change = timezone.now() - user.last_password_change
            if time_since_last_change < timedelta(minutes=1):
                return Response({"error": "Solo puedes cambiar tu contraseña cada 1 minuto."}, status=status.HTTP_400_BAD_REQUEST)

        # Verificar si la contraseña actual es correcta
        if not user.check_password(current_password):
            return Response({"error": "La contraseña actual es incorrecta."}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password) # Establecer la nueva contraseña 
        user.last_password_change = timezone.now()  # Actualizar el campo last_password_change a la fecha actual
        user.save()

        return Response({"success": "Contraseña actualizada."}, status=status.HTTP_200_OK) 

class SpecialtyListCreate(generics.ListCreateAPIView):
    serializer_class = SpecialtySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Specialty.objects.all()

    def perform_create(self, serializer):
        serializer.save()

class NoteListView(generics.ListAPIView):
    serializer_class = NoteListSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)

class NoteListCreate(generics.CreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

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
    
    
# ------------------------- Reports -------------------------    

class GenderCountView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request):
        male_count = Note.objects.filter(gender="Masculino").count()  # Total de registros con género Masculino
        female_count = Note.objects.filter(gender="Femenino").count()  # Total de registros con género Femenino

        return Response({
            'male_count': male_count,
            'female_count': female_count
        })

class UserCountView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request):
        active_users = User.objects.filter(is_active=True).count()  # Total de usuarios activos 
        deactive_users = User.objects.filter(is_active=False).count()  # Total de usuarios desactivados
        
        return Response({
            'active_users': active_users,
            'deactive_users': deactive_users
        })

class RequestCountView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request):
        accepted_visit = Note.objects.filter(is_accepted=True).count()  # Total de usuarios activos 
        pending_visit = Note.objects.filter(is_accepted=False).count()  # Total de usuarios desactivados
        
        return Response({
            'accepted_visit': accepted_visit,
            'pending_visit': pending_visit
        })

class WeeklyUserRegistrationsView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]
    
    def get_day_name(self, date):
        # Diccionario de equivalencias para días en español
        dias = {
            0: 'M',  # Lunes
            1: 'T',  # Martes
            2: 'W',  # Miércoles
            3: 'T',  # Jueves
            4: 'F',  # Viernes
            5: 'S',  # Sábado
            6: 'S'   # Domingo
        }
        return dias[date.weekday()]

    def get(self, request):
        today = timezone.now().date()
        start_of_week = today - timedelta(days=today.weekday())
        end_of_week = start_of_week + timedelta(days=6)
        
        users_this_week = User.objects.filter(
            date_joined__date__range=(start_of_week, end_of_week)
        )
        
        daily_counts = (
            users_this_week
            .extra(select={'day': 'DATE(date_joined)'})
            .values('day')
            .annotate(count=Count('id'))
            .order_by('day')
        )

        # Convertir los resultados y añadir el nombre del día
        formatted_counts = []
        for item in daily_counts:
            date_obj = timezone.datetime.strptime(str(item['day']), '%Y-%m-%d').date()
            formatted_counts.append({
                'day': self.get_day_name(date_obj),  # Nombre abreviado del día
                'full_date': str(item['day']),       # Mantenemos la fecha completa por si la necesitas
                'count': item['count']
            })

        return Response({"weekly_user_registrations": formatted_counts})

class MonthlyVisitCountView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]
    
    def get(self, request, *args, **kwargs):
        # Agregar la truncación de fecha por mes
        monthly_visits = (
            Note.objects
            .filter(visit_date__isnull=False)
            .values(month=TruncMonth('visit_date'))  # Agrupar por mes
            .annotate(visit_count=Count('id'))  # Contar visitas por mes
            .order_by('month')  # Ordenar de más reciente a más antiguo
        )

        # Diccionario para mapear el número de mes al nombre del mes en español
        month_names = {
            1: "Ene", 2: "Feb", 3: "Mar", 4: "Abr", 5: "May", 6: "Jun",
            7: "Jul", 8: "Ago", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Dic"
        }

        # Formato de respuesta con el nombre del mes en lugar de la fecha
        result = [
            {
                'month': month_names[month['month'].month],  # Obtiene el nombre abreviado del mes
                'visit_count': month['visit_count']
            }
            for month in monthly_visits
        ]

        return Response(result, status=status.HTTP_200_OK)
    
class VisitTododayPagination(PageNumberPagination):
    page_size = 8
    page_size_query_param = 'page_size'
    max_page_size = 100

class VisitTodayListView(APIView):
    serializer_class = NoteListSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]
    pagination_class = VisitTododayPagination
    
    def get(self, request):
        today = timezone.now().date()  # Obtiene la fecha actual
        notes = Note.objects.filter(
            visit_date__date=today  # Filtra solo los registros con `visit_date` del día de hoy
        )
        
        # Paginación
        paginator = VisitTododayPagination()
        result_page = paginator.paginate_queryset(notes, request)
        serializer = self.serializer_class(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)
     

# ------------------------- Request CRUD -------------------------

class RequestPagination(PageNumberPagination):
    page_size = 8  # El número de solicitudes por página (alínealo con React)
    page_size_query_param = 'page_size'
    max_page_size = 100

class RequestListView(APIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]
    pagination_class = RequestPagination

    def get(self, request):
        search_query = request.GET.get('search', '')  # Obtén el query de búsqueda
        notes = Note.objects.filter(
            Q(name__icontains=search_query) | Q(lastname__icontains=search_query),  # Filtro de búsqueda
            is_accepted=False
        )
        
        # Paginación
        paginator = RequestPagination()
        result_page = paginator.paginate_queryset(notes, request)
        serializer = self.serializer_class(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)
    
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

class UserPagination(PageNumberPagination):
    page_size = 8  # El número de usuarios por página (alínealo con React)
    page_size_query_param = 'page_size'
    max_page_size = 100


class UserListView(APIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]
    pagination_class = UserPagination

    def get(self, request):
        search_query = request.GET.get('search', '')  # Obtén el query de búsqueda
        users = User.objects.filter(
            Q(is_superuser=False, is_staff=False),  # Excluye superusers y staff
            Q(username__icontains=search_query) | Q(email__icontains=search_query)  # Filtro de búsqueda
        )

        # Paginación
        paginator = UserPagination()
        result_page = paginator.paginate_queryset(users, request)
        serializer = self.serializer_class(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)
    
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