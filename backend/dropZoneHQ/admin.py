from django.contrib import admin
from backend.datastore.models import *


# Register your models here.

admin.site.register(AutomaticActivationDevices)
admin.site.register(Canopies)
admin.site.register(Claims)
admin.site.register(Containers)
admin.site.register(DjangoMigrations)
admin.site.register(EmployeeRoles)
admin.site.register(EmployeeRolesPermissions)
admin.site.register(Permissions)
admin.site.register(Employees)
admin.site.register(EmployeesEmployeeRoles)
admin.site.register(EmployeesRentals)
admin.site.register(EmployeesSignouts)
admin.site.register(ItemTypes)
admin.site.register(Items)
admin.site.register(ItemsRentals)
admin.site.register(Rentals)
admin.site.register(ReserveCanopies)
admin.site.register(Rigs)
admin.site.register(RigsAuditTrail)
admin.site.register(RigComponentDetails)
admin.site.register(Signouts)
admin.site.register(TempUrl)
admin.site.register(Dropzones)

