from Crypto import Random
from Crypto.Hash import SHA256
from django.contrib.auth.hashers import BCryptSHA256PasswordHasher

# Employee random generation of 4 digit pin exclusive to dropzone
def randomUserPin(self, userPK=None):
    if userPK is None:
        return None
    else:
        return self.stringToThree(str(Random.random.randint(0, 1000))) + str(userPK % 1000)


# Helper method for creating a random user pin
def stringToThree(self, string=None):
    if string is None:
        return None
    else:
        for x in (3 - len(string)):
            string = '0' + string
        return string

def checkSha(object = None, sha = None):
    if object or sha is None :
        return False
    else :
        if sha == SHA256.new(data= bytes(object)) :
            return True
        else :
            return False



