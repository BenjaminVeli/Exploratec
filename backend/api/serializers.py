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
    class Meta:
        model = Note
        fields = ["id", "name", "lastname", "dni", "phone", "reason", "is_accepted", "created_at", "specialty", "author"]
        extra_kwargs = {"author": {"read_only": True}}