from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
# from django.db import connection
from rest_framework import viewsets
from rest_framework import status
# from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
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
        if request.method == 'GET':
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


class EmployeeVsSignoutViewSet(viewsets.ViewSet):
    @csrf_exempt
    def all_signout_records(self, request):
        queryset = EmployeesVsSignouts.objects.all()
        if request.method == 'GET':
            serializer = EmployeeVsSignoutSerializer(queryset, many=True)
            return JsonResponse(serializer.data, safe=False)

    @csrf_exempt
    def student_signout_records(self, request):
        queryset = EmployeesVsSignoutsStudent.objects.all()
        serializer_class = EmployeeVsSignoutSerializer
        if request.method == 'GET':
            serializer = serializer_class(queryset, many=True)
            return JsonResponse(serializer.data, safe=False)

        elif request.method == 'POST':
            serializer = EmployeeVsSignoutSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return HttpResponse(status=status.HTTP_201_CREATED)
            return HttpResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @csrf_exempt
    def tandem_signout_records(self, request):
        queryset = EmployeesVsSignoutsTandem.objects.all()
        if request.method == 'GET':
            serializer = EmployeeVsSignoutSerializer(queryset, many=True)
            return JsonResponse(serializer.data, safe=False)

    @csrf_exempt
    def specific_signout(self, request, pk):
        queryset = EmployeesVsSignouts.objects.all()
        try:
            signout = queryset.get(pk=pk)
        except EmployeesVsSignouts.DoesNotExist:
            return HttpResponse(status=404)

        if request.method == 'GET':
            serializer = EmployeeVsSignoutSerializer(signout)
            return JsonResponse(serializer.data)

    @csrf_exempt
    def new_signout(self, request):
        if request.method == 'PUT':
            '''
            cursor = connection.cursor()
            ret = cursor.callproc("new_signout")
            '''
            serializer = EmployeeVsSignoutSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return HttpResponse(status=status.HTTP_202_ACCEPTED)
            return HttpResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EmployeeViewSet(viewsets.ModelViewSet):

    @csrf_exempt
    def employees(self):
        queryset = Employees.objects.all()
        serializer_class = EmployeeSerializer
        serializer = serializer_class(queryset, many=True)
        return JsonResponse(serializer.data, safe=False)


class RigsheetTypeViewSet(viewsets.ModelViewSet):
    def rigsheet_types(self):
        return
