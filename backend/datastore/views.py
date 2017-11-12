from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
# from django.db import connection
from rest_framework import viewsets
from rest_framework import status
# from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from .serializers import *
from . import util


class ItemViewSet(viewsets.ModelViewSet):
    @csrf_exempt
    def all_items(self, request):
        if request.method == 'GET':
            items = AllItems.objects.all()
            serializer = AllItemSerializer(items, many=True)
            return JsonResponse(serializer.data, safe=False)

    @csrf_exempt
    def specific_item(self, request, pk):
        if request.method == 'GET':
            item = AllItems.objects.get(pk)
            serializer = AllItemSerializer(item)
            return JsonResponse(serializer.data, safe=False)

    @csrf_exempt
    def items_by_type(self, request, item_type):
        if request.method == 'GET':
            items = AllItems.objects.all().filter(item_type=item_type)
            serializer = AllItemSerializer(items, many=True)
            return JsonResponse(serializer.data, safe=False)


class RigViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows rigs to be viewed or edited.
    """
    @csrf_exempt
    def specific_rig(self, request, pk):
        try:
            rig = Rigs.objects.get(pk)
        except Rigs.DoesNotExist:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)
        if request.method == 'GET':
            serializer = RigSerializer(rig)
            return JsonResponse(serializer.data, safe=False)

        elif request.method == 'POST':
            data = JSONParser().parse(request)
            serializer = RigSerializer(data=data)

            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @csrf_exempt
    def rig_detail(self, request, pk):
        try:
            rig = RigViewSet.queryset.get(pk=pk)
        except Rigs.DoesNotExist:
            return HttpResponse(status=404)
        if request.method == 'GET':
            serializer = RigSerializer(rig)
            return JsonResponse(serializer.data)

        elif request.method == 'PUT':
            data = JSONParser().parse(request)
            serializer = RigSerializer(rig, data=data)

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
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)

        if request.method == 'GET':
            serializer = EmployeeVsSignoutSerializer(signout)
            return JsonResponse(serializer.data)

        elif request.method == 'PUT':
            serializer = EmployeeVsSignoutSerializer(signout, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return HttpResponse(status=status.HTTP_202_ACCEPTED)

    @csrf_exempt
    def new_signout(self, request):
        if request.method == 'POST':
            '''
            cursor = connection.cursor()
            ret = cursor.callproc("new_signout")
            '''
            serializer = EmployeeVsSignoutSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return HttpResponse(status=status.HTTP_201_CREATED)
            return HttpResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EmployeeViewSet(viewsets.ModelViewSet):

    @csrf_exempt
    def all_employees(self, request):
        if request.method == 'GET':
            emps = Employees.objects.all()
            serializer = EmployeeSerializer(emps, many=True)
            return JsonResponse(serializer.data, safe=False)

        elif request.method == 'POST':
            serializer = EmployeeSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return HttpResponse(status=status.HTTP_201_CREATED)
        return HttpResponse(status=status.HTTP_400_BAD_REQUEST)

    @csrf_exempt
    def specific_employee(self, request, pk):
        try:
            emp = Employees.objects.get(pk)
        except Employees.DoesNotExist:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)

        if request.method == 'GET':
            serializer = EmployeeSerializer(emp)
            return JsonResponse(serializer.data)

        elif request.method == 'PUT':
            serializer = EmployeeSerializer(request.data)
            if serializer.is_valid():
                serializer.save()
                return HttpResponse(status=status.HTTP_202_ACCEPTED)
            return HttpResponse(status=status.HTTP_400_BAD_REQUEST)

        elif request.method == 'DELETE':
            emp.delete()
            return HttpResponse(status=status.HTTP_204_NO_CONTENT)


class CreateDrozoneViewSet(viewsets.ModelViewSet) :

    def createDropzone(self, request):
        try :
            name = request.POST['name']
            password = request.POST['password']
            location = request.POST['location']
            email = request.POST['email']
            try :
                if Dropzones.dropzoneNameInUse(name=name) is not None:
                    if Dropzones.dropzoneLocationInUse(location=location) is not None:
                        if Dropzones.dropzoneEmailInUse(email=email) is not None:
                            dropzone = Dropzones(name=name, password=password, location=location, email=email)
                            dropzone.save()
                            serializer = DropZoneSerializer(dropzone)
                            return JsonResponse(data= serializer.data ,status=201)
                return HttpResponse(status=status.HTTP_400_BAD_REQUEST)
            except :
                return HttpResponse(status=status.HTTP_400_BAD_REQUEST)
        except :
            return HttpResponse(status=status.HTTP_204_NO_CONTENT)



class CreateEmployeeViewSet(viewsets.ModelViewSet) :

    def createEmployee(self, request, dropzonePK):
        dropzone = Dropzones.objects.get(dropzonePK)
        first = request.POST['first_name']
        last = request.POST['last_name']
        email = request.POST['email']
        if Employees.employeeEmailInUse(email) is not None:
            emp = Employees(first_name=first, last_name=last, email=email, dropzone=dropzone)
            emp.save()
            while Employees.employeePinInUse(emp.pin) :
                emp.pin = util.randomUserPin(emp.employee_id)
            emp.save()
            serializer = EmployeeSerializer(emp)
            return JsonResponse(data= serializer.data ,status=201)
        else :
            return HttpResponse(status=status.HTTP_400_BAD_REQUEST)


class AuthenticateUserPin(viewsets.ModelViewSet) :

    def authenticateUserPin(self, request):
        # the way our pin works sets the user primary as their last 3 digits
        emp = util.authenticateEmployeePin(
            Employees.objects.get((request.POST['pin'] % 1000)),
            request.POST['pin'])
        serializer = EmployeeSerializer(emp)
        if emp is not None:
            return JsonResponse(data=serializer.data, status=200)
        return HttpResponse(status=status.HTTP_204_NO_CONTENT)

class AuthenticateDropzone(viewsets.ModelViewSet) :
    # authenticate a dropzone based on the name and password
    # return None if there is no dropzone there
    def authenticateDropzone(self, request):
        check = self.authenticatePasswordDropzone(self.authenticateNameDropzone(request.POST['username']),
                                                  request.POST['password'])
        return (JsonResponse({'dropzone', check.name}, status=400) if check is not None else HttpResponse(
            status=status.HTTP_400_BAD_REQUEST))

    # Session authentication
    def authenticateDropzone(self, request):
        token = request.session
        return False

    # return a user object if the username is found
    # else return None
    def authenticateNameDropzone(self, request, name=None):
        if request.POST[] is None:
            return None
        else:
            dropzone = Dropzones.objects.get(name)
            return dropzone

    # return a dropzone if the Sha is correct
    # else return None

    def authenticatePasswordDropzone(self, request, dropzone=None, password=None):
        if dropzone is None or password is None:
            return None
        else:
            if util.checkSha(password, dropzone.password):
                return dropzone
            else:
                return None