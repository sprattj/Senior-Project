from rest_framework import generics, status
from django.http import JsonResponse
from .serializers import *
import datetime


class ActionList(generics.ListCreateAPIView):
    queryset = Actions.objects.all()
    serializer_class = ActionSerializer


class ActionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Actions.objects.all()
    serializer_class = ActionSerializer


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


class ClaimDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Claims.objects.all()
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


class EmployeeVsSignoutDetail(generics.RetrieveAPIView):
    queryset = EmployeesVsSignouts.objects.all()
    serializer_class = EmployeeVsSignoutSerializer


class EmployeeVsSignoutStudentList(generics.ListCreateAPIView):
    queryset = EmployeesVsSignoutsStudent.objects.all()
    serializer_class = EmployeeVsSignoutSerializer

    def post(self, request, *args, **kwargs):

        employee_id = request.data.get('jumpmaster_id')
        jumpmaster = get_emp_full_name(employee_id)

        post_signout(request)
        post_emp_signout(employee_id)
        ret_data = {'jumpmaster': jumpmaster, 'jumpmaster_id': employee_id}
        return JsonResponse(data=ret_data, status=status.HTTP_201_CREATED)


class EmployeeVsSignoutStudentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = EmployeesVsSignoutsStudent.objects.all()
    serializer_class = EmployeeVsSignoutSerializer

    def patch(self, request, *args, **kwargs):
        employee_id = request.data.get('packer_id')
        signout_id = request.data.get('signout_id')
        patch_emp_signout(employee_id, signout_id)

        packed_by = get_emp_full_name(employee_id)
        data = {'packer_id': employee_id, 'packed_by': packed_by}
        return JsonResponse(data=data, status=status.HTTP_202_ACCEPTED)


class EmployeeVsSignoutTandemList(generics.ListCreateAPIView):
    queryset = EmployeesVsSignoutsTandem.objects.all()
    serializer_class = EmployeeVsSignoutSerializer

    def post(self, request, *args, **kwargs):

        employee_id = request.data.get('jumpmaster_id')
        jumpmaster = get_emp_full_name(employee_id)

        post_signout(request)
        post_emp_signout(employee_id)
        ret_data = {'jumpmaster': jumpmaster, 'jumpmaster_id': employee_id}
        return JsonResponse(data=ret_data, status=status.HTTP_201_CREATED)


class EmployeeVsSignoutTandemDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = EmployeesVsSignoutsTandem.objects.all()
    serializer_class = EmployeeVsSignoutSerializer

    def patch(self, request, *args, **kwargs):
        employee_id = request.data.get('packer_id')
        signout_id = request.data.get('signout_id')

        patch_emp_signout(employee_id, signout_id)

        packed_by = get_emp_full_name(employee_id)
        data = {'packer_id': employee_id, 'packed_by': packed_by}
        return JsonResponse(data=data, status=status.HTTP_202_ACCEPTED)


def post_signout(request):
    rig_id = request.data.get('rig_id')
    load_number = request.data.get('load_number')

    Signouts.objects.create(rig_id=rig_id, load_number=load_number)
    return


def post_emp_signout(employee_id):
    signout_id_dict = Signouts.objects.values().get(signout_id=
                                                    Signouts.objects.latest('signout_id')
                                                    .serializable_value('signout_id'))
    signout_id = signout_id_dict.get("signout_id", "")

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
    return


def get_emp_full_name(employee_id):
    emp_name = Employees.objects.get(employee_id=employee_id).first_name + ' ' + \
        Employees.objects.get(employee_id=employee_id).last_name
    return emp_name
