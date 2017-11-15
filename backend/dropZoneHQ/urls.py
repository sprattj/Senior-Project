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

from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
from django.conf.urls import include, url
from django.contrib import admin
from django.http import HttpRequest
from django.contrib.auth import views

sys.path.append('../')

from backend.datastore.views import *

urlpatterns = [
    url(r'^$', TemplateView.as_view(template_name='index.html')),
    url(r'^(?i)admin[/]?', admin.site.urls),
    url(r'^(?i)rigs/(?P<pk>[0-9]+)[/]?$', RigDetail.as_view()),
    url(r'^(?i)rigsheet[s]?/all[/]?', EmployeeVsSignoutList.as_view()),
    url(r'^(?i)rigsheet[s]?/(?P<pk>[0-9]+)[/]?$', EmployeeVsSignoutDetail.as_view()),
    url(r'^(?i)rigsheet[s]?/student[s]?[/]?$', EmployeeVsSignoutStudentList.as_view()),
    url(r'^(?i)rigsheet[s]?/tandem[s]?[/]?$', EmployeeVsSignoutTandemList.as_view()),
    url(r'^(?i)employee[s]?/(?P<pk>[0-9]+)[/]?$', EmployeeDetail.as_view()),
    url(r'^(?i)employee[s]?[/]?$', EmployeeList.as_view()),
    url(r'^(?i)itemtype[s]?/(?P<pk>[0-9]+)[/]?$', ItemTypeDetail.as_view()),
    url(r'^(?i)itemtype[s]?[/]?$', ItemTypeList.as_view()),
    url(r'^(?i)item[s]?/(?P<pk>[0-9]+)[/]?$', ItemDetail.as_view()),
    url(r'^(?i)item[s]?[/]?$', ItemList.as_view()),
    url(r'^(?i)rental[s]?/(?P<pk>[0-9]+)[/]?$', RentalDetail.as_view()),
    url(r'^(?i)rental[s]?[/]?$', RentalList.as_view()),
    url(r'^login/$', views.LoginView.as_view(), name='login'),
    url(r'^logout/$', views.LogoutView.as_view(), name='logout'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
