from django.test import TestCase
import sys
import django
django.setup()
sys.path.append('../')
from backend.datastore.views import *


print(EmployeeVsSignoutViewSet.all_signout_records)


class EmployeeVsSignoutViewSetTestCase(TestCase):

    def test_signouts_get(self):
        signouts = EmployeesVsSignouts.objects.get(3)
        self.assertEqual(signouts.field(name='signout_id'), 3)
        self.assertContains(HttpResponse, status_code=200)
