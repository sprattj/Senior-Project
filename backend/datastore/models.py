"""
# Author: Jonathan Spratt
# Last modification: 10/8/2017
# This file contains the models representing the DropZoneHQ database
#
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = True` lines if you wish to allow Django to create, modify, and delete the table
#   * Don't rename db_table values or field names.
"""

from __future__ import unicode_literals
from django.db import models


# Actions that can be performed by employees
class Actions(models.Model):

    # Autoincrement integer PK
    action_id = models.AutoField(primary_key=True)
    # Type of action being performed
    type = models.CharField(max_length=45)

    class Meta:
        # Whether or not dropZoneHQ can create, modify, or delete this table
        managed = True
        # Name of table in DB
        db_table = 'actions'
        app_label = 'dropZoneHQ'


# An item used on a rig that automatically deploys a parachute at a certain altitude
class AutomaticActivationDevices(models.Model):

    # item_id PK -> shares PK from items table
    item = models.OneToOneField('Items', models.DO_NOTHING, primary_key=True)
    # Date when this AAD was deployed
    deployment_timestamp = models.DateTimeField()
    # Serial number may include digits and letters
    serial_number = models.CharField(max_length=45)
    # Amount of time this AAD can be deployed
    lifespan = models.CharField(max_length=45)

    class Meta:
        managed = True
        db_table = 'automatic_activation_devices'
        app_label = 'dropZoneHQ'


# An item that is classified as a canopy for a skydiving rig
class Canopies(models.Model):

    # FOREIGN KEYS
    # item_id PK -> Shares PK from items table
    item = models.OneToOneField('Items', models.DO_NOTHING, primary_key=True)
    # rig_id -> what rig this canopy is installed on
    rig = models.ForeignKey('Rigs', models.DO_NOTHING, null=True)

    # OTHER COLUMNS
    serial_number = models.CharField(max_length=45, blank=True, null=True)
    size = models.CharField(max_length=45, blank=True, null=True)
    date_of_manufacture = models.DateTimeField(blank=True, null=True)
    jump_count = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'canopies'
        app_label = 'dropZoneHQ'


# An item that holds a canopy
class Containers(models.Model):

    # item_id PK -> shares PK from items table
    item = models.OneToOneField('Items', models.DO_NOTHING, primary_key=True)
    serial_number = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'containers'
        app_label = 'dropZoneHQ'


class DjangoMigrations(models.Model):
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = True
        db_table = 'django_migrations'
        app_label = 'dropZoneHQ'


# A location that is used as a skydiving drop zone.
class Dropzones(models.Model):

    # Autoincrement integer PK
    dropzone_id = models.AutoField(primary_key=True)
    # Name of drop zone
    name = models.CharField(unique=True, max_length=45)
    # Drop zone logon password
    password = models.CharField(max_length=45)
    # The location of the drop zone
    location = models.CharField(max_length=45)

    class Meta:
        managed = True
        db_table = 'dropzones'
        app_label = 'dropZoneHQ'


# Roles of employees
class EmployeeRoles(models.Model):

    # Autoincrement integer PK
    role_id = models.AutoField(primary_key=True)
    role = models.CharField(max_length=45)

    class Meta:
        managed = True
        db_table = 'employee_roles'
        app_label = 'dropZoneHQ'

# Employees the work at the drop zone
class Employees(models.Model):

    # PK
    employee_id = models.IntegerField(primary_key=True)
    # FK -> dropzone_id
    dropzone = models.ForeignKey(Dropzones, models.DO_NOTHING)
    first_name = models.CharField(max_length=45)
    last_name = models.CharField(max_length=45)
    pin = models.IntegerField()
    employment_date = models.DateTimeField()

    class Meta:
        managed = True
        db_table = 'employees'
        app_label = 'dropZoneHQ'


# Bridge between Employees and Actions. Many employees can perform many actions.
class EmployeesActions(models.Model):
    employee = models.OneToOneField(Employees, models.DO_NOTHING, primary_key=True)
    action = models.ForeignKey(Actions, models.DO_NOTHING)
    # Timestamp for when this action was performed
    timestamp = models.DateTimeField()

    class Meta:
        managed = True
        db_table = 'employees_actions'
        unique_together = (('employee', 'action'),)
        app_label = 'dropZoneHQ'


# Bridge between Employees and Roles. Many employees can perform many roles.
class EmployeesEmployeeRoles(models.Model):
    employee = models.OneToOneField(Employees, models.DO_NOTHING, primary_key=True)
    role = models.ForeignKey(EmployeeRoles, models.DO_NOTHING)

    class Meta:
        managed = True
        db_table = 'employees_employee_roles'
        unique_together = (('employee', 'role'),)
        app_label = 'dropZoneHQ'


# Bridge between Employees and Rentals. Many employees can authorize many rentals.
class EmployeesRentals(models.Model):
    employee = models.OneToOneField(Employees, models.DO_NOTHING, primary_key=True)
    rental = models.ForeignKey('Rentals', models.DO_NOTHING)

    class Meta:
        managed = True
        db_table = 'employees_rentals'
        unique_together = (('employee', 'rental'),)
        app_label = 'dropZoneHQ'


# Bridge between Employees and Services. Many employees can perform many services.
class EmployeesServices(models.Model):
    employee = models.OneToOneField(Employees, models.DO_NOTHING, primary_key=True)
    service = models.ForeignKey('Services', models.DO_NOTHING)
    # What type of service was performed
    action = models.ForeignKey(Actions, models.DO_NOTHING)
    # Timestamp of when this service was performed
    timestamp = models.DateTimeField()

    class Meta:
        managed = True
        db_table = 'employees_services'
        unique_together = (('employee', 'service'),)
        app_label = 'dropZoneHQ'

# Bridge between Employees and Signouts. Many employees can sign off on many signouts.
class EmployeesSignouts(models.Model):
    employee = models.OneToOneField(Employees, models.DO_NOTHING, primary_key=True)
    signout = models.ForeignKey('Signouts', models.DO_NOTHING)
    # What type of sign off occurred
    packed_signout = models.CharField(db_column='packed_or_signout', max_length=7)
    # When this sign off occurred
    timestamp = models.DateTimeField()

    class Meta:
        managed = True
        db_table = 'employees_signouts'
        unique_together = (('employee', 'signout'),)
        app_label = 'dropZoneHQ'


# Types of items
class ItemTypes(models.Model):

    # Autoincrement integer PK
    item_type_id = models.AutoField(primary_key=True)
    type = models.CharField(unique=True, max_length=45, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'item_types'
        app_label = 'dropZoneHQ'


# Items that will be interacted with by employees at the drop zone.
class Items(models.Model):

    # PK -> used in multiple subclasses of items
    item_id = models.AutoField(primary_key=True)
    # FK -> what type of item this is
    item_type = models.ForeignKey(ItemTypes, models.DO_NOTHING)

    manufacturer = models.CharField(max_length=45, blank=True, null=True)
    brand = models.CharField(max_length=45, blank=True, null=True)
    description = models.CharField(max_length=45, blank=True, null=True)
    # Whether or not this item is rentable
    is_rentable = models.CharField(max_length=4)

    class Meta:
        managed = True
        db_table = 'items'
        app_label = 'dropZoneHQ'


# Bridge between Items and Rentals. Many items can be rented many times.
class ItemsRentals(models.Model):
    item = models.OneToOneField(Items, models.DO_NOTHING, primary_key=True)
    rental = models.ForeignKey('Rentals', models.DO_NOTHING)

    class Meta:
        managed = True
        db_table = 'items_rentals'
        unique_together = (('item', 'rental'),)
        app_label = 'dropZoneHQ'


# Gear rentals from the drop zone
class Rentals(models.Model):

    # Autoincrement integer PK
    rental_id = models.AutoField(primary_key=True)
    renter_name = models.CharField(max_length=45)
    # Date of when the gear was rented.
    rental_date = models.DateTimeField()
    # Date the gear was returned to the drop zone.
    returned_date = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'rentals'
        app_label = 'dropZoneHQ'


# A subclass of items and canopies.
class ReserveCanopies(models.Model):
    # item_id PK -> Shares PK from canopies
    item = models.OneToOneField(Canopies, models.DO_NOTHING, primary_key=True)

    last_repack_date = models.DateTimeField()
    next_repack_date = models.DateTimeField()
    # What employee packed this reserve last
    packed_by_employee = models.ForeignKey(Employees, models.DO_NOTHING)
    # How many time this reserve has jumped without being deployed.
    ride_count = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'reserve_canopies'
        app_label = 'dropZoneHQ'


# An item that is comprised of the key components used for a skydiving outfit.(AKA a rig)
class Rigs(models.Model):

    # PK -> Shares PK from items table
    item = models.OneToOneField(Items, models.DO_NOTHING, primary_key=True)
    # Unique identifier for this rig
    rig_id = models.AutoField(unique=True, unique=True)
    container = models.OneToOneField(Containers, models.DO_NOTHING)
    aad = models.OneToOneField(AutomaticActivationDevices, models.DO_NOTHING)
    # Whether or not this ris is built for a tandem jump
    istandem = models.CharField(db_column='isTandem', max_length=4)

    class Meta:
        managed = True
        db_table = 'rigs'
        app_label = 'dropZoneHQ'


# A record of changes made to rigs. Inserted into after update to Rigs
class RigsAuditTrail(models.Model):

    # Autoincrement integer PK
    rig_audit_id = models.AutoField(primary_key=True)

    # Information populated from rigs table
    item_id = models.IntegerField()
    rig_id = models.IntegerField()
    container_id = models.IntegerField()
    aad_id = models.IntegerField()
    description = models.CharField(max_length=45, blank=True, null=True)

    # Date that a rig was modified.
    date_of_change = models.DateTimeField()

    class Meta:
        managed = True
        db_table = 'rigs_audit_trail'
        app_label = 'dropZoneHQ'


# Services that employees need to perform
class Services(models.Model):

    # Autoincrement integer PK
    service_id = models.AutoField(primary_key=True)
    # How critical is this service
    severity = models.CharField(max_length=12)
    # What thype of service is being performed.
    service_type = models.CharField(max_length=11)
    # Description of the problem that needs to be serviced.
    description = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'services'
        app_label = 'dropZoneHQ'


# Signouts are where packers mark a rig as ready to go and instructors sign the gear out for use.
class Signouts(models.Model):
    # Autoincrement integer PK
    signout_id = models.AutoField(primary_key=True)
    # What plane load a rig will be signed out to.
    load_number = models.IntegerField()
    # What rig has been packed or signed out for use.
    rig = models.ForeignKey(Rigs, models.DO_NOTHING)

    class Meta:
        app_label = 'dropZoneHQ'
        managed = True
        db_table = 'signouts'


# Descriptive view for all canopies in the inventory
class AllCanopies(models.Model):
    item_id = models.IntegerField(primary_key=True)
    type = models.CharField(max_length=45)
    serial_number = models.CharField(max_length=45)
    rig = models.ForeignKey(Rigs, models.DO_NOTHING)
    is_rentable = models.CharField(max_length=45)
    manufacturer = models.CharField(max_length=45)
    brand = models.CharField(max_length=45)
    description = models.CharField(max_length=45)
    date_of_manufacture = models.DateTimeField()
    size = models.CharField(max_length=45)
    last_repack_date = models.DateTimeField()
    next_repack_date = models.DateTimeField()
    jump_count = models.IntegerField()
    ride_count = models.IntegerField()

    class Meta:
        app_label = 'dropZoneHQ'
        managed = True
        db_table = 'all_canopies'


# Descriptive view for all items with all attributes in database
class AllItems(models.Model):
    item_id = models.IntegerField(primary_key=True)
    item_type = models.CharField(max_length=45)
    rig_number = models.IntegerField()
    aad = models.IntegerField()
    container = models.IntegerField()
    isTandem = models.CharField(max_length=45)
    canopy_on_rig = models.IntegerField()
    canopy_sn = models.CharField(max_length=45)
    container_sn = models.CharField(max_length=45)
    aad_sn = models.CharField(max_length=45)
    lifespan = models.CharField(max_length=45)
    is_rentable = models.CharField(max_length=45)
    manufacturer = models.CharField(max_length=45)
    brand = models.CharField(max_length=45)
    description = models.CharField(max_length=45)
    date_of_manufacture = models.DateTimeField()
    size = models.CharField(max_length=45)
    next_repack_date = models.DateTimeField()
    jump_count = models.IntegerField()
    ride_count = models.IntegerField()
    packed_by_employee_id = models.IntegerField()

    class Meta:
        app_label = 'dropZoneHQ'
        managed = True
        db_table = 'all_items'


# View for employees and how they interacted with a rig regarding signouts
class EmployeesVsSignouts(models.Model):
    signout_id = models.AutoField(primary_key=True)
    jumpmaster = models.CharField(max_length=90)
    load_number = models.IntegerField()
    rig_id = models.IntegerField()
    packed_by = models.CharField(max_length=90)

    class Meta:
        app_label = 'dropZoneHQ'
        managed = True
        db_table = 'all_employees_vs_signouts'


class EmployeesVsSignoutsStudent(models.Model):
    signout_id = models.AutoField(primary_key=True)
    jumpmaster = models.CharField(max_length=90)
    load_number = models.IntegerField()
    rig_id = models.IntegerField()
    packed_by = models.CharField(max_length=90)

    class Meta:
        app_label = 'dropZoneHQ'
        managed = True
        db_table = 'employees_vs_signouts_student'


class EmployeesVsSignoutsTandem(models.Model):
    signout_id = models.AutoField(primary_key=True)
    jumpmaster = models.CharField(max_length=90)
    load_number = models.IntegerField()
    rig_id = models.IntegerField()
    packed_by = models.CharField(max_length=90)

    class Meta:
        app_label = 'dropZoneHQ'
        managed = True
        db_table = 'employees_vs_signouts_tandem'
