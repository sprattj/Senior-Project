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
    url(r'^admin[/]', admin.site.urls),
    url(r'^rigs/(?P<pk>[0-9]+/$)[/]', RigDetail.as_view()),
    url(r'^rigsheets/all[/]', EmployeeVsSignoutList.as_view()),
    url(r'^rigsheets/(?P<pk>[0-9]+$)[/]', EmployeeVsSignoutDetail.as_view()),
    url(r'^rigsheets/[Ss]tudent[/]', EmployeeVsSignoutStudentList.as_view()),
    url(r'^rigsheets/[Tt]andem[/]', EmployeeVsSignoutTandemList.as_view()),
    url(r'^employees/(?P<pk>[0-9]+$)[/]', EmployeeDetail.as_view()),
    url(r'^employees[/]', EmployeeList.as_view()),
    url(r'^itemtypes/(?P<pk>[0-9]+$)[/]', ItemTypeDetail.as_view()),
    url(r'^itemtypes[/]', ItemTypeList.as_view())
]
