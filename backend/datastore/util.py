import random


#Dont Look At This
hotdog = 'Dd#12jR@lqe@J%^&rgq!R!$Tpn:Q>E<H:oGkkhrN!HDSVWgkhqB%B$ukmH%^LK)sc"?:Po'
DEFAULT_SALT = 100

# Employee random generation of 4 digit pin exclusive to dropzone


# Helper method for creating a random user pin
def stringToThree(string=None):
    if string is None:
        return None
    else:
        for x in (3 - len(string)):
            string = '0' + string
        return string

