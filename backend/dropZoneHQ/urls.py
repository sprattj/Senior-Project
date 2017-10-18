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

sys.path.append('../')

from backend.datastore.views import *

urlpatterns = [
    url(r'^a/', admin.site.urls),
    url(r'^rigs/$', RigViewSet.rig_list, HttpRequest().GET),
    url(r'^rigs/(?P<pk>[0-9]+/$)', RigViewSet.rig_detail),
	url(r'^aaaa/',EmployeeViewSet.employees),
    url(r'^evs/',EmployeeVsSignoutViewSet.employee_signout_records),
    url(r'^evs?istandem=True$',EmployeeVsSignoutViewSet.employee_signout_records),
]
