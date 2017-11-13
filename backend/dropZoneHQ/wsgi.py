"""
WSGI config for DropZoneHQ project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.11/howto/deployment/wsgi/
"""

import os
#uncomment this before deploying to elastic beanstalk
#import sys
#sys.path.insert(0, '/opt/python/current/app')

from django.core.wsgi import get_wsgi_application

#change to just dropZoneHQ.settings.py when deploying
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.dropZoneHQ.settings.py")
application = get_wsgi_application()
