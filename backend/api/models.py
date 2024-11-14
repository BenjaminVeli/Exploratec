from django.db import models
from django.utils import timezone # Funcionalidad de fechas
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, UserManager # Modelos personalizados de usuarios

# Manager personalizado para el modelo de usuario, es como una interfaz la cual se accede a la base de datos y se realizan operaciones de consulta y manipulación de datos.
class CustomUserManager(UserManager):
    # Crear usuario genérico
    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('Los usuarios deben tener una dirección de correo electrónico.')

        email = self.normalize_email(email) #tranforma en minusculas

        user = self.model(
            email=email,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)

        return user
    
    # Crear un usuario normal
    def create_user(self, email=None, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_active", True)
        return self._create_user(email, password, **extra_fields)

    # Crear un superusuario
    def create_superuser(self, email=None, password=None, **extra_fields):
         extra_fields.setdefault('is_staff', True)
         extra_fields.setdefault('is_active', True)
         return self._create_user( email, password, **extra_fields)
    
# Modelo de usuario personalizado
class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=50, unique=True)
    username = models.CharField(max_length=50, unique=True)
    date_joined = models.DateTimeField(default=timezone.now)
    last_password_change = models.DateTimeField(null=True, blank=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    
    objects = CustomUserManager() # Usar el CustomUserManager en lugar del predeterminado
    
    USERNAME_FIELD = 'username'  # Usamos 'username' como campo de autenticación
    REQUIRED_FIELDS = ['email']  # Solo necesitas 'email', ya que 'username' es el campo principal
    
    def __str__(self):
        return self.username
    
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
    