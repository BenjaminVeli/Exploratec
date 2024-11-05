from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Specialty, Note

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "password", "is_staff", "is_active", "last_password_change"]
        extra_kwargs = {"password": {"write_only": True}}
        
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user 

class SpecialtySerializer(serializers.ModelSerializer):
    class Meta:
        model = Specialty
        fields = ["id", "name"]



class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "name", "lastname", "dni", "phone", "reason", "is_accepted", "created_at", "specialty", "author","visit_date","family_name","family_lastname","family_dni","gender"]
        extra_kwargs = {"author": {"read_only": True}}
    
    def validate(self, attrs):
        attrs = super().validate(attrs)
        user = self.context['request'].user
        last_note = Note.objects.filter(author=user).order_by('-created_at').first()
        if last_note and not last_note.is_accepted:
            raise serializers.ValidationError("No puedes crear más formularios hasta que el formulario anterior sea aceptado.")

        current_accepted_count = Note.objects.filter(author=user, is_accepted=True).count()
        
        if current_accepted_count >= 2:
            raise serializers.ValidationError("Se ha alcanzado el límite de formularios aceptados.")
        return attrs

class NoteListSerializer(serializers.ModelSerializer):
    specialty = SpecialtySerializer(read_only=True) # Mostrar el nombre de la especialidad
    created_at = serializers.SerializerMethodField()
    visit_date = serializers.SerializerMethodField()
    
    class Meta:
        model = Note
        fields = ["id", "name", "lastname", "dni", "phone", "reason", "is_accepted", "created_at", "specialty", "author","visit_date","family_name","family_lastname","family_dni","gender"]
        extra_kwargs = {"author": {"read_only": True}}
        
    def get_created_at(self, obj):
        return obj.created_at.strftime('%d/%m/%Y %H:%M')
    
    def get_visit_date(self, obj):
        if obj.visit_date is not None:  # Verifica si visit_date no es None
            return obj.visit_date.strftime('%d/%m/%Y %H:%M')
        return None 
    