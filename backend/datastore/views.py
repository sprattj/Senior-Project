from rest_framework import generics
from .serializers import *


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


class ServiceList(generics.ListCreateAPIView):
    queryset = Services.objects.all()
    serializer_class = ServiceSerializer


class ServiceDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Services.objects.all()
    serializer_class = ServiceSerializer


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


class EmployeeVsSignoutList(generics.ListCreateAPIView):
    queryset = EmployeesVsSignouts.objects.all()
    serializer_class = EmployeeVsSignoutSerializer


class EmployeeVsSignoutDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = EmployeesVsSignouts.objects.all()
    serializer_class = EmployeeVsSignoutSerializer


class EmployeeVsSignoutStudentList(generics.ListCreateAPIView):
    queryset = EmployeesVsSignoutsStudent.objects.all()
    serializer_class = EmployeeVsSignoutSerializer


class EmployeeVsSignoutStudentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = EmployeesVsSignoutsStudent.objects.all()
    serializer_class = EmployeeVsSignoutSerializer


class EmployeeVsSignoutTandemList(generics.ListCreateAPIView):
    queryset = EmployeesVsSignoutsTandem.objects.all()
    serializer_class = EmployeeVsSignoutSerializer


class EmployeeVsSignoutTandemDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = EmployeesVsSignoutsTandem.objects.all()
    serializer_class = EmployeeVsSignoutSerializer
