from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets
# from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from .models import *
from .serializers import *


class RigViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows rigs to be viewed or edited.
    """
    queryset = Rigs.objects.all()
    

    @csrf_exempt
    def rig_list(self, request):
        if request.method == 'GET':
            rigs = RigViewSet.queryset
            serializer = RigViewSet.serializer_class(rigs, many=True)
            return JsonResponse(serializer.data, safe=False)

        elif request.method == 'POST':
            data = JSONParser().parse(request)
            serializer = RigViewSet.serializer_class(data=data)

            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data, status=201)
            return JsonResponse(serializer.errors, status=400)

    @csrf_exempt
    def rig_detail(self, request, pk):
        try:
            rig = RigViewSet.queryset.get(pk=pk)
        except Rigs.DoesNotExist:
            return HttpResponse(status=404)
        """if request.method == 'GET': request.method == 'GET'"""
        if 1 == 1:
            serializer_class = RigSerializer
            serializer = RigViewSet.serializer_class(rig)
            return JsonResponse(serializer.data)

        elif request.method == 'PUT':
            data = JSONParser().parse(request)
            serializer = RigViewSet.serializer_class(rig, data=data)

            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data)
            return JsonResponse(serializer.errors, status=400)

        elif request.method == 'DELETE':
            rig.delete()
            return HttpResponse(status=204)



class EmployeeVsSignoutViewSet(viewsets.ModelViewSet):

    @csrf_exempt
<<<<<<< HEAD:backend/datastore/views.py
    def employee_signout_records(self): 
            queryset = EmployeesVsSignouts.objects.all()
            serializer_class = EmployeeVsSignoutSerializer
=======
    def employee_signout_records(self, request, is_tandem):
        if is_tandem:
            queryset = EmployeesVsSignoutsTandem.objects.all()
        else:
            queryset = EmployeesVsSignouts.objects.all()
        serializer_class = EmployeeVsSignoutSerializer()
        if request.method == 'GET':
>>>>>>> 11198e8d09d85a91ffa1802055a239c47fdaf783:backend/datastore/views.py
            serializer = serializer_class(queryset, many=True)
            return JsonResponse(serializer.data, safe=False)


class EmployeeViewSet(viewsets.ModelViewSet):
<<<<<<< HEAD:backend/datastore/views.py

    def employees(self):
        queryset = Employees.objects.all()
        serializer_class = EmployeeSerializer
        serializer = serializer_class(queryset, many=True)
        return JsonResponse(serializer.data, safe=False)
=======
    queryset = Employees.objects.all()
    serializer_class = EmployeeSerializer()
>>>>>>> 11198e8d09d85a91ffa1802055a239c47fdaf783:backend/datastore/views.py
