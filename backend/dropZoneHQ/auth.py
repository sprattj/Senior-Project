#
from backend.datastore import util
from django.http import HttpResponse, HttpRequest
from backend.datastore.models import Dropzones, Employees
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User

class Auth:


    # authenticate a dropzone based on the name and password
    #return None if there is no dropzone there
    def authenticateDropzone(self, request):
        check = self.authenticatePasswordDropzone(self.authenticateNameDropzone(request.POST['username']), request.POST['password'])

        return (JsonResponse({'dropzone',check.name},status=400) if check is not None else JsonResponse(status=401))

    #Session authentication
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
            if util.checkSha(password, dropzone.password):
                return dropzone
            else :
                return None

    #takes user and pin and returns user if the pin is correct
    def authenticateEmployeePin(self, user=None, pin=None):
        if pin or user is None :
            return None
        else :
            if util.checksha(pin,user.pin) :
                return user
            else :
                return None

    def authenticateUserPin(self, request):
        #the way our pin works sets the user primary as their last 3 digits
        emp = self.authenticateEmployeePin(
            Employees.objects.get((request.POST['pin'] % 1000)),
                                           request.POST['pin'])
        if emp is not None :
            return JsonResponse(data=emp,status=200)
        return JsonResponse(status=400)

    def createDropzone(self, request):
        name = request.POST['name']
        password = request.POST['password']
        location = request.POST['location']
        email = request.POST['email']
        if Dropzones.dropzoneNameInUse(name=name) is not None:
            if Dropzones.dropzoneLocationInUse(location=location) is not None:
                if Dropzones.dropzoneEmailInUse(email=email) is not None:
                    dropzone = Dropzones(name=name, password=password, location=location, email=email)
                    dropzone.save()
                    return JsonResponse(status=201)
        return JsonResponse(status=400)

    def createEmployee(self, request, dropzonePK):
        first = request.POST['first_name']
        last = request.POST['last_name']
        email = request.POST['email']




