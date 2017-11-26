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


class AADList(generics.ListCreateAPIView, LoginRequiredMixin):
    queryset = AutomaticActivationDevices.objects.all()
    serializer_class = AADSerializer

    def post(self, request, *args, **kwargs):
        item_type_id = request.data.get('item_type_id')
        manufacturer = request.data.get('manufacturer')
        brand = request.data.get('brand')
        description = request.data.get('description')
        is_rentable = request.data.get('is_rentable')
        is_available = request.data.get('is_rentable')
        serial_number = request.data.get('serial_number')
        lifespan = request.data.get('lifespan')
        item_id = Items.objects.create(item_type_id=item_type_id,
                            manufacturer=manufacturer,
                            brand=brand,
                            description=description,
                            is_rentable=is_rentable,
                            is_rented=False,
                            is_on_rig=False)
        #TODO take deployment timestamp as a value?
        AutomaticActivationDevices.objects.create(item_id=item_id,
                                deployment_timestamp=datetime.datetime.now(),
                                lifespan=lifespan,
                                serial_number=serial_number)
        data = {'success': True}
        return JsonResponse(data=data, status=status.HTTP_202_ACCEPTED)


class AADDetail(generics.RetrieveUpdateDestroyAPIView, LoginRequiredMixin):
    queryset = AutomaticActivationDevices.objects.all()
    serializer_class = AADSerializer

    def patch(self, request, *args, **kwargs):
        item_id = self.kwargs.get('pk')
        item = Items.objects.get(item_id=item_id)
        aad = AutomaticActivationDevices.objects.get(item_id=item_id)

        serializer = ItemSerializer(item, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        new_instance = serializer.save()

        serializer = AADSerializer(aad, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        new_instance = serializer.save()
        return JsonResponse(data=serializer.data, status=status.HTTP_202_ACCEPTED)


class CanopyList(generics.ListCreateAPIView, LoginRequiredMixin):
    queryset = Canopies.objects.all()
    serializer_class = CanopySerializer

    def post(self, request, *args, **kwargs):
        item_type_id = request.data.get('item_type_id')
        manufacturer = request.data.get('manufacturer')
        brand = request.data.get('brand')
        description = request.data.get('description')
        is_rentable = request.data.get('is_rentable')
        is_available = request.data.get('is_rentable')
        serial_number = request.data.get('serial_number')
        size = request.data.get('size')
        date_of_manufacture = request.data.get('date_of_manufacture')
        item_id = Items.objects.create(item_type_id=item_type_id,
                            manufacturer=manufacturer,
                            brand=brand,
                            description=description,
                            is_rentable=is_rentable,
                            is_rented=False,
                            is_on_rig=False)
        Canopies.objects.create(item_id=item_id,
                                rig_id=None,
                                serial_number=serial_number,
                                size=size,
                                date_of_manufacture=date_of_manufacture,
                                jump_count=0)
        data = {'success': True}
        return JsonResponse(data=data, status=status.HTTP_202_ACCEPTED)


class CanopyDetail(generics.RetrieveUpdateDestroyAPIView, LoginRequiredMixin):
    queryset = Canopies.objects.all()
    serializer_class = CanopySerializer

    def patch(self, request, *args, **kwargs):
        item_id = self.kwargs.get('pk')
        item = Items.objects.get(item_id=item_id)
        canopy = Canopies.objects.get(item_id=item_id)

        serializer = CanopySerializer(canopy, data=request.data, partial=True)
        serializer = ItemSerializer(item, data=request.data, partial=True)

        new_instance = serializer.save()
        return JsonResponse(data=serializer.data, status=status.HTTP_202_ACCEPTED)


class ContainerList(generics.ListCreateAPIView, LoginRequiredMixin):
    queryset = Containers.objects.all()
    serializer_class = ContainerSerializer

    def post(self, request, *args, **kwargs):
        item_type_id = request.data.get('item_type_id')
        manufacturer = request.data.get('manufacturer')
        brand = request.data.get('brand')
        description = request.data.get('description')
        is_rentable = request.data.get('is_rentable')
        is_available = request.data.get('is_rentable')
        serial_number = request.data.get('serial_number')
        item_id = Items.objects.create(item_type_id=item_type_id,
                            manufacturer=manufacturer,
                            brand=brand,
                            description=description,
                            is_rentable=is_rentable,
                            is_rented=False,
                            is_on_rig=False)
        Containers.objects.create(item_id=item_id,
                                serial_number=serial_number)
        data = {'success': True}
        return JsonResponse(data=data, status=status.HTTP_202_ACCEPTED)

class ContainerDetail(generics.RetrieveUpdateDestroyAPIView, LoginRequiredMixin):

    def patch(self, request, *args, **kwargs):
        item_id = self.kwargs.get('pk')
        item = Items.objects.get(item_id=item_id)
        container = Containers.objects.get(item_id=item_id)

        serializer = ItemSerializer(item, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        new_instance = serializer.save()

        serializer = ContainerSerializer(container, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        new_instance = serializer.save()
        return JsonResponse(data=serializer.data, status=status.HTTP_202_ACCEPTED)
        
        

class DropzoneList(generics.ListCreateAPIView, LoginRequiredMixin):
    queryset = Dropzones.objects.all()
    serializer_class = DropZoneSerializer


class DropzoneDetail(generics.RetrieveUpdateDestroyAPIView, LoginRequiredMixin):
    queryset = Dropzones.objects.all()
    serializer_class = DropZoneSerializer


class EmployeeEmployeeRoleList(generics.ListCreateAPIView, LoginRequiredMixin):
    queryset = EmployeesEmployeeRoles.objects.all()
    serializer_class = EmployeeEmployeeRoleSerializer


class EmployeeEmployeeRoleDetail(generics.RetrieveUpdateDestroyAPIView, LoginRequiredMixin):
    queryset = EmployeesEmployeeRoles.objects.all()
    serializer_class = EmployeeEmployeeRoleSerializer


class EmployeeList(generics.ListCreateAPIView, LoginRequiredMixin):
    queryset = Employees.objects.all()
    serializer_class = EmployeeSerializer


class EmployeeDetail(generics.RetrieveUpdateDestroyAPIView, LoginRequiredMixin):
    queryset = Employees.objects.all()
    serializer_class = EmployeeSerializer


class ItemList(generics.ListCreateAPIView, LoginRequiredMixin):
    queryset = Items.objects.all()
    serializer_class = ItemSerializer


class ItemDetail(generics.RetrieveUpdateDestroyAPIView, LoginRequiredMixin):
    queryset = Items.objects.all()
    serializer_class = ItemSerializer


class ItemTypeList(generics.ListCreateAPIView, LoginRequiredMixin):
    queryset = ItemTypes.objects.all()
    serializer_class = ItemTypeSerializer


class ItemTypeDetail(generics.RetrieveUpdateDestroyAPIView, LoginRequiredMixin):
    queryset = ItemTypes.objects.all()
    serializer_class = ItemTypeSerializer


class RentableItemList(generics.ListCreateAPIView, LoginRequiredMixin):
    queryset = AllItems.objects.all().filter(is_rentable=1)
    serializer_class = AllItemSerializer


class RentalList(generics.ListCreateAPIView, LoginRequiredMixin):
    queryset = Rentals.objects.all()
    serializer_class = RentalSerializer

    def post(self, request, *args, **kwargs):
        item = Items.objects.get(item_id=request.data.get('item_id'))
        item_id = item.item_id

        rental_id = post_rental(request)

        post_item_rental(item_id, rental_id)

        ret_data = {'item_id': item_id, 'rental_id': rental_id}
        return JsonResponse(data=ret_data, status=status.HTTP_201_CREATED)

class RentalDetail(generics.RetrieveUpdateDestroyAPIView, LoginRequiredMixin):
    queryset = Rentals.objects.all()
    serializer_class = RentalSerializer

class ActiveRentalList(generics.ListAPIView, LoginRequiredMixin):
    queryset = Rentals.objects.all().filter(returned_date=None)
    serializer_class = RentalSerializer

class ReserveCanopyList(generics.ListCreateAPIView, LoginRequiredMixin):
    queryset = ReserveCanopies.objects.all()
    serializer_class = ReserveCanopySerializer

    def post(self, request, *args, **kwargs):
        item_type_id = request.data.get('item_type_id')
        manufacturer = request.data.get('manufacturer')
        brand = request.data.get('brand')
        description = request.data.get('description')
        is_rentable = request.data.get('is_rentable')
        is_available = request.data.get('is_rentable')
        serial_number = request.data.get('serial_number')
        size = request.data.get('size')
        date_of_manufacture = request.data.get('date_of_manufacture')
        item_id = Items.objects.create(item_type_id=item_type_id,
                            manufacturer=manufacturer,
                            brand=brand,
                            description=description,
                            is_rentable=is_rentable,
                            is_rented=False,
                            is_on_rig=False)
        Canopies.objects.create(item_id=item_id,
                                rig_id=None,
                                serial_number=serial_number,
                                size=size,
                                date_of_manufacture=date_of_manufacture,
                                jump_count=0)
        ReserveCanopies.objects.create(item_id=item_id,
                                        last_repack_date=None,
                                        next_repack_date=None,
                                        packed_by_employee_id=None,
                                        ride_count=0)
        data = {'success': True}
        return JsonResponse(data=data, status=status.HTTP_202_ACCEPTED)

class ReserveCanopyDetail(generics.RetrieveUpdateDestroyAPIView, LoginRequiredMixin):
    queryset = ReserveCanopies.objects.all()
    serializer_class = ReserveCanopySerializer
    
    def patch(self, request, *args, **kwargs):
        item_id = self.kwargs.get('pk')
        item = Items.objects.get(item_id=item_id)
        canopy = Canopies.objects.get(item_id=item_id)
        reserve = ReserveCanopies.objects.get(item_id=item_id)

        serializer = ItemSerializer(item, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        new_instance = serializer.save()

        serializer = CanopySerializer(canopy, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        new_instance = serializer.save()

        serializer = ReserveCanopySerializer(reserve, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        new_instance = serializer.save()
        return JsonResponse(data=serializer.data, status=status.HTTP_202_ACCEPTED)

class RigList(generics.ListCreateAPIView, LoginRequiredMixin):
    queryset = Rigs.objects.all()
    serializer_class = RigSerializer


class AvailableStudentRigList(generics.ListAPIView, LoginRequiredMixin):
    queryset = Rigs.objects.all().filter(istandem=0)
    serializer_class = RigSerializer


class AvailableTandemRigList(generics.ListAPIView, LoginRequiredMixin):
    queryset = Rigs.objects.all().filter(istandem=1)
    serializer_class = RigSerializer


class RigDetail(generics.RetrieveUpdateDestroyAPIView, LoginRequiredMixin):
    queryset = Rigs.objects.all()
    serializer_class = RigSerializer


class RigAuditTrailList(generics.ListCreateAPIView, LoginRequiredMixin):
    queryset = RigsAuditTrail.objects.all()
    serializer_class = RigAuditTrailSerializer


class RigAuditTrailDetail(generics.RetrieveUpdateDestroyAPIView, LoginRequiredMixin):
    queryset = RigsAuditTrail.objects.all()
    serializer_class = RigAuditTrailSerializer


class RigComponentDetailList(generics.ListAPIView, LoginRequiredMixin):
    queryset = RigComponentDetails.objects.all()
    serializer_class = RigComponentDetailSerializer


class ClaimList(generics.ListCreateAPIView, LoginRequiredMixin):
    queryset = Claims.objects.all()
    serializer_class = ClaimSerializer

class ClaimWarningList(generics.ListCreateAPIView, LoginRequiredMixin):
    queryset = Claims.objects.filter(status=Claims.PENDING)
    serializer_class = ClaimSerializer

class ClaimQueueList(generics.ListCreateAPIView, LoginRequiredMixin):
    queryset = Claims.objects.filter(status=Claims.IN_PROGRESS)
    serializer_class = ClaimSerializer

class ClaimDetail(generics.RetrieveUpdateDestroyAPIView, LoginRequiredMixin):
    queryset = Claims.objects.all()
    serializer_class = ClaimSerializer

class PendingClaimList(generics.ListCreateAPIView, LoginRequiredMixin):
    queryset = Claims.objects.all().filter(status='Pending')
    serializer_class = ClaimSerializer


class InProgressClaimList(generics.RetrieveUpdateDestroyAPIView, LoginRequiredMixin):
    queryset = Claims.objects.all().filter(status='In-Progress')
    serializer_class = ClaimSerializer


class SignoutList(generics.ListCreateAPIView, LoginRequiredMixin):
    queryset = Signouts.objects.all()
    serializer_class = SignoutSerializer


class SignoutDetail(generics.RetrieveUpdateDestroyAPIView, LoginRequiredMixin):
    queryset = Signouts.objects.all()
    serializer_class = SignoutSerializer


class AllCanopyList(generics.ListCreateAPIView, LoginRequiredMixin):
    queryset = AllCanopies.objects.all()
    serializer_class = AllCanopySerializer


class AllCanopyDetail(generics.RetrieveUpdateDestroyAPIView, LoginRequiredMixin):
    queryset = AllCanopies.objects.all()
    serializer_class = AllCanopySerializer


class AllItemList(generics.ListCreateAPIView, LoginRequiredMixin):
    queryset = AllItems.objects.all()
    serializer_class = AllItemSerializer


class AllItemDetail(generics.RetrieveUpdateDestroyAPIView, LoginRequiredMixin):
    queryset = AllItems.objects.all()
    serializer_class = AllItemSerializer


class EmployeeVsSignoutList(generics.ListAPIView, LoginRequiredMixin):
    queryset = EmployeesVsSignouts.objects.all()
    serializer_class = EmployeeVsSignoutSerializer


class EmployeeVsSignoutDetail(generics.RetrieveUpdateDestroyAPIView, LoginRequiredMixin):
    queryset = EmployeesVsSignouts.objects.all()
    serializer_class = EmployeeVsSignoutSerializer


class EmployeeVsSignoutStudentList(generics.ListCreateAPIView, LoginRequiredMixin):
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

class EmployeeVsSignoutStudentDetail(generics.RetrieveUpdateDestroyAPIView, LoginRequiredMixin):
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


class EmployeeVsSignoutTandemList(generics.ListCreateAPIView, LoginRequiredMixin):
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


class EmployeeVsSignoutTandemDetail(generics.RetrieveUpdateDestroyAPIView, LoginRequiredMixin):
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

def post_rental(request):
    renter_name = request.data.get('renter_name')

    Rentals.objects.create(renter_name=renter_name, rental_date=datetime.datetime.now())

    rental_id_dict = Rentals.objects.values().get(rental_id=
                                                    Rentals.objects.latest('rental_id')
                                                    .serializable_value('rental_id'))
    rental_id = rental_id_dict.get("rental_id", "")
    return rental_id

def post_item_rental(item_id, rental_id):
    ItemsRentals.objects.create(item_id=item_id,
                                     rental_id=rental_id)
    return

def patch_emp_signout(employee_id, signout_id):
    EmployeesSignouts.objects.create(signout_id=signout_id,
                                     employee_id=employee_id,
                                     packed_signout=EmployeesSignouts.PACKED,
                                     timestamp=datetime.datetime.now())
    return

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
        if email or password or location or username is None:
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


@login_required()
def logoutDropzone(request):
    logout(request)
    return HttpResponse(status=status.HTTP_202_ACCEPTED)


@login_required()
def EmployeeView(request, dropzonePK):

    if request.method == 'GET':

        dropzone = Dropzones.objects.get(dropzonePK)
        employees = Employees.objects.filter(dropzone)
        employeeSerializer = EmployeeSerializer()
        emp = employeeSerializer.data(data=employees)
        return JsonResponse(data=emp, status=status.HTTP_202_ACCEPTED)

    elif request.method == 'POST':

        try:
            dropzone = Dropzones.objects.get(dropzonePK)
            first = request.POST['first_name']
            last = request.POST['last_name']
            email = request.POST['email']
            role = request.POST['role']
            dev = request.POST['dev']
            if Employees.employee_email_in_use(email) is not None:
                emp = Employees(first_name=first, last_name=last, email=email, dropzone=dropzone)
                if dev is True or None:
                    emp.pin = pin = Employees.create_random_user_pin(emp.pk)
                else:
                    emp.pin = Employees.pin_to_hash(Employees.create_random_user_pin(emp.pk))
                emp.roles = role
                emp.save()
                serializer = EmployeeSerializer(emp)
                send_mail(
                    subject=util.employeePinTo(),
                    message=util.createPinResetMessage(pin),
                    from_email=util.fromEmailString(),
                    recipient_list=[emp.email],
                    fail_silently=False
                )
                return JsonResponse(data= serializer.data ,status=201)
            else :
                return HttpResponse(status=status.HTTP_400_BAD_REQUEST)
        except:
            return HttpResponse(status=status.HTTP_204_NO_CONTENT)



# authenticate an employee based on their pin and return an http status if the user is authentic
@login_required()
def authenticateUserPin(request):
    if request.method == 'POST':

        # the way our pin works sets the user primary as their last 3 digits
        try:
            pin = request.POST['pin']

            if pin is None:
                return HttpResponse(status=status.HTTP_204_NO_CONTENT)
            else:
                try:
                    pk = int(pin[4:])
                    employee = Employees.objects.get(pk)
                    if employee is None:
                        return HttpResponse(status=status.HTTP_400_BAD_REQUEST)
                    else:
                        if Employees.check_employee_pin(pin, employee) :
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
        if dropzone is None:
            return HttpResponse(status=status.HTTP_204_NO_CONTENT)
        else:
            serializer = DropZoneSerializer(dropzone)
            return JsonResponse(data=serializer.data, status=200)

def password_reset_dropzone(request):
    email = None
    try:
        email = request.POST['email']
    except:
        return HttpResponse(status=status.HTTP_204_NO_CONTENT)

    if email is None:
        return HttpResponse(status=status.HTTP_204_NO_CONTENT)
    else:
        try:
            dropzone = Dropzones.dropzoneEmailInUse(email)
            hashs = util.createHash(email)
            temp = TempUrl.objects.create(hashs,datetime.date.today() + datetime.timedelta(days=1))
            Dropzones.email_user(dropzone,
                                 subject=util.dropzoneHQPasswordResetTo(),
                                 message=util.createPasswordResetMessage(temp.get_url_hash()),
                                 from_email=util.fromEmailString())
        except:
            return HttpResponse(status=status.HTTP_400_BAD_REQUEST)



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

def reset_url_dropzone(request, hash=None):
    try:
        reset = TempUrl.objects.get(hash)
        if reset is not None :
            dropzone = reset.dropzone
            Dropzones.set_password(dropzone, request.POST['password'])
            Dropzones.save(dropzone)
            return HttpResponse(status=status.HTTP_202_ACCEPTED)
        else :
            return HttpResponse(status=status.HTTP_400_BAD_REQUEST)
    except:
        return HttpResponse(status=status.HTTP_400_BAD_REQUEST)