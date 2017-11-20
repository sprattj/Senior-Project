from rest_framework import generics, status
from django.http import JsonResponse, HttpResponse
from .serializers import *
from . import util
from backend.datastore.models import *
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model, login, logout, authenticate
from django.contrib.auth import views as auth_views
from django.contrib.auth.mixins import LoginRequiredMixin
import datetime
from django.core.mail import send_mail


class AADList(generics.ListCreateAPIView):
    queryset = AutomaticActivationDevices.objects.all()
    serializer_class = AADSerializer


class AADDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = AutomaticActivationDevices.objects.all()
    serializer_class = AADSerializer


class CanopyList(generics.ListCreateAPIView):
    queryset = Canopies.objects.all()
    serializer_class = CanopySerializer


class CanopyDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Canopies.objects.all()
    serializer_class = CanopySerializer


class ContainerList(generics.ListCreateAPIView):
    queryset = Containers.objects.all()
    serializer_class = ContainerSerializer


class DropzoneList(generics.ListCreateAPIView):
    queryset = Dropzones.objects.all()
    serializer_class = DropZoneSerializer


class DropzoneDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Dropzones.objects.all()
    serializer_class = DropZoneSerializer


class EmployeeEmployeeRoleList(generics.ListCreateAPIView):
    queryset = EmployeesEmployeeRoles.objects.all()
    serializer_class = EmployeeEmployeeRoleSerializer


class EmployeeEmployeeRoleDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = EmployeesEmployeeRoles.objects.all()
    serializer_class = EmployeeEmployeeRoleSerializer


class EmployeeList(generics.ListCreateAPIView):
    queryset = Employees.objects.all()
    serializer_class = EmployeeSerializer


class EmployeeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Employees.objects.all()
    serializer_class = EmployeeSerializer


class ItemList(generics.ListCreateAPIView):
    queryset = Items.objects.all()
    serializer_class = ItemSerializer


class ItemDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Items.objects.all()
    serializer_class = ItemSerializer


class ItemTypeList(generics.ListCreateAPIView):
    queryset = ItemTypes.objects.all()
    serializer_class = ItemTypeSerializer


class ItemTypeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ItemTypes.objects.all()
    serializer_class = ItemTypeSerializer


class RentableItemList(generics.ListCreateAPIView):
    queryset = AllItems.objects.all().filter(is_rentable=1)
    serializer_class = AllItemSerializer


class RentalList(generics.ListCreateAPIView):
    queryset = Rentals.objects.all()
    serializer_class = RentalSerializer


class RentalDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Rentals.objects.all()
    serializer_class = RentalSerializer


class ReserveCanopyList(generics.ListCreateAPIView):
    queryset = ReserveCanopies.objects.all()
    serializer_class = ReserveCanopySerializer


class ReserveCanopyDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ReserveCanopies.objects.all()
    serializer_class = ReserveCanopySerializer


class RigList(generics.ListCreateAPIView):
    queryset = Rigs.objects.all()
    serializer_class = RigSerializer


class AvailableStudentRigList(generics.ListAPIView):
    queryset = Rigs.objects.all().filter(istandem=0)
    serializer_class = RigSerializer


class AvailableTandemRigList(generics.ListAPIView):
    queryset = Rigs.objects.all().filter(istandem=1)
    serializer_class = RigSerializer


class RigDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Rigs.objects.all()
    serializer_class = RigSerializer


class RigAuditTrailList(generics.ListCreateAPIView):
    queryset = RigsAuditTrail.objects.all()
    serializer_class = RigAuditTrailSerializer


class RigAuditTrailDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = RigsAuditTrail.objects.all()
    serializer_class = RigAuditTrailSerializer


class ClaimList(generics.ListCreateAPIView):
    queryset = Claims.objects.all()
    serializer_class = ClaimSerializer

#TODO
class ClaimWarningList(generics.ListCreateAPIView):
    queryset = Claims.objects.filter(status=Claims.PENDING)
    serializer_class = ClaimSerializer

class ClaimQueueList(generics.ListCreateAPIView):
    queryset = Claims.objects.filter(status=Claims.IN_PROGRESS)
    serializer_class = ClaimSerializer

class ClaimDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Claims.objects.all()
    serializer_class = ClaimSerializer

class PendingClaimList(generics.ListCreateAPIView):
    queryset = Claims.objects.all().filter(status='Pending')
    serializer_class = ClaimSerializer


class InProgressClaimList(generics.RetrieveUpdateDestroyAPIView):
    queryset = Claims.objects.all().filter(status='In-Progress')
    serializer_class = ClaimSerializer


class SignoutList(generics.ListCreateAPIView):
    queryset = Signouts.objects.all()
    serializer_class = SignoutSerializer


class SignoutDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Signouts.objects.all()
    serializer_class = SignoutSerializer


