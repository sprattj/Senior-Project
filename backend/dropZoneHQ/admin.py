from django.contrib import admin
import sys
sys.path.append('../')
from backend.datastore import models
# Register your models here.

admin.site.register(models.AutomaticActivationDevices)
admin.site.register(models.Canopies)
admin.site.register(models.Claims)
admin.site.register(models.Containers)
admin.site.register(models.DjangoMigrations)
admin.site.register(models.EmployeeRoles)
admin.site.register(models.EmployeeRolesPermissions)
admin.site.register(models.Permissions)
admin.site.register(models.Employees)
admin.site.register(models.EmployeesEmployeeRoles)
admin.site.register(models.EmployeesRentals)
admin.site.register(models.EmployeesSignouts)
admin.site.register(models.ItemTypes)
admin.site.register(models.Items)
admin.site.register(models.ItemsRentals)
admin.site.register(models.Rentals)
admin.site.register(models.ReserveCanopies)
admin.site.register(models.Rigs)
admin.site.register(models.RigsAuditTrail)
admin.site.register(models.RigComponentDetails)
admin.site.register(models.Signouts)
admin.site.register(models.TempUrl)
admin.site.register(models.Dropzones)

