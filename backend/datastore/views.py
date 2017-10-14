import sys
sys.path.append('../')
from datastore.serializers import *
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets
# from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from datastore.models import *


class RigViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows rigs to be viewed or edited.
    """
    queryset = Rigs.objects.all()
    serializer_class = RigSerializer

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

        if request.method == 'GET':
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
    def get(self, request, is_tandem):
        if is_tandem:
            queryset = EmployeesVsSignoutsTandem.objects.all()
        else:
            queryset = EmployeesVsSignouts.objects.all()
        serializer_class = EmployeeVsSignoutSerializer
        if request.method == 'GET':
            serializer = serializer_class(queryset, many=True)
            return JsonResponse(serializer.data, safe=False)


class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employees.objects.all()
    serializer_class = EmployeeSerializer