class AllCanopyList(generics.ListCreateAPIView):
    queryset = AllCanopies.objects.all()
    serializer_class = AllCanopySerializer


class AllCanopyDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = AllCanopies.objects.all()
    serializer_class = AllCanopySerializer


class AllItemList(generics.ListCreateAPIView):
    queryset = AllItems.objects.all()
    serializer_class = AllItemSerializer


class AllItemDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = AllItems.objects.all()
    serializer_class = AllItemSerializer


class EmployeeVsSignoutList(generics.ListAPIView):
    queryset = EmployeesVsSignouts.objects.all()
    serializer_class = EmployeeVsSignoutSerializer


class EmployeeVsSignoutDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = EmployeesVsSignouts.objects.all()
    serializer_class = EmployeeVsSignoutSerializer


class EmployeeVsSignoutStudentList(generics.ListCreateAPIView):
    queryset = EmployeesVsSignoutsStudent.objects.all()
    serializer_class = EmployeeVsSignoutSerializer

    def post(self, request, *args, **kwargs):
        employee = Employees.objects.get(pin=request.data.get('pin'))
        employee_id = employee.employee_id
        rig_id = request.data.get('rig_id')
        load_number = request.data.get('load_number')
        '''
        employee = Employees.employee_pin_in_use(request.data.get('pin'))
        employee_id = employee.employee_id
        '''
        jumpmaster = get_emp_full_name(employee_id)
        signout_id = post_signout(request)

        post_emp_signout(employee_id, signout_id)
        ret_data = {'jumpmaster': jumpmaster, 'jumpmaster_id': employee_id,
                    'rig_id': rig_id, 'load_number': load_number, 'signout_id': signout_id}
        return JsonResponse(data=ret_data, status=status.HTTP_201_CREATED)

<<<<<<< HEAD
=======

>>>>>>> spratt
class EmployeeVsSignoutStudentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = EmployeesVsSignoutsStudent.objects.all()
    serializer_class = EmployeeVsSignoutSerializer

    def patch(self, request, *args, **kwargs):
        # employee = Employees.employee_pin_in_use(request.data.get('pin'))
        employee = Employees.objects.get(pin=request.data.get('pin'))
        signout_id = self.kwargs.get('pk')
        employee_id = employee.employee_id

        patch_emp_signout(employee_id, signout_id)

        packed_by = get_emp_full_name(employee_id)
        data = {'packer_id': employee_id, 'packed_by': packed_by}
        return JsonResponse(data=data, status=status.HTTP_202_ACCEPTED)

    def destroy(self, request, *args, **kwargs):
        signout_id = self.kwargs.get('pk')
        # Destroy all EmployeeSignout records related to signout_id
        EmployeesSignouts.objects.filter(signout_id=signout_id).delete()
        # Destroy Signout record
        Signouts.objects.filter(signout_id=signout_id).delete()
        data = {'signout_id': signout_id}
        return JsonResponse(data=data, status=status.HTTP_204_NO_CONTENT)


class EmployeeVsSignoutTandemList(generics.ListCreateAPIView):
    queryset = EmployeesVsSignoutsTandem.objects.all()
    serializer_class = EmployeeVsSignoutSerializer

    def post(self, request, *args, **kwargs):
        employee = Employees.objects.get(pin=request.data.get('pin'))
        employee_id = employee.employee_id
        rig_id = request.data.get('rig_id')
        load_number = request.data.get('load_number')
        '''
        employee = Employees.employee_pin_in_use(request.data.get('pin'))
        employee_id = employee.employee_id
        '''
        jumpmaster = get_emp_full_name(employee_id)
        signout_id = post_signout(request)

        post_emp_signout(employee_id, signout_id)
        ret_data = {'jumpmaster': jumpmaster, 'jumpmaster_id': employee_id,
                    'rig_id': rig_id, 'load_number': load_number, 'signout_id': signout_id}
        return JsonResponse(data=ret_data, status=status.HTTP_201_CREATED)


class EmployeeVsSignoutTandemDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = EmployeesVsSignoutsTandem.objects.all()
    serializer_class = EmployeeVsSignoutSerializer

    def patch(self, request, *args, **kwargs):
        # employee = Employees.employee_pin_in_use(request.data.get('pin'))
        employee = Employees.objects.get(pin=request.data.get('pin'))
        signout_id = self.kwargs.get('pk')
        employee_id = employee.employee_id

        patch_emp_signout(employee_id, signout_id)

        packed_by = get_emp_full_name(employee_id)
        data = {'packer_id': employee_id, 'packed_by': packed_by}
        return JsonResponse(data=data, status=status.HTTP_202_ACCEPTED)


def post_signout(request):
    rig_id = request.data.get('rig_id')
    load_number = request.data.get('load_number')

    Signouts.objects.create(rig_id=rig_id, load_number=load_number)
    signout_id_dict = Signouts.objects.values().get(signout_id=
                                                    Signouts.objects.latest('signout_id')
                                                    .serializable_value('signout_id'))
    signout_id = signout_id_dict.get("signout_id", "")
    return signout_id


