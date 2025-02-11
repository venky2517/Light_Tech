from rest_framework import serializers
from .models import User, Project, LabourAssignment, TimeCard

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email', 'role', 'phone', 'first_name', 'last_name')

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user

class ProjectSerializer(serializers.ModelSerializer):
    team_leader_name = serializers.CharField(source='team_leader.get_full_name', read_only=True)

    class Meta:
        model = Project
        fields = '__all__'

class LabourAssignmentSerializer(serializers.ModelSerializer):
    labour_name = serializers.CharField(source='labour.get_full_name', read_only=True)
    project_name = serializers.CharField(source='project.name', read_only=True)

    class Meta:
        model = LabourAssignment
        fields = '__all__'

    def validate(self, data):
        # Check if assignment already exists
        if LabourAssignment.objects.filter(
            labour=data['labour'],
            project=data['project'],
            is_active=True
        ).exists():
            raise serializers.ValidationError("This labour is already assigned to this project")
        return data


class TimeCardSerializer(serializers.ModelSerializer):
    labour_name = serializers.CharField(source='labour.get_full_name', read_only=True)
    project_name = serializers.CharField(source='project.name', read_only=True)
    working_hours = serializers.FloatField(read_only=True)

    class Meta:
        model = TimeCard
        fields = '__all__'
