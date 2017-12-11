import random
import boto3
from backend.dropZoneHQ import settings
from hashlib import blake2b
from hmac import compare_digest

# Helper method for creating a random user pin
def string_to_three(string=None):
    if string is None:
        return None
    else:
        while len(string) < 3:
            string = '0' + string
        return string


def createPasswordResetMessage(hash=None):
    return "Please visit dropzonehq.com/temp_reset/" + hash + " to reset your password"


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


#sign a cookie
#in our case we will be doing this for the pin of employees
def sign(cookie, length):
    cookie_hash = blake2b(digest_size=length, key=settings.SECRET_KEY)
    cookie_hash.update(cookie)
    return cookie_hash.hexdigest()


#verify the hashed pin againt employee hashed pin
#used for testing
def verify_hashed(cookie_hash, cookie_hash2):
    return compare_digest(cookie_hash, cookie_hash2)


#verify that a cookie that is given matches the hashed cookie
def verify(cookie, cookie_hash, length):
    return compare_digest(sign(cookie, length), cookie_hash)


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