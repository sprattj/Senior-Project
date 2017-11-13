from django.test import TestCase
import sys
import django
django.setup()
sys.path.append('../')
from backend.datastore.views import *
from backend.datastore.models import *
import requests


class RigsTestCase(TestCase):

    def test_rigs_get(self):
        self.assertEqual(requests.get('127.0.0.1:8000/rigsheets/3'), HttpResponse(status=200))
        """
        signout = Signouts.objects.create()
        self.assertEqual(signouts.field(name='signout_id'), 3)
        self.assertContains(HttpResponse, status_code=200)
        self.assertEqual(EmployeeVsSignoutViewSet().new_signout)
        """