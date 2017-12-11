"""
# Author: Jonathan Spratt
# Author: Paul Turner - Dropzone and Employee
# Last modification: 11/7/2017
# This file contains the models representing the DropZoneHQ database
#
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = True` lines if you wish to allow Django to create, modify, and delete the table
#   * Don't rename db_table values or field names.
"""

from __future__ import unicode_literals
from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.hashers import BCryptSHA256PasswordHasher
from . import util
import random
from django.dispatch import receiver
from django.db.models.signals import post_save


# An item used on a rig that automatically deploys a parachute at a certain altitude
class AutomaticActivationDevices(models.Model):

    # item_id PK -> shares PK from items table
    item = models.OneToOneField('Items', on_delete=models.CASCADE, primary_key=True)
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
    item = models.OneToOneField('Items', on_delete=models.CASCADE, primary_key=True)
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


# Claims employees make and service
class Claims(models.Model):
    CRITICAL = 'CRITICAL'
    NON_CRITICAL = 'NON-CRITICAL'
    COSMETIC = 'COSMETIC'
    SEVERITY_CHOICES = ((CRITICAL, 'Critical'), (NON_CRITICAL, 'Non-critical'), (COSMETIC, 'Cosmetic'))
    PENDING = 'PENDING'
    IN_PROGRESS = 'IN-PROGRESS'
    COMPLETE = 'COMPLETE'
    DISMISSED = 'DISMISSED'
    STATUS_CHOICES = ((PENDING, 'Pending'), (IN_PROGRESS, 'In-Progress'),
                      (COMPLETE, 'Complete'), (DISMISSED, 'Dismissed'))

    # Autoincrement integer PK
    claim_id = models.AutoField(primary_key=True)
    #Rig that this claim is for
    rig_id = models.IntegerField()
    # How critical is this claim
    severity = models.CharField(max_length=12, choices=SEVERITY_CHOICES)
    # Status of the claim
    status = models.CharField(max_length=12, choices=STATUS_CHOICES)
    # Description of the problem that needs to be serviced.
    description = models.CharField(max_length=45, blank=True, null=True)
    submitter = models.OneToOneField('Employees', models.DO_NOTHING, related_name='employee_submitter')
    handler = models.OneToOneField('Employees', models.DO_NOTHING, related_name= 'employee_handler')
    
    # Date the claim was submitted
    submit_date = models.DateField(blank=True, null=True)
    # Date the claim is due
    due_date = models.DateField(blank=True, null=True)
    # Date the claim was completed
    complete_date = models.DateField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'claims'
        app_label = 'dropZoneHQ'


# An item that holds a canopy
class Containers(models.Model):

    # item_id PK -> shares PK from items table
    item = models.OneToOneField('Items', on_delete=models.CASCADE, primary_key=True)
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

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # Autoincrement integer PK
    dropzone_id = models.AutoField(primary_key=True)
    # The location of the drop zone
    location = models.CharField(unique=True, max_length=45)

    @receiver(post_save, sender=User)
    def create_user_profile(self, sender, instance, created, **kwargs):
        if created:
            Dropzones.objects.create(user=instance)

    @receiver(post_save, sender=User)
    def save_user_profile(self, sender, instance, **kwargs):
        #instance.dropzone.save()
        return None

    def get_dropzone(self, pk=None):
        try:
            return Dropzones.objects.get(pk)
        except:
            return None

    # Checks if a location is in use for a dropzone.
    def dropzoneLocationInUse(self, location=None):
        try:
            return Dropzones.objects.filter(location)
        except:
            return None

    # Checks if a name is in use for a dropzone.
    def dropzoneUsernameInUse(self, username=None):
        try:
            return Dropzones.objects.filter(username)
        except:
            return None

    # Chcek if the email has been used in the database
    def dropzoneEmailInUse(self, email=None):
        try:
            return Dropzones.objects.filter(email)
        except:
            return None

    class Meta:
        managed = True
        db_table = 'dropzones'
        app_label = 'dropZoneHQ'


# Roles of employees
class EmployeeRoles(models.Model):

    # Autoincrement integer PK
    role_id = models.AutoField(primary_key=True)
    role = models.CharField(max_length=45)

    def role_exsists(self, role):
        try:
            return Dropzones.objects.filter(role)
        except:
            return None

    class Meta:
        managed = True
        db_table = 'employee_roles'
        app_label = 'dropZoneHQ'


class EmployeeRolesPermissions(models.Model):
    employeeRole = models.ForeignKey(EmployeeRoles, on_delete=models.DO_NOTHING)
    permission = models.ForeignKey('permissions', on_delete=models.DO_NOTHING)

    class Meta:
        managed = True
        db_table = 'EmployeeRolesPermissions'
        unique_together = (('employeeRole', 'permission'),)
        app_label = 'dropZoneHQ'


