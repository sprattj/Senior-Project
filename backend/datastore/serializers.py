"""
# Author: Jonathan Spratt
# Last Modification: 10/8/17
# Serializers for DB Models
"""

from rest_framework import serializers

from .models import *


class ActionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Actions
        fields = ('action_id', 'type')


class AADSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = AutomaticActivationDevices
        fields = ('item_id', 'deployment_timestamp', 'serial_number', 'lifespan')


class AllCanopySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = AllCanopies
        fields = ('item_id', 'type', 'serial_number', 'rig',
                  'is_rentable', 'manufacturer', 'brand',
                  'description', 'date_of_manufacture', 'size',
                  'last_repack_date', 'next_repack_date', 'jump_count',
                  'ride_count')


class AllItemSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = AllItems
        fields = ('item_id', 'item_type', 'rig_number', 'aad'
                  'conatainer', 'isTandem', 'canopy_on_rig', 'canopy_sn',
                  'container_sn', 'aad_sn', 'lifespan', 'is_rentable',
                  'manufacturer', 'brand', 'description', 'date_of_manufacture',
                  'size', 'next_repack_date', 'jump_count', 'ride_count',
                  'packed_by_employee_id')


class CanopySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Canopies
        fields = ('item_id', 'rig_id', 'serial_number', 'size',
                  'dadte_of_manufacture', 'jump_count')


class ContainerSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Containers
        fields = ('item_id', 'serial_number')


class DropZoneSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Dropzones
        fields = ('dropzone_id', 'name', 'location')


class EmployeeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Employees
        fields = ('employee_id', 'first_name', 'last_name')


class EmployeeVsSignoutSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = EmployeesVsSignouts
        fields = ('signout_id', 'jumpmaster', 'load_number',
                  'rig_id', 'packed_by')


class ItemSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Items
        fields = ('item_id', 'item_type_id', 'manufacturer',
                  'brand', 'description', 'is_rentable')


class ItemTypeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ItemTypes
        fields = ('item_type_id', 'type')


class RentalSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Rentals
        fields = ('rental_id', 'renter_name',
                  'reantal_date', 'returned_date')


class ReserveCanopySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ReserveCanopies
        fields = ('item_id', 'last_repack_date', 'next_repack_date',
                  'packed_by_employee', 'ride_count')


class RigSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Rigs
        fields = ('item_id', 'rig_id', 'container_id', 'aad_id', 'istandem')


class RigAuditTrail(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = RigsAuditTrail
        fields = ('rig_audit_id', 'item_id', 'rig_id', 'container_id',
                  'aad_id', 'description', 'date_of_change')


class ServiceSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Services
        fields = ('service_id', 'severity', 'service_type', 'description')


class SignoutSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Signouts
        fields = ('signout_id', 'load_number', 'rig')


''' 
EQUIVALENT TO A HYPERLINKM0DELSERIALIZER
class RigSerializer(serializers.Serializer):
    item_id = serializers.IntegerField(read_only=True)
    rig_id = serializers.IntegerField(read_only=True)
    container_id = serializers.IntegerField(read_only=True)
    aad_id = serializers.IntegerField(read_only=True)
    isTandem = serializers.CharField(read_only=True)
    """ ^ Matching istandem in models -> Should this be a BooleanField?"""

    def create(self, validated_data):
        """Create and return a new `Rig` instance, given the validated data"""
        return Rigs.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """Update and return an existing rig, given the validated data"""
        instance.rig_id = validated_data.get('rig_id', instance.rig_id)
        instance.container_id = validated_data.get('container_id', instance.container_id)
        instance.aad_id = validated_data.get('aad_id', instance.aad_id)
        instance.isTandem = validated_data.get('istandem', instance.isTandem)
'''