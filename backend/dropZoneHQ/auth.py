#
from Crypto.Hash import SHA256
from backend.datastore.models import Dropzones
from django.http import HttpResponse

class Auth:

    #Employee random generation of 4 digit pin exclusive to dropzone
    def randomUserPin(self,):

    # authenticate a dropzone based on the
    def authenticateDropzone(self, request, name=None, password=None):
        check = self.authenticatePasswordDropzone(self.authenticateNameDropzone(name), password)
        return (check if check is not None else HttpResponse(status=402))
    #
    def authenticateDropzone(self, request, token=None):

    #
    def authenticateUserPin(self,request, pin=None):

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