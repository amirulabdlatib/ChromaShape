from .models import ChromaShape
from rest_framework import serializers

class ChromaShapeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChromaShape
        fields = '__all__'