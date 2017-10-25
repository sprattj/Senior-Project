# from DropZoneHQ.models import Rigs, Canopies, AllCanopies, AllItems, Items
# from dropZoneHQ.views import RigViewSet
import django
#django.setup()
from backend.datastore.views import *
from rest_framework import request
# print(Canopies.objects.all().values().__str__())
# print(RigViewSet.get_queryset(RigViewSet.serializer_class).values().__str__())
# print(AllCanopies.objects.all().values().__str__())
# print(AllItems.objects.all().values().__str__())

print(EmployeeVsSignoutViewSet().specific_signout(request='GET', pk=4).getvalue().__str__())

"""
signouts = EmployeesVsSignouts.objects.all()
serializer = EmployeeVsSignoutSerializer(signouts, many=True)
print(serializer.data)

'''Get an object'''
item = Items.objects.all().get(item_id=2)
'''Serialize an object'''
serializer = ItemSerializer(item)
'''Render serialized data into JSON'''
content = JSONRenderer().render(serializer.data)
# test json
print(content)
'''Deserialization:
    Convert JSON content into a stream'''
stream = BytesIO(content)
'''Parse the stream into deserialized data'''
data = JSONParser().parse(stream)
# test data
print(data)

serializer = ItemSerializer(data=data)
print(serializer.is_valid())
print(serializer.errors.__str__())  # Empty: No errors
print(serializer.validated_data)
# serializer.save()

serializer = ItemSerializer(Items.objects.all(), many=True)
print(serializer.data)
"""
