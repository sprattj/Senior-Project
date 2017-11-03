#
from Crypto.Hash import SHA256
from Crypto import Random
from backend.datastore.models import Dropzones
from django.http import HttpResponse, HttpRequest
from django.shortcuts import get_object_or_404

class Auth:


    # authenticate a dropzone based on the name and password
    #return None if there is no dropzone there
    def authenticateDropzone(self, request, name=None, password=None):
        check = self.authenticatePasswordDropzone(self.authenticateNameDropzone(name), password)
        return (check if check is not None else HttpResponse(status=401))
    #
    def authenticateDropzone(self, request, token=None):
        return False

    #return a user object if the username is found
    #else return None
    def authenticateNameDropzone(self, name = None):
        if name is None :
            return None
        else:
            dropzone_query = Dropzones.objects.all()
            for dropzonei in dropzone_query :
                if name == dropzonei.name :
                    return dropzonei
            return None

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