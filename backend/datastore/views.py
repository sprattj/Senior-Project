from rest_framework import generics, status
from django.http import JsonResponse, HttpResponse
from .serializers import *
from . import util
from backend.datastore.models import *
from backend.datastore import mixin
from django.contrib.auth import login, logout, authenticate
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views import View
import datetime



class AADList(LoginRequiredMixin, mixin.RoleArrayCookieRequiredMixin, generics.ListCreateAPIView):
    queryset = AutomaticActivationDevices.objects.all()
    serializer_class = AADSerializer
    role = ['admin', 'loft_head', 'loft']

    def post(self, request, *args, **kwargs):
        item_type_id = request.data.get('item_type_id')
        manufacturer = request.data.get('manufacturer')
        brand = request.data.get('brand')
        description = request.data.get('description')
        is_rentable = request.data.get('is_rentable')
        is_available = request.data.get('is_rentable')
        serial_number = request.data.get('serial_number')
        lifespan = request.data.get('lifespan')
        item = Items.objects.create(item_type_id=item_type_id,
                            manufacturer=manufacturer,
                            brand=brand,
                            description=description,
                            is_rentable=is_rentable,
                            is_available=is_available,
                            is_on_rig=False)
        item_id = item.item_id
        #TODO take deployment timestamp as a value?
        AutomaticActivationDevices.objects.create(item_id=item_id,
                                deployment_timestamp=datetime.datetime.now(),
                                lifespan=lifespan,
                                serial_number=serial_number)
        data = {'item_id': item_id, 'success': True}
        return JsonResponse(data=data, status=status.HTTP_202_ACCEPTED)


class AADDetail(LoginRequiredMixin, mixin.RoleArrayCookieRequiredMixin, generics.RetrieveUpdateDestroyAPIView):
    queryset = AutomaticActivationDevices.objects.all()
    serializer_class = AADSerializer
    role = ['admin', 'loft_head', 'loft']

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


class CanopyList(LoginRequiredMixin, mixin.RoleArrayCookieRequiredMixin, generics.ListCreateAPIView):
    queryset = Canopies.objects.all()
    serializer_class = CanopySerializer
    role = ['admin', 'loft_head', 'loft']

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
        item = Items.objects.create(item_type_id=item_type_id,
                            manufacturer=manufacturer,
                            brand=brand,
                            description=description,
                            is_rentable=is_rentable,
                            is_available=is_available,
                            is_on_rig=False)
        item_id = item.item_id
        Canopies.objects.create(item_id=item_id,
                                rig_id=None,
                                serial_number=serial_number,
                                size=size,
                                date_of_manufacture=date_of_manufacture,
                                jump_count=0)
        data = {'item_id': item_id, 'success': True}
        return JsonResponse(data=data, status=status.HTTP_202_ACCEPTED)


class CanopyDetail(LoginRequiredMixin, mixin.RoleArrayCookieRequiredMixin, generics.RetrieveUpdateDestroyAPIView):
    queryset = Canopies.objects.all()
    serializer_class = CanopySerializer
    role = ['admin', 'loft_head', 'loft']

    def patch(self, request, *args, **kwargs):
        item_id = self.kwargs.get('pk')
        item = Items.objects.get(item_id=item_id)
        canopy = Canopies.objects.get(item_id=item_id)

        serializer = CanopySerializer(canopy, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        new_instance = serializer.save()

        serializer = ItemSerializer(item, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        new_instance = serializer.save()

        new_instance = serializer.save()
        return JsonResponse(data=serializer.data, status=status.HTTP_202_ACCEPTED)


class ContainerList(LoginRequiredMixin, mixin.RoleArrayCookieRequiredMixin, generics.ListCreateAPIView):
    queryset = Containers.objects.all()
    serializer_class = ContainerSerializer
    role = ['admin', 'loft_head', 'loft']

    def post(self, request, *args, **kwargs):
        item_type_id = request.data.get('item_type_id')
        manufacturer = request.data.get('manufacturer')
        brand = request.data.get('brand')
        description = request.data.get('description')
        is_rentable = request.data.get('is_rentable')
        is_available = request.data.get('is_rentable')
        serial_number = request.data.get('serial_number')
        item = Items.objects.create(item_type_id=item_type_id,
                            manufacturer=manufacturer,
                            brand=brand,
                            description=description,
                            is_rentable=is_rentable,
                            is_available=is_available,
                            is_on_rig=False)
        item_id = item.item_id
        Containers.objects.create(item_id=item_id,
                                serial_number=serial_number)
        data = {'success': True}
        return JsonResponse(data=data, status=status.HTTP_202_ACCEPTED)


class ContainerDetail(LoginRequiredMixin, mixin.RoleArrayCookieRequiredMixin, generics.RetrieveUpdateDestroyAPIView):
    role = ['admin', 'loft_head', 'loft']

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
        

class DropzoneList(LoginRequiredMixin, generics.ListCreateAPIView):
    queryset = Dropzones.objects.all()
    serializer_class = DropZoneSerializer


class DropzoneDetail(LoginRequiredMixin, generics.RetrieveUpdateDestroyAPIView):
    queryset = Dropzones.objects.all()
    serializer_class = DropZoneSerializer


class EmployeeEmployeeRoleList(LoginRequiredMixin, generics.ListCreateAPIView):
    queryset = EmployeesEmployeeRoles.objects.all()
    serializer_class = EmployeeEmployeeRoleSerializer


class EmployeeEmployeeRoleDetail(LoginRequiredMixin, generics.RetrieveUpdateDestroyAPIView):
    queryset = EmployeesEmployeeRoles.objects.all()
    serializer_class = EmployeeEmployeeRoleSerializer


class EmployeeList(LoginRequiredMixin, mixin.RoleArrayCookieRequiredMixin, generics.ListCreateAPIView):
    queryset = Employees.objects.all()
    serializer_class = EmployeeSerializer
    role = ['admin']

    def post(self, request, *args, **kwargs):
        dropzone_id = request.data.get('dropzone_id')
        email = request.data.get('email')
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')
        roles = request.data.get('roles')
        #todo ADD NOT
        if Employees.employee_email_in_use(email):
            emp = Employees.objects.create(first_name=first_name, is_active=True, last_name=last_name, email=email, dropzone_id=dropzone_id)
            emp_id = emp.employee_id
            pin = Employees.create_random_user_pin(emp_id)
            emp.pin = Employees.pin_to_hash(pin)
            if roles is not None:
                for role in roles:
                    exsisting_role = EmployeeRoles.objects.filter(role=role).first()
                    if not exsisting_role:
                        exsisting_role = EmployeeRoles.objects.create(role=role)
                        exsisting_role.save()
                    emperole = EmployeesEmployeeRoles.objects.create(employee=emp, role=exsisting_role)
                    emperole.save()
                    emp.save()
            data = {'pin': pin}

            serializer = EmployeeSerializer(emp, data=data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()

            mail = util.MailClient()
            mail.send_mail(recipient=emp.email,
                           subject='DropzoneHQ Employee Pin [NO REPLY]',
                           body='Your new employee pin is ' + pin)
            data = {'success': True}
            return JsonResponse(data, status=status.HTTP_202_ACCEPTED)


class EmployeeDetail(LoginRequiredMixin, mixin.RoleArrayCookieRequiredMixin, generics.RetrieveUpdateDestroyAPIView):
    queryset = Employees.objects.all()
    serializer_class = EmployeeSerializer
    role = ['admin']


class ItemList(LoginRequiredMixin, generics.ListCreateAPIView):
    queryset = Items.objects.all()
    serializer_class = ItemSerializer


class ItemDetail(LoginRequiredMixin, generics.RetrieveUpdateDestroyAPIView):
    queryset = Items.objects.all()
    serializer_class = ItemSerializer


class ItemTypeList(LoginRequiredMixin, generics.ListCreateAPIView):
    queryset = ItemTypes.objects.all()
    serializer_class = ItemTypeSerializer


class ItemTypeDetail(LoginRequiredMixin, generics.RetrieveUpdateDestroyAPIView):
    queryset = ItemTypes.objects.all()
    serializer_class = ItemTypeSerializer


class RentableItemList(LoginRequiredMixin, generics.ListCreateAPIView):
    queryset = AllItems.objects.all().filter(is_rentable=1)
    serializer_class = AllItemSerializer


class RentalList(LoginRequiredMixin, generics.ListCreateAPIView):
    queryset = Rentals.objects.all()
    serializer_class = RentalSerializer

    def post(self, request, *args, **kwargs):
        """
        print(request.data.get('item')[0])
        """
        item = Items.objects.get(item_id=request.data.get('item_id'))
        item_id = item.item_id

        # employee = Employees.objects.get(employee_id=request.data.get('employee')[0])
        # employee_id = employee.employee_id

        rental_id = post_rental(request)
        # post_employee_rental(employee_id, rental_id)
        post_item_rental(item_id, rental_id)
        ret_data = {'item_id': item_id, 'rental_id': rental_id}
        return JsonResponse(data=ret_data, status=status.HTTP_201_CREATED)


class RentalDetail(LoginRequiredMixin, generics.RetrieveUpdateDestroyAPIView):
    queryset = Rentals.objects.all()
    serializer_class = RentalSerializer


class ActiveRentalList(LoginRequiredMixin, generics.ListAPIView):
    queryset = Rentals.objects.all().filter(returned_date=None)
    serializer_class = RentalSerializer


class ReserveCanopyList(LoginRequiredMixin, mixin.RoleArrayCookieRequiredMixin, generics.ListCreateAPIView):
    queryset = ReserveCanopies.objects.all()
    serializer_class = ReserveCanopySerializer
    role = ['admin', 'loft_head', 'loft']

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


class ReserveCanopyDetail(LoginRequiredMixin, mixin.RoleArrayCookieRequiredMixin, generics.RetrieveUpdateDestroyAPIView):
    queryset = ReserveCanopies.objects.all()
    serializer_class = ReserveCanopySerializer
    role = ['admin', 'loft_head', 'loft']
    
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


class RigList(LoginRequiredMixin, generics.ListCreateAPIView):
    queryset = Rigs.objects.all()
    serializer_class = RigSerializer


class AvailableStudentRigList(LoginRequiredMixin, generics.ListAPIView):
    queryset = Rigs.objects.all().filter(istandem=0)
    serializer_class = RigSerializer


class AvailableTandemRigList(LoginRequiredMixin, generics.ListAPIView):
    queryset = Rigs.objects.all().filter(istandem=1)
    serializer_class = RigSerializer


class RigDetail(LoginRequiredMixin, generics.RetrieveUpdateDestroyAPIView):
    queryset = Rigs.objects.all()
    serializer_class = RigSerializer


class RigAuditTrailList(LoginRequiredMixin, generics.ListCreateAPIView):
    queryset = RigsAuditTrail.objects.all()
    serializer_class = RigAuditTrailSerializer


class RigAuditTrailDetail(LoginRequiredMixin, generics.RetrieveUpdateDestroyAPIView):
    queryset = RigsAuditTrail.objects.all()
    serializer_class = RigAuditTrailSerializer


class RigComponentDetailList(LoginRequiredMixin, generics.ListAPIView):
    queryset = RigComponentDetails.objects.all()
    serializer_class = RigComponentDetailSerializer


class ClaimList(LoginRequiredMixin, mixin.RoleArrayCookieRequiredMixin, generics.ListCreateAPIView):
    queryset = Claims.objects.all()
    serializer_class = ClaimSerializer
    role = ['admin', 'loft_head', 'loft']


class ClaimWarningList(LoginRequiredMixin, mixin.RoleArrayCookieRequiredMixin, generics.ListCreateAPIView):
    queryset = Claims.objects.filter(status=Claims.PENDING)
    serializer_class = ClaimSerializer
    role = ['admin', 'loft_head', 'loft']


class ClaimQueueList(LoginRequiredMixin, mixin.RoleArrayCookieRequiredMixin, generics.ListCreateAPIView):
    queryset = Claims.objects.filter(status=Claims.IN_PROGRESS)
    serializer_class = ClaimSerializer
    role = ['admin', 'loft_head', 'loft']


class ClaimDetail(LoginRequiredMixin, mixin.RoleArrayCookieRequiredMixin, generics.RetrieveUpdateDestroyAPIView):
    queryset = Claims.objects.all()
    serializer_class = ClaimSerializer
    role = ['admin', 'loft_head', 'loft']

class PendingClaimList(LoginRequiredMixin, mixin.RoleArrayCookieRequiredMixin, generics.ListCreateAPIView):
    queryset = Claims.objects.all().filter(status='Pending')
    serializer_class = ClaimSerializer
    role = ['admin', 'loft_head', 'loft']


class InProgressClaimList(LoginRequiredMixin, mixin.RoleArrayCookieRequiredMixin, generics.RetrieveUpdateDestroyAPIView):
    queryset = Claims.objects.all().filter(status='In-Progress')
    serializer_class = ClaimSerializer
    role = ['admin', 'loft_head', 'loft']


class SignoutList(LoginRequiredMixin, generics.ListCreateAPIView):
    queryset = Signouts.objects.all()
    serializer_class = SignoutSerializer


class SignoutDetail(LoginRequiredMixin, generics.RetrieveUpdateDestroyAPIView):
    queryset = Signouts.objects.all()
    serializer_class = SignoutSerializer


class AllCanopyList(LoginRequiredMixin, generics.ListCreateAPIView):
    queryset = AllCanopies.objects.all()
    serializer_class = AllCanopySerializer


class AllCanopyDetail(LoginRequiredMixin, generics.RetrieveUpdateDestroyAPIView):
    queryset = AllCanopies.objects.all()
    serializer_class = AllCanopySerializer


class AllItemList(LoginRequiredMixin, generics.ListCreateAPIView):
    queryset = AllItems.objects.all()
    serializer_class = AllItemSerializer


class AllItemDetail(LoginRequiredMixin, generics.RetrieveUpdateDestroyAPIView):
    queryset = AllItems.objects.all()
    serializer_class = AllItemSerializer


class EmployeeVsSignoutList(LoginRequiredMixin, generics.ListAPIView):
    queryset = EmployeesVsSignouts.objects.all()
    serializer_class = EmployeeVsSignoutSerializer


class EmployeeVsSignoutDetail(LoginRequiredMixin, generics.RetrieveUpdateDestroyAPIView):
    queryset = EmployeesVsSignouts.objects.all()
    serializer_class = EmployeeVsSignoutSerializer


class EmployeeVsSignoutStudentList(LoginRequiredMixin, generics.ListCreateAPIView):
    queryset = EmployeesVsSignoutsStudent.objects.all()
    serializer_class = EmployeeVsSignoutSerializer

    def post(self, request, *args, **kwargs):
        employee = Employees.objects.get(pin=request.data.get('pin'))
        if Employees.check_employee_role(employee, 'instructor'):
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
        else:
            data = {'success': False}
            return JsonResponse(data=data, status=status.HTTP_400_BAD_REQUEST)


class EmployeeVsSignoutStudentDetail(LoginRequiredMixin, generics.RetrieveUpdateDestroyAPIView):
    queryset = EmployeesVsSignoutsStudent.objects.all()
    serializer_class = EmployeeVsSignoutSerializer

    def patch(self, request, *args, **kwargs):
        # employee = Employees.employee_pin_in_use(request.data.get('pin'))
        employee = Employees.objects.get(pin=request.data.get('pin'))
        if Employees.check_employee_role(employee,'packer'):
            signout_id = self.kwargs.get('pk')
            employee_id = employee.employee_id
            patch_emp_signout(employee_id, signout_id)

            packed_by = get_emp_full_name(employee_id)
            data = {'packer_id': employee_id, 'packed_by': packed_by}
            return JsonResponse(data=data, status=status.HTTP_202_ACCEPTED)
        else:
            data = {'success': False}
            return JsonResponse(data=data, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        signout_id = self.kwargs.get('pk')
        # Destroy all EmployeeSignout records related to signout_id
        EmployeesSignouts.objects.filter(signout_id=signout_id).delete()
        # Destroy Signout record
        Signouts.objects.filter(signout_id=signout_id).delete()
        data = {'signout_id': signout_id}
        return JsonResponse(data=data, status=status.HTTP_204_NO_CONTENT)


class EmployeeVsSignoutTandemList(LoginRequiredMixin, generics.ListCreateAPIView):
    queryset = EmployeesVsSignoutsTandem.objects.all()
    serializer_class = EmployeeVsSignoutSerializer

    def post(self, request, *args, **kwargs):
        employee = Employees.objects.get(pin=request.data.get('pin'))
        if Employees.check_employee_role(employee, 'instructor'):
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
        else:
            data = {'success': False}
            return JsonResponse(data=data, status=status.HTTP_400_BAD_REQUEST)


class EmployeeVsSignoutTandemDetail(LoginRequiredMixin, generics.RetrieveUpdateDestroyAPIView):
    queryset = EmployeesVsSignoutsTandem.objects.all()
    serializer_class = EmployeeVsSignoutSerializer

    def patch(self, request, *args, **kwargs):
        # employee = Employees.employee_pin_in_use(request.data.get('pin'))
        employee = Employees.objects.get(pin=request.data.get('pin'))
        if Employees.check_employee_role(employee, 'packer'):
            signout_id = self.kwargs.get('pk')
            employee_id = employee.employee_id

            patch_emp_signout(employee_id, signout_id)

            packed_by = get_emp_full_name(employee_id)
            data = {'packer_id': employee_id, 'packed_by': packed_by}
            return JsonResponse(data=data, status=status.HTTP_202_ACCEPTED)
        else:
            data = {'success': False}
            return JsonResponse(data=data, status=status.HTTP_400_BAD_REQUEST)


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


def post_employee_rental(employee_id, rental_id):
    EmployeesRentals.objects.create(employee_id=employee_id,
                                    rental_id=rental_id)
    return


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


class DropzoneCreate(generics.ListCreateAPIView):
    queryset = Dropzones.objects.all()
    serializer_class = DropZoneSerializer

    def post(seld, request, *args, **kwargs):
        try:
            password = request.data.get['password']
            email = request.data.get['email']
            username = request.data.get['username']
            if email or password is None:
                return HttpResponse(status=status.HTTP_204_NO_CONTENT)
            else:
                try:
                    user = User.objects.create_user(username=username, email=email, password=password)
                    dropzone = Dropzones.objects.create_user()
                    dropzone.save()
                except:
                    return HttpResponse(status=status.HTTP_400_BAD_REQUEST)
                data = {'success': True}
                return JsonResponse(data=data, status=status.HTTP_201_CREATED)
        except:
            return HttpResponse(status=status.HTTP_400_BAD_REQUEST)


# authenticate an employee based on their pin and return an http status if the user is authentic
class AuthenticateEmployeePin(LoginRequiredMixin, View):

    #check pin return cookie
    def post(self, request, *args, **kwargs):
        pin = request.data.get('pin')
        employee = Employees.objects.filter(Employees.pin_to_hash(pin))
        if employee.exists():
            request.session['pin'] = pin
            return HttpResponse(status=status.HTTP_202_ACCEPTED)
        else:
            return HttpResponse(status=status.HTTP_400_BAD_REQUEST)

'''
# return a user object if the username is found
# else return None
def authenticateNameDropzone(request):
    name = request.data.get['name']
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
        email = request.data.get['email']
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
'''

@method_decorator(csrf_exempt, name='dispatch')
class LoginDropzone(View):

    def post(self, request):
        try:
            username = request.data.get('username')
            password = request.data.get('password')
            dropzone = authenticate(request=request, username=username, password=password)
            if dropzone is None:
                return HttpResponse(status=status.HTTP_400_BAD_REQUEST)
            else:
                login(request, user=dropzone)
                return HttpResponse(status=status.HTTP_202_ACCEPTED)
        except:
            return HttpResponse(status=status.HTTP_204_NO_CONTENT)

class LogoutDropzone(View):

    def post(self, request):
        logout(request)
        return HttpResponse(status=status.HTTP_202_ACCEPTED)


class PasswordResetEmployee(LoginRequiredMixin, View):

    def post(self, request):
        email = None
        try:
            email = request.data.get('email')
        except:
            return HttpResponse(status=status.HTTP_204_NO_CONTENT)
        if email is None:
            return HttpResponse(status=status.HTTP_204_NO_CONTENT)
        else:
            employee = Employees.employee_email_in_use(email)
            pin = Employees.create_random_user_pin(employee)
            employee.pin = Employees.pin_to_hash(pin)
            util.createPinResetMessage(employee.pin)
            mail = util.MailClient
            mail.send_mail(
                subject='DropzoneHQ Employee Pin [NO REPLY]',
                body='Your new employee pin is ' + employee.pin,
                recipient=[employee.email]
            )
            return HttpResponse(status=status.HTTP_202_ACCEPTED)

class CheckSession(View):

    def get(self, request):
        if request.user.is_authenticated():
            return HttpResponse(status=status.HTTP_202_ACCEPTED)
        else:
            return HttpResponse(status=status.HTTP_403_FORBIDDEN)


'''
def reset_url_dropzone(request, hash=None):
    try:
        reset = TempUrl.objects.get(hash)
        if reset is not None:
            dropzone = reset.dropzone
            Dropzones.set_password(dropzone, request.data.get['password'])
            Dropzones.save(dropzone)
            return HttpResponse(status=status.HTTP_202_ACCEPTED)
        else:
            return HttpResponse(status=status.HTTP_400_BAD_REQUEST)
    except:
        return HttpResponse(status=status.HTTP_400_BAD_REQUEST)
'''