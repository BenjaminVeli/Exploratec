from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Specialty, Note

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "password"]
        extra_kwargs = {"password": {"write_only": True}}
        
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user 

class SpecialtySerializer(serializers.ModelSerializer):
    class Meta:
        model = Specialty
        fields = ["id", "name"]
        
class NoteSerializer(serializers.ModelSerializer):
    created_at = serializers.SerializerMethodField()
            
    class Meta:
        model = Note
        fields = ["id", "name", "lastname", "dni", "phone", "reason", "is_accepted", "created_at", "specialty", "author"]
        extra_kwargs = {"author": {"read_only": True}}
    
    def get_created_at(self, obj):
        return obj.created_at.strftime("%d/%m/%Y")

    
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

    def create(self, validated_data):
        return super().create(validated_data)
    
    