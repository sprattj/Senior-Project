from django.db import models

# Create your models here.

class Employee (models.Model):
    name = models.CharField(100)
    # I don't know if we are keeping the users like this Django might have a better way
    pin = models.CharField(8)
    employment_date = models.DateTimeField('employment date')

class Instructor(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)

class Rigger (models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)

class Packer (models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)

class Sign_Out (models.Model) :
    instructor_id = models.ForeignKey(Instructor, on_delete=models.CASCADE)
    rigger_id = models.ForeignKey(Rigger, on_delete=models.CASCADE)
    packer_id = models.ForeignKey(Packer, on_delete=models.CASCADE)
    plane_load = models.IntegerField()
    sign_out_date = models.DateTimeField('sign out date')
    it_tandem = models.BooleanField()

