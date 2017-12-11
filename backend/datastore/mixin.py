#File for all custom Mixins

from rest_framework import status
from backend.datastore import models
from django.http import HttpResponse


#Base cookie checker, used for abstraction otherwise not super useful
class CheckCookieMixin(object):

    def check_cookie(self, cookie):
        return True

    @staticmethod
    def cookie_check_failed(self):
        return HttpResponse(status=status.HTTP_403_FORBIDDEN)

    def dispatch(self, request, *args, **kwargs):
        if not self.check_cookie(request.session['pin']):
            return self.cookie_check_failed()
        else:
            return super(CheckCookieMixin, self).dispatch(request)


#useful mixin for checking the role of the user that just submitted
class RoleCookieRequiredMixin(CheckCookieMixin):
    role = None

    def check_cookie(self, cookie):
        if not models.Employees.check_employee_role_based_pin_hash(cookie, self.role):
            return False
        else:
            return True


#check the set of roles given and return get if one of them is correct
class RoleArrayCookieRequiredMixin(RoleCookieRequiredMixin):

    def check_cookie(self, cookie, role):
        if not models.Employees.check_employee_role_based_pin_hash(cookie, role):
            return False
        else:
            return True

    def dispatch(self, request, *args, **kwargs):
        for r in self.role:
            if self.check_cookie(request.session['id'], r):
                return super(RoleArrayCookieRequiredMixin, self).dispatch(request)
        return self.cookie_check_failed()
