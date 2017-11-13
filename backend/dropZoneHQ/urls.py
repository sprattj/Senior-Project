"""DropZoneHQ URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
import sys

from django.conf.urls import include, url
from django.contrib import admin
from django.http import HttpRequest
from django.contrib.auth import views

sys.path.append('../')

from backend.datastore.views import *

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^rigs/$', RigViewSet.specific_rig),
    url(r'^rigs/(?P<pk>[0-9]+/$)', RigViewSet.specific_rig),
    url(r'^rigsheets/all', EmployeeVsSignoutViewSet().all_signout_records),
    url(r'^rigsheets/(?P<pk>[0-9]+$)', EmployeeVsSignoutViewSet().specific_signout),
    url(r'^rigsheets/student', EmployeeVsSignoutViewSet().student_signout_records),
    url(r'^rigsheets/tandem', EmployeeVsSignoutViewSet().tandem_signout_records),
    url(r'^employees/', EmployeeViewSet().all_employees)
    url(r'^login/$', views.login, name='login'),
    url(r'^logout/$', views.logout, name='logout'),
]
