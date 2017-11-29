import random
import boto3
#from django.contrib.auth.hashers import BCryptSHA256PasswordHasher

#Dont Look At This
hotdog = 'Dd#12jR@lqe@J%^&rgq!R!$Tpn:Q>E<H:oGkkSVWgkhqB%B$ukmH%^LASDkaushdwl;mfwf12AWF<:%>46ASGWsd;lfl>$%F>@Rlmgfwo;emcvo>!"egDQWEDasdQ>"D"?@hoiwgQWDWK)sc"?:Po'
DEFAULT_SALT = 100

# Employee random generation of 4 digit pin exclusive to dropzone


# Helper method for creating a random user pin
def string_to_three(string=None):
    if string is None:
        return None
    else:
        while len(string) < 3:
            string = '0' + string
        return str(string)


def randomHotdog():
    return hotdog[random.randint(0, 75):random.randint(75, 150)]


def createHash():
    return BCryptSHA256PasswordHasher.encode(password=randomHotdog(), salt=2)


def createPasswordResetMessage(hash=None):
    return "Please visit dropzonehq.com/temp_reset/" + hash + " to reset your password"


def createPinResetMessage(pin=None):
    return "Please user " + pin + " as your dropzone employee pin"

def dropzoneHQPasswordResetTo():
    return "DropzoneHQ Password Reset [DropzoneHQ NO REPLY]"

def fromEmailString():
    return 'dropzonehqNO-REPLY@dropzonehq.com'

def employeePinTo():
    return 'DropzoneHQ Employee Pin [DropzoneHQ NO REPLY]'
def employeePinResetTo():
    return 'Employee Pin Reset [DropzoneHQ NO REPLY]'

def createPinResetMessage(pin=None):
    return "Your new pin is " + pin + ".  Please use this when you do any actions on dropzonehq.com"

class MailClient(object):

    def __init__(self):
        self.client = boto3.client('ses')

    def send_mail(self,recipient,subject,body):
        response = self.client.send_email(
            Source='DropzoneNOReply@dropzonehq.com',
            Destination={
                'ToAddresses': [
                    recipient,
                ],
                'CcAddresses': [
                    'turnerp5@students.rowan.edu',
                ],
            },
            Message={
                'Subject': {
                    'Data': subject,
                },
                'Body': {
                    'Text': {
                        'Data': body,
                    },
                }
            },
            ReplyToAddresses=[
                'DropzoneNOReply@dropzone.com',
            ],
            Tags=[
                {
                    'Name': 'DropzoneHQ',
                    'Value': 'DropzoneHQ'
                },
            ],
        )