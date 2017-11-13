"""
# Author: Jonathan Spratt
# Last Modification: 11/7/17
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


class EmployeeEmployeeRoleSerializer(serializers.HyperlinkedModelSerializer):
    role = serializers.ReadOnlyField()

    class Meta:
        model = EmployeesEmployeeRoles
        fields = ('employee_id', 'role_id', 'role')


class EmployeeSerializer(serializers.HyperlinkedModelSerializer):
    roles = EmployeeEmployeeRoleSerializer(many=True, read_only=True)

    class Meta:
        model = Employees
        fields = ('employee_id', 'first_name', 'last_name','email')


class EmployeeVsSignoutSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = EmployeesVsSignouts
        fields = ('signout_id', 'jumpmaster', 'jumpmaster_id', 'load_number',
                  'rig_id', 'packed_by', 'packer_id')


class ItemRentalSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ItemsRentals
        fields = ('item_id', 'rental_id')


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
                  'rental_date', 'returned_date')


class ReserveCanopySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ReserveCanopies
        fields = ('item_id', 'last_repack_date', 'next_repack_date',
                  'packed_by_employee', 'ride_count')


class RigSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Rigs
        fields = ('item_id', 'rig_id', 'container_id', 'aad_id', 'istandem')


class RigAuditTrailSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = RigsAuditTrail
        fields = ('rig_audit_id', 'item_id', 'rig_id', 'container_id',
                  'aad_id', 'description', 'date_of_change')


class EmployeeRoleSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = EmployeeRoles
        fields = ('role_id', 'role')


class ServiceSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Services
        fields = ('service_id', 'severity', 'service_type', 'description')


class SignoutSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Signouts
        fields = ('signout_id', 'load_number', 'rig')