def post_emp_signout(employee_id, signout_id):
    EmployeesSignouts.objects.create(signout_id=signout_id,
                                     employee_id=employee_id,
                                     packed_signout=EmployeesSignouts.SIGNOUT,
                                     timestamp=datetime.datetime.now())
    return


def patch_emp_signout(employee_id, signout_id):
    EmployeesSignouts.objects.create(signout_id=signout_id,
                                     employee_id=employee_id,
                                     packed_signout=EmployeesSignouts.PACKED,
                                     timestamp=datetime.datetime.now())

    '''
    data = {'employee_id': employee_id, 'signout_id': signout_id, 'packed_signout': EmployeesSignouts.PACKED,
            'timestamp': datetime.datetime.now()}
    print(data)

    serializer = EmployeeSignoutSerializer(data=data)
    print(serializer.get_fields())
    if serializer.is_valid():
        print(serializer.validated_data)
        # serializer.save()
        return
    print(serializer.is_valid())
    '''
    return


def get_emp_full_name(employee_id):
    emp_name = Employees.objects.get(employee_id=employee_id).first_name + ' ' + \
        Employees.objects.get(employee_id=employee_id).last_name
    return emp_name


def createDropzone(request):
    try:
        username = request.POST['username']
        password = request.POST['password']
        location = request.POST['location']
        email = request.POST['email']
        if email or password or location or username is None :
            return HttpResponse(status=status.HTTP_204_NO_CONTENT)
        else:
            try:
                dropzone = Dropzones.objects.create_user(username=username, password=password, email=email, location=location)
                dropzone.save()
            except:
                return HttpResponse(status=status.HTTP_400_BAD_REQUEST)
            serializer = DropZoneSerializer(data= dropzone)
            return JsonResponse(data=serializer.data, status=status.HTTP_201_CREATED)
    except:
        return HttpResponse(status=status.HTTP_400_BAD_REQUEST)


def loginDropzone(request):
    try:
        username = request.POST['username']
        password = request.POST['password']
        dropzone = authenticate(request=request,username=username,password=password)
        if dropzone is None :
            return HttpResponse(status=status.HTTP_400_BAD_REQUEST)
        else:
            login(request, user=dropzone)
    except:
        return HttpResponse(status=status.HTTP_204_NO_CONTENT)


def logoutDropzone(request):
    logout(request)
    return HttpResponse(status=status.HTTP_202_ACCEPTED)


@login_required()
def createEmployee(request, dropzonePK):
    try:
        dropzone = Dropzones.objects.get(dropzonePK)
        first = request.POST['first_name']
        last = request.POST['last_name']
        email = request.POST['email']
        if Employees.employee_email_in_use(email) is not None:
            emp = Employees(first_name=first, last_name=last, email=email, dropzone=dropzone)
            emp.save()
            while Employees.employee_pin_in_use(emp.pin) :
                pin = util.randomUserPin(emp.employee_id)
                emp.pin = Employees.pin_to_hash(pin)
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
        else:
            return HttpResponse(status=status.HTTP_400_BAD_REQUEST)
    except:
        return HttpResponse(status=status.HTTP_204_NO_CONTENT)


# authenticate an employee based on their pin and return an http status if the user is authentic
@login_required()
def authenticateUserPin(request):
    if request.method == 'POST' :

        # the way our pin works sets the user primary as their last 3 digits
        try:
            pin = request.POST['pin']

            if pin is None:
                return HttpResponse(status=status.HTTP_204_NO_CONTENT)
            else:
                try:
                    pk = int(pin[4:])
                    employee = Employees.objects.get(pk)
                    if employee is None :
                        return HttpResponse(status=status.HTTP_400_BAD_REQUEST)
                    else:
                        if Employees.check_employee_pin(pin,employee) :
                            return HttpResponse(status=status.HTTP_202_ACCEPTED)
                        else:
                            return HttpResponse(status=status.HTTP_400_BAD_REQUEST)
                except:
                    return HttpResponse(status=status.HTTP_400_BAD_REQUEST)
        except:
            return HttpResponse(status=status.HTTP_204_NO_CONTENT)

    else:
        return HttpResponse(status=status.HTTP_400_BAD_REQUEST)


# Session authentication
def authenticateDropzone(request):
    # todo
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

    if email is None:
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
    try:
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
        if reset is None:
            dropzone = reset.dropzone
            Dropzones.set_password(dropzone, request.POST['password'])
            return HttpResponse(status=status.HTTP_204_NO_CONTENT)
        else:
            return HttpResponse(status=status.HTTP_202_ACCEPTED)
    except:
        return HttpResponse(status=status.HTTP_400_BAD_REQUEST)
