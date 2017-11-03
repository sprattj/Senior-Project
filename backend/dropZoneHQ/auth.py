#
from Crypto.Hash import SHA256
from Crypto import Random
from django.http import HttpResponse, HttpRequest
from backend.datastore.models import Dropzones, Employees
from django.http import JsonResponse
from django.shortcuts import get_object_or_404

class Auth:


    # authenticate a dropzone based on the name and password
    #return None if there is no dropzone there
    def authenticateDropzone(self, request):
        check = self.authenticatePasswordDropzone(self.authenticateNameDropzone(request.POST['username']), request.POST['password'])
        return (check if check is not None else JsonResponse(status=401))
    #
    def authenticateDropzone(self, request):
        token = request.session['sessionID']
        return False

    #return a user object if the username is found
    #else return None
    def authenticateNameDropzone(self, name = None):
        if name is None :
            return None
        else:
            dropzone_query = Dropzones.objects.get(name)
            return dropzone_query

    #return a dropzone if the Sha is correct
    #else return None
    def authenticatePasswordDropzone(self, dropzone = None, password = None):
        if dropzone is None or password is None :
            return None
        else :
            if dropzone.password == SHA256.new(data= bytes(password)):
                return dropzone
            else :
                return None

    #takes user and pin and returns user if the pin is correct
    def authenticateEmployeePin(self, user=None, pin=None):
        if pin or user is None :
            return None
        else :
            if SHA256.new(data=bytes(pin)) == user.pin :
                return user
            else :
                return None

    def authenticateUserPin(self, request):
        pin = SHA256.new(data = bytes(request.POST['pin']))
        emp = Employees.objects.all()
        for e in emp :
            if e.pin == pin :
                return JsonResponse(data=e,status=200)
        return JsonResponse(status=400)

    def createDropzone(self, request):
        name = request.POST['name']
        password = request.POST['password']
        location = request.POST['location']
        if self.dropzoneNameInUse(name) is not None:
            if self.dropzoneLocationInUse() is not None:
                dropzone = Dropzones(name=name, password=password, location=location)
                dropzone.save()
                return JsonResponse(status=201)
        return JsonResponse(status=400)

    # Checks if a location is in use for a dropzone.
    def dropzoneLocationInUse(self, location=None):
        use = Dropzones.objects.get(location)
        if use is not None:
            return use
        else:
            return None

    #Checks if a name is in use for a dropzone.
    def dropzoneNameInUse(self,name=None):
        use = Dropzones.objects.get(name)
        if use is not None :
            return use
        else :
            return None

    #Employee random generation of 4 digit pin exclusive to dropzone
    def randomUserPin(self, userPK = None):
        if userPK is None :
            return None
        else :
            return str(userPK % 1000) + self.stringToThree(str(Random.random.randint(0,1000)))

    #Helper method for creating a random user pin
    def stringToThree(self, string = None):
        if string is None :
            return None
        else :
            for x in (3 - len(string)) :
                string = '0' + string
            return string