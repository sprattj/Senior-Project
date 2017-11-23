from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets
from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework import generics
from .serializers import *
from . import util
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model, login, logout, authenticate
from django.contrib.auth import views as auth_views
import datetime
from django.core.mail import send_mail


@login_required()
class ActionList(generics.ListCreateAPIView):
    queryset = Actions.objects.all()
    serializer_class = ActionSerializer

@login_required()
class ActionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Actions.objects.all()
    serializer_class = ActionSerializer

@login_required()
class AADList(generics.ListCreateAPIView):
    queryset = AutomaticActivationDevices.objects.all()
    serializer_class = AADSerializer

@login_required()
class AADDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = AutomaticActivationDevices.objects.all()
    serializer_class = AADSerializer

@login_required()
class CanopyList(generics.ListCreateAPIView):
    queryset = Canopies.objects.all()
    serializer_class = CanopySerializer

@login_required()
class CanopyDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Canopies.objects.all()
    serializer_class = CanopySerializer

@login_required()
class ContainerList(generics.ListCreateAPIView):
    queryset = Containers.objects.all()
    serializer_class = ContainerSerializer

@login_required()
class DropzoneList(generics.ListCreateAPIView):
    queryset = Dropzones.objects.all()
    serializer_class = DropZoneSerializer

@login_required()
class DropzoneDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Dropzones.objects.all()
    serializer_class = DropZoneSerializer

@login_required()
class EmployeeEmployeeRoleList(generics.ListCreateAPIView):
    queryset = EmployeesEmployeeRoles.objects.all()
    serializer_class = EmployeeEmployeeRoleSerializer

@login_required()
class EmployeeEmployeeRoleDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = EmployeesEmployeeRoles.objects.all()
    serializer_class = EmployeeEmployeeRoleSerializer

@login_required()
class EmployeeList(generics.ListCreateAPIView):
    queryset = Employees.objects.all()
    serializer_class = EmployeeSerializer

@login_required()
class EmployeeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Employees.objects.all()
    serializer_class = EmployeeSerializer


# class EmployeesActionsList(generics.ListCreateAPIView):
    # TODO ?


# class EmployeesActionsDetail(generics.RetrieveUpdateDestroyAPIView):
    # TODO ?


# OTHER EMPLOYEE BRIDGING TABLES? TODO

@login_required()
class ItemList(generics.ListCreateAPIView):
    queryset = Items.objects.all()
    serializer_class = ItemSerializer

@login_required()
class ItemDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Items.objects.all()
    serializer_class = ItemSerializer

@login_required()
class ItemTypeList(generics.ListCreateAPIView):
    queryset = ItemTypes.objects.all()
    serializer_class = ItemTypeSerializer

@login_required()
class ItemTypeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ItemTypes.objects.all()
    serializer_class = ItemTypeSerializer


# ITEMS BRIDGING TABLES? TODO
@login_required()
class RentableItemList(generics.ListCreateAPIView):
    queryset = Items.objects.all().filter(is_rentable=1)
    serializer_class = ItemSerializer

@login_required()
class RentalList(generics.ListCreateAPIView):
    queryset = Rentals.objects.all()
    serializer_class = RentalSerializer

@login_required()
class RentalDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Rentals.objects.all()
    serializer_class = RentalSerializer

@login_required()
class ReserveCanopyList(generics.ListCreateAPIView):
    queryset = ReserveCanopies.objects.all()
    serializer_class = ReserveCanopySerializer

@login_required()
class ReserveCanopyDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ReserveCanopies.objects.all()
    serializer_class = ReserveCanopySerializer

@login_required()
class RigList(generics.ListCreateAPIView):
    queryset = Rigs.objects.all()
    serializer_class = RigSerializer

@login_required()
class RigDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Rigs.objects.all()
    serializer_class = RigSerializer

@login_required()
class RigAuditTrailList(generics.ListCreateAPIView):
    queryset = RigsAuditTrail.objects.all()
    serializer_class = RigAuditTrailSerializer

@login_required()
class RigAuditTrailDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = RigsAuditTrail.objects.all()
    serializer_class = RigAuditTrailSerializer

@login_required()
class ServiceList(generics.ListCreateAPIView):
    queryset = Services.objects.all()
    serializer_class = ServiceSerializer

@login_required()
class ServiceDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Services.objects.all()
    serializer_class = ServiceSerializer

@login_required()
class SignoutList(generics.ListCreateAPIView):
    queryset = Signouts.objects.all()
    serializer_class = SignoutSerializer

@login_required()
class SignoutDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Signouts.objects.all()
    serializer_class = SignoutSerializer