class Permissions(models.Model):
    permission = models.CharField(max_length=45)

    auth_level_choice = (
        ('Packer', '0'),
        ('Instructor', '1'),
        ('Rigger', '2'),
        ('Admin', '3')
    )
    auth_level = models.IntegerField(choices=auth_level_choice, name='auth_level')

    def get_auth_level(self):
        return getattr(self, name='auth_level')

    class Meta:
        managed = True
        db_table = 'permissions'
        app_label = 'dropZoneHQ'


# Employees the work at the drop zone
class Employees(models.Model):
    first_name = models.CharField(max_length=45)
    last_name = models.CharField(max_length=45)
    email = models.EmailField()
    # PK
    employee_id = models.AutoField(primary_key=True)
    # FK -> dropzone_id
    dropzone_id = models.ForeignKey('Dropzones', models.DO_NOTHING, name='dropzone')
    is_active = models.BooleanField(max_length=4)
    roles = models.ManyToManyField('EmployeeRoles', through='EmployeesEmployeeRoles')
    # pin Sha hash
    pin = models.CharField(max_length=45, blank=True, unique=True)
    employment_date = models.DateTimeField(auto_now_add=True)


    # check is the pin of an employee matches the pin given
    @staticmethod
    def check_employee_pin(pin, employee):
        return util.verify(cookie=pin, cookie_hash=employee.pin, length=8)

    #given a hashed pin check if the employee has a role
    @staticmethod
    def check_employee_role_based_pin(pin, role):
        return Employees.check_employee_role(Employees.objects.filter(pin=pin).first(), role)

    # given a pin that is not hashed check if the employee has a role
    @staticmethod
    def check_employee_role_based_pin_hash(pin, role):
        return Employees.check_employee_role_based_pin(Employees.pin_to_hash(pin), role)

    #for a specific employee check if the role matches their role
    @staticmethod
    def check_employee_role(employee, role):
        eroles = list(employee.roles_set.all())
        for trole in eroles:
            if trole.role == role:
                return True
        return False

    # hash a pin to a value
    @staticmethod
    def pin_to_hash(pin):
        return util.sign(cookie=pin, length=8)

    # Create a random user pin with the salt # being the first three digits and the last 3 being the users primary key
    @staticmethod
    def create_random_user_pin(user_pk=None):
        if user_pk is None:
            return None
        else:
            do_over = True
            while do_over:
                salt = util.string_to_three(str(random.randint(0, 1000)))
                key = util.string_to_three(salt) + str((int(user_pk) % 1000))
                find_me = Employees.objects.filter(pin=key)
                find_me_hash = Employees.objects.filter(pin=Employees.pin_to_hash(key))
                if find_me or find_me_hash is not None:
                    do_over = True
                else:
                    do_over = False
            return key

    # Checks if a pin is in use for an Employee.
    # returns true if the pin is in use and false if the pin is not being used
    @staticmethod
    def employee_pin_in_use(pin=None):
        emp = Employees.objects.filter(pin)
        return emp

    # Chcek if the email has been used in the database
    @staticmethod
    def employee_email_in_use(email):
        emp = Employees.objects.filter(email=email)
        return emp

    class Meta:
        managed = True
        db_table = 'employees'
        app_label = 'dropZoneHQ'


# Bridge between Employees and Roles. Many employees can perform many roles.
class EmployeesEmployeeRoles(models.Model):
    employee = models.ForeignKey(Employees, models.DO_NOTHING)
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


# Bridge between Employees and Signouts. Many employees can sign off on many signouts.
class EmployeesSignouts(models.Model):
    PACKED = 'PACKED'
    SIGNOUT = 'SIGNOUT'
    PACKED_SIGNOUT_CHOICES = (
        (PACKED, 'packed'),
        (SIGNOUT, 'signout')
    )
    employee = models.ForeignKey('Employees', models.DO_NOTHING)
    signout = models.ForeignKey('Signouts', models.DO_NOTHING)
    # What type of sign off occurred
    packed_signout = models.CharField(db_column='packed_or_signout',
                                      max_length=7,
                                      choices=PACKED_SIGNOUT_CHOICES)
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
    # is_rentable = models.CharField(max_length=4)
    is_rentable = models.BooleanField(max_length=4)
    is_on_rig = models.BooleanField(max_length=4)
    is_available = models.BooleanField(max_length=4)
    rentals = models.ManyToManyField('Rentals', through='ItemsRentals')

    class Meta:
        managed = True
        db_table = 'items'
        app_label = 'dropZoneHQ'


# Bridge between Items and Rentals. Many items can be rented many times.
class ItemsRentals(models.Model):
    item = models.ForeignKey('Items', models.DO_NOTHING)
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

    item = models.ManyToManyField('Items', through='ItemsRentals', related_name='item_rental')
    employee = models.ManyToManyField('Employees', through='EmployeesRentals')

    class Meta:
        managed = True
        db_table = 'rentals'
        app_label = 'dropZoneHQ'


# A subclass of items and canopies.
class ReserveCanopies(models.Model):
    # item_id PK -> Shares PK from canopies
    item = models.OneToOneField(Canopies, on_delete=models.CASCADE, primary_key=True)

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
    item = models.OneToOneField(Items, on_delete=models.CASCADE)
    # Unique identifier for this rig
    rig_id = models.AutoField(auto_created=True, unique=True, primary_key=True)
    container = models.OneToOneField(Containers, models.DO_NOTHING)
    aad = models.OneToOneField(AutomaticActivationDevices, models.DO_NOTHING)
    # Whether or not this ris is built for a tandem jump
    istandem = models.CharField(db_column='isTandem', max_length=4)
    # isrentable = models.BooleanField('Items')

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
    # description = models.CharField(max_length=45, blank=True, null=True)

    # Date that a rig was modified.
    date_of_change = models.DateTimeField()

    class Meta:
        managed = True
        db_table = 'rigs_audit_trail'
        app_label = 'dropZoneHQ'


class RigComponentDetails(models.Model):
    rig_id = models.IntegerField(primary_key=True)
    main_canopy_size = models.CharField(max_length=45)
    main_canopy_brand = models.CharField(max_length=45)
    reserve_canopy_size = models.CharField(max_length=45)
    reserve_canopy_brand = models.CharField(max_length=45)
    container_brand = models.CharField(max_length=45)
    aad_lifespan = models.CharField(max_length=45)

    class Meta:
        managed = False
        db_table = 'rig_component_details'
        app_label = 'dropZoneHQ'


# Signouts are where packers mark a rig as ready to go and instructors sign the gear out for use.
class Signouts(models.Model):
    # Autoincrement integer PK
    signout_id = models.AutoField(primary_key=True)
    # What plane load a rig will be signed out to.
    load_number = models.IntegerField()
    # What rig has been packed or signed out for use.
    rig = models.ForeignKey(Rigs, models.DO_NOTHING)

    employees = models.ManyToManyField('Employees', through='EmployeesSignouts')

    class Meta:
        app_label = 'dropZoneHQ'
        managed = True
        db_table = 'signouts'


class TempUrl(models.Model):
    url_hash = models.CharField(name="Url", blank=False, max_length=45, unique=True, primary_key=True)
    dropzone = models.ForeignKey(Dropzones, name='dropzone')
    expires = models.DateTimeField(name="Expries")

    def get_url_hash(self):
        return self.url_hash

    class Meta:
        app_label = 'dropZoneHQ'
        managed = True
        db_table = 'tempurl'


# Descriptive view for all canopies in the inventory
class AllCanopies(models.Model):
    item_id = models.IntegerField(primary_key=True)
    type = models.CharField(max_length=45)
    serial_number = models.CharField(max_length=45)
    rig = models.ForeignKey(Rigs, models.DO_NOTHING)
    is_rentable = models.BooleanField(max_length=4)
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
        managed = False
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
    deployment_timestamp = models.DateTimeField()
    aad_sn = models.CharField(max_length=45)
    lifespan = models.CharField(max_length=45)
    is_rentable = models.BooleanField(max_length=4)
    is_on_rig = models.BooleanField(max_length=4)
    is_available = models.BooleanField(max_length=4)
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
        managed = False
        db_table = 'all_items'


# View for employees and how they interacted with a rig regarding signouts
class EmployeesVsSignouts(models.Model):
    signout_id = models.AutoField(primary_key=True)
    jumpmaster = models.CharField(max_length=90)
    jumpmaster_id = models.IntegerField()
    load_number = models.IntegerField()
    rig_id = models.IntegerField()
    packed_by = models.CharField(max_length=90, blank=True, null=True)
    packer_id = models.IntegerField()

    class Meta:
        app_label = 'dropZoneHQ'
        managed = False
        db_table = 'all_employees_vs_signouts'


class EmployeesVsSignoutsStudent(models.Model):
    signout_id = models.AutoField(primary_key=True)
    jumpmaster = models.CharField(max_length=90)
    jumpmaster_id = models.IntegerField()
    load_number = models.IntegerField()
    rig_id = models.IntegerField()
    packed_by = models.CharField(max_length=90, blank=True, null=True)
    packer_id = models.IntegerField()

    class Meta:
        app_label = 'dropZoneHQ'
        managed = False
        db_table = 'employees_vs_signouts_student'


class EmployeesVsSignoutsTandem(models.Model):
    signout_id = models.AutoField(primary_key=True)
    jumpmaster = models.CharField(max_length=90)
    jumpmaster_id = models.IntegerField()
    load_number = models.IntegerField()
    rig_id = models.IntegerField()
    packed_by = models.CharField(max_length=90, blank=True, null=True)
    packer_id = models.IntegerField()

    class Meta:
        app_label = 'dropZoneHQ'
        managed = False
        db_table = 'employees_vs_signouts_tandem'
