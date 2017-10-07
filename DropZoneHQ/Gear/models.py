# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from __future__ import unicode_literals

from django.db import models


class Actions(models.Model):
    action_id = models.AutoField(primary_key=True)
    type = models.CharField(max_length=45)

    class Meta:
        managed = False
        db_table = 'actions'


class AutomaticActivationDevices(models.Model):
    item = models.ForeignKey('Items', models.DO_NOTHING, primary_key=True)
    deployment_timestamp = models.DateTimeField()
    serial_number = models.CharField(max_length=45)
    lifespan = models.CharField(max_length=45)

    class Meta:
        managed = False
        db_table = 'automatic_activation_devices'


class Canopies(models.Model):
    item = models.ForeignKey('Items', models.DO_NOTHING, primary_key=True)
    rig = models.ForeignKey('Rigs', models.DO_NOTHING)
    serial_number = models.CharField(max_length=45, blank=True, null=True)
    size = models.CharField(max_length=45, blank=True, null=True)
    date_of_manufacture = models.DateTimeField(blank=True, null=True)
    jump_count = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'canopies'


class Containers(models.Model):
    item = models.ForeignKey('Items', models.DO_NOTHING, primary_key=True)
    serial_number = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'containers'


class DjangoMigrations(models.Model):
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class Dropzones(models.Model):
    dropzone_id = models.AutoField(primary_key=True)
    name = models.CharField(unique=True, max_length=45)
    password = models.CharField(max_length=45)
    location = models.CharField(max_length=45)

    class Meta:
        managed = False
        db_table = 'dropzones'


class EmployeeRoles(models.Model):
    role_id = models.AutoField(primary_key=True)
    role = models.CharField(max_length=45)

    class Meta:
        managed = False
        db_table = 'employee_roles'


class Employees(models.Model):
    employee_id = models.IntegerField(primary_key=True)
    dropzone = models.ForeignKey(Dropzones, models.DO_NOTHING)
    first_name = models.CharField(max_length=45)
    last_name = models.CharField(max_length=45)
    pin = models.IntegerField()
    employment_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'employees'


class EmployeesActions(models.Model):
    employee = models.ForeignKey(Employees, models.DO_NOTHING, primary_key=True)
    action = models.ForeignKey(Actions, models.DO_NOTHING)
    timestamp = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'employees_actions'
        unique_together = (('employee', 'action'),)


class EmployeesEmployeeRoles(models.Model):
    employee = models.ForeignKey(Employees, models.DO_NOTHING, primary_key=True)
    role = models.ForeignKey(EmployeeRoles, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'employees_employee_roles'
        unique_together = (('employee', 'role'),)


class EmployeesRentals(models.Model):
    employee = models.ForeignKey(Employees, models.DO_NOTHING, primary_key=True)
    rental = models.ForeignKey('Rentals', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'employees_rentals'
        unique_together = (('employee', 'rental'),)


class EmployeesServices(models.Model):
    employee = models.ForeignKey(Employees, models.DO_NOTHING, primary_key=True)
    service = models.ForeignKey('Services', models.DO_NOTHING)
    action = models.ForeignKey(Actions, models.DO_NOTHING)
    timestamp = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'employees_services'
        unique_together = (('employee', 'service'),)


class EmployeesSignouts(models.Model):
    employee = models.ForeignKey(Employees, models.DO_NOTHING, primary_key=True)
    signout = models.ForeignKey('Signouts', models.DO_NOTHING)
    packed_signout = models.CharField(db_column='packed/signout', max_length=7)
    timestamp = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'employees_signouts'
        unique_together = (('employee', 'signout'),)


class ItemTypes(models.Model):
    item_type_id = models.AutoField(primary_key=True)
    type = models.CharField(unique=True, max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'item_types'


class Items(models.Model):
    item_id = models.AutoField(primary_key=True)
    item_type = models.ForeignKey(ItemTypes, models.DO_NOTHING)
    manufacturer = models.CharField(max_length=45, blank=True, null=True)
    brand = models.CharField(max_length=45, blank=True, null=True)
    description = models.CharField(max_length=45, blank=True, null=True)
    is_rentable = models.CharField(max_length=1)

    class Meta:
        managed = False
        db_table = 'items'


class ItemsRentals(models.Model):
    item = models.ForeignKey(Items, models.DO_NOTHING, primary_key=True)
    rental = models.ForeignKey('Rentals', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'items_rentals'
        unique_together = (('item', 'rental'),)


class Rentals(models.Model):
    rental_id = models.AutoField(primary_key=True)
    renter_name = models.CharField(max_length=45)
    rental_date = models.DateTimeField()
    returned_date = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'rentals'


class ReserveCanopies(models.Model):
    item = models.ForeignKey(Canopies, models.DO_NOTHING, primary_key=True)
    last_repack_date = models.DateTimeField()
    next_repack_date = models.DateTimeField()
    packed_by_employee = models.ForeignKey(Employees, models.DO_NOTHING)
    ride_count = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'reserve_canopies'


class Rigs(models.Model):
    item = models.ForeignKey(Items, models.DO_NOTHING, primary_key=True)
    rig_id = models.AutoField(unique=True)
    container = models.ForeignKey(Containers, models.DO_NOTHING, unique=True)
    aad = models.ForeignKey(AutomaticActivationDevices, models.DO_NOTHING, unique=True)
    istandem = models.CharField(db_column='isTandem', max_length=1)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'rigs'


class RigsAuditTrail(models.Model):
    rig_audit_id = models.AutoField(primary_key=True)
    item_id = models.IntegerField()
    rig_id = models.IntegerField()
    container_id = models.IntegerField()
    aad_id = models.IntegerField()
    description = models.CharField(max_length=45, blank=True, null=True)
    date_of_change = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'rigs_audit_trail'


class Services(models.Model):
    service_id = models.AutoField(primary_key=True)
    severity = models.CharField(max_length=12)
    service_type = models.CharField(max_length=11)
    description = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'services'


class Signouts(models.Model):
    signout_id = models.AutoField(primary_key=True)
    load_number = models.IntegerField()
    rig = models.ForeignKey(Rigs, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'signouts'