@login_required()
class AllCanopyList(generics.ListCreateAPIView):
    queryset = AllCanopies.objects.all()
    serializer_class = AllCanopySerializer

@login_required()
class AllCanopyDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = AllCanopies.objects.all()
    serializer_class = AllCanopySerializer

@login_required()
class AllItemList(generics.ListCreateAPIView):
    queryset = AllItems.objects.all()
    serializer_class = AllItemSerializer

@login_required()
class AllItemDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = AllItems.objects.all()
    serializer_class = AllItemSerializer

@login_required()
class EmployeeVsSignoutList(generics.ListCreateAPIView):
    queryset = EmployeesVsSignouts.objects.all()
    serializer_class = EmployeeVsSignoutSerializer

@login_required()
class EmployeeVsSignoutDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = EmployeesVsSignouts.objects.all()
    serializer_class = EmployeeVsSignoutSerializer

@login_required()
class EmployeeVsSignoutStudentList(generics.ListCreateAPIView):
    queryset = EmployeesVsSignoutsStudent.objects.all()
    serializer_class = EmployeeVsSignoutSerializer

@login_required()
class EmployeeVsSignoutStudentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = EmployeesVsSignoutsStudent.objects.all()
    serializer_class = EmployeeVsSignoutSerializer

@login_required()
class EmployeeVsSignoutTandemList(generics.ListCreateAPIView):
    queryset = EmployeesVsSignoutsTandem.objects.all()
    serializer_class = EmployeeVsSignoutSerializer

@login_required()
class EmployeeVsSignoutTandemDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = EmployeesVsSignoutsTandem.objects.all()
    serializer_class = EmployeeVsSignoutSerializer


"""
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
    
    # API endpoint that allows rigs to be viewed or edited.
    
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
                # GET INFO FROM SERIALIZER
                signout_id = pk
                signout.objects.update()
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
                emp_queryset = Employees.objects.all()
                # serializer.save()
                # GET INFO FROM SERIALIZER
                load_num = serializer.data.get('load_num')
                rig_id = serializer.data.get('rig_id')
                signout_id = serializer.data.get('signout_id')
                jumpmaster = serializer.data.get('jumpmaster')
                # Split name into first/last
                first_name, last_name = jumpmaster.split(" ")
                emp_queryset = emp_queryset.get(first_name=first_name, last_name=last_name)[:1]
                emp_id = emp_queryset.get('employee_id')
                # Create a new signouts entry
                Signouts.objects.create(signout_id=signout_id, load=load_num, rig_id=rig_id)
                # Create a new employees_signouts_entry
                EmployeesSignouts.objects.create(employee_id=emp_id, signout_id=signout_id)
                return HttpResponse(status=status.HTTP_201_CREATED)
            return HttpResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

'''
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
'''
"""
def createDropzone(request):

    try :
        username = request.POST['username']
        password = request.POST['password']
        location = request.POST['location']
        email = request.POST['email']
        if email or password or location or username is None :
            return HttpResponse(status=status.HTTP_204_NO_CONTENT)
        else :
            try :
                dropzone = Dropzones.objects.create_user(username=username, password=password, email=email, location=location)
                dropzone.save()
            except :
                return HttpResponse(status=status.HTTP_400_BAD_REQUEST)
            serializer = DropZoneSerializer(data= dropzone)
            return JsonResponse(data=serializer.data, status=status.HTTP_201_CREATED)
    except :
        return HttpResponse(status=status.HTTP_400_BAD_REQUEST)

def loginDropzone(request):
    try :
        username = request.POST['username']
        password = request.POST['password']
        dropzone = authenticate(request=request,username=username,password=password)
        if dropzone is None :
            return HttpResponse(status=status.HTTP_400_BAD_REQUEST)
        else :
            login(request, user=dropzone)
    except :
        return HttpResponse(status=status.HTTP_204_NO_CONTENT)

@login_required()
def logoutDropzone(request):
    logout(request)
    return HttpResponse(status=status.HTTP_202_ACCEPTED)

@login_required()
def EmployeeView(request, dropzonePK):

    if request.method == 'GET':

        dro

    elif request.method == 'POST':

        try:
            dropzone = Dropzones.objects.get(dropzonePK)
            first = request.POST['first_name']
            last = request.POST['last_name']
            email = request.POST['email']
            role = request.POST['role']

            if Employees.employee_email_in_use(email) is not None:
                emp = Employees(first_name=first, last_name=last, email=email, dropzone=dropzone)
                emp.save()
                while Employees.employee_pin_in_use(emp.pin)  :
                    pin = Employees.create_random_user_pin(emp.employee_id)
                    emp.pin = Employees.pin_to_hash(pin)
                trole = EmployeeRoles.find_role_auth_level(role)
                emp.roles = trole
                emp.save()
                serializer = EmployeeSerializer(emp)
                send_mail(
                    subject='DropzoneHQ Employee Pin [NO REPLY]',
                    message='Your new employee pin is ' + pin,
                    from_email='dropzonehqNO-REPLY@dropzonehq.com',
                    recipient_list=[emp.email],
                    fail_silently=False
                )
                return JsonResponse(data= serializer.data ,status=201)
            else :
                return HttpResponse(status=status.HTTP_400_BAD_REQUEST)
        except:
            return HttpResponse(status=status.HTTP_204_NO_CONTENT)


#authenticate an employee based on their pin and return an http status if the user is authentic
@login_required()
def authenticateUserPin(request):
    if request.method == 'POST' :

        # the way our pin works sets the user primary as their last 3 digits
        try :
            pin = request.POST['pin']

            if pin is None :
                return HttpResponse(status=status.HTTP_204_NO_CONTENT)
            else :
                try :
                    pk = int(pin[4:])
                    employee = Employees.objects.get(pk)
                    if employee is None :
                        return HttpResponse(status=status.HTTP_400_BAD_REQUEST)
                    else :
                        if Employees.check_employee_pin(pin,employee) :
                            return HttpResponse(status=status.HTTP_202_ACCEPTED)
                        else :
                            return HttpResponse(status=status.HTTP_400_BAD_REQUEST)
                except :
                    return HttpResponse(status=status.HTTP_400_BAD_REQUEST)
        except :
            return HttpResponse(status=status.HTTP_204_NO_CONTENT)

    else :
        return HttpResponse(status=status.HTTP_400_BAD_REQUEST)


# Session authentication
def authenticateDropzone(request):
    #todo
    token = request.session
    return False

# return a user object if the username is found
# else return None
def authenticateNameDropzone(request):
    name = request.POST['name']
    if name is None:
        return HttpResponse(status=status.HTTP_400_BAD_REQUEST)
    else:
        dropzone = Dropzones.dropzoneNameInUse(name)
        if dropzone is None :
            return HttpResponse(status=status.HTTP_204_NO_CONTENT)
        else :
            serializer = DropZoneSerializer(dropzone)
            return JsonResponse(data=serializer.data, status=200)



def password_reset(request):
    email = None
    try:
        email = request.POST['email']
    except:
        return HttpResponse(status=status.HTTP_204_NO_CONTENT)

    if email is None :
        return HttpResponse(status=status.HTTP_204_NO_CONTENT)
    else:
        dropzone = Dropzones.dropzoneEmailInUse(email)
        hashs = util.createHash(email)
        temp = TempUrl.objects.create(hashs,datetime.date.today() + datetime.timedelta(days=1))
        message = util.createPasswordResetMessage(temp.get_url_hash())
        Dropzones.email_user(dropzone,
                             "DropzoneHQ Password Reset [NO REPLY]",
                             message=message,
                             from_email='dropzonehqNO-REPLY@dropzonehq.com')
        return HttpResponse(status=status.HTTP_202_ACCEPTED)

@login_required()
def password_reset_employee(request):
    email = None
    try :
        email = request.POST['email']
    except:
        return HttpResponse(status=status.HTTP_204_NO_CONTENT)

    if email is None:
        return HttpResponse(status=status.HTTP_204_NO_CONTENT)
    else:
        employee = Employees.employee_email_in_use(email)
        pin = Employees.create_random_user_pin(employee)
        employee.pin = Employees.pin_to_hash(pin)
        util.createPinResetMessage(employee.pin)
        send_mail(
            subject='DropzoneHQ Employee Pin [NO REPLY]',
            message='Your new employee pin is ' + employee.pin,
            from_email='dropzonehqNO-REPLY@dropzonehq.com',
            recipient_list=[employee.email],
            fail_silently=False
        )
        return HttpResponse(status=status.HTTP_202_ACCEPTED)

def reset_url(request, hash=None):
    try:
        reset = TempUrl.objects.get(hash)
        if reset is None :
            dropzone = reset.dropzone
            Dropzones.set_password(dropzone, request.POST['password'])
            return HttpResponse(status=status.HTTP_204_NO_CONTENT)
        else :
            return HttpResponse(status=status.HTTP_202_ACCEPTED)
    except:
        return HttpResponse(status=status.HTTP_400_BAD_REQUEST)
