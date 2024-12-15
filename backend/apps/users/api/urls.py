from django.urls import path
from apps.users.api.v1 import CheckAuthView
from apps.users.api.v1 import UserDetailView
from apps.users.api.v1 import LoginView
from apps.users.api.v1 import LogoutView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login-url'),
    path('logout/', LogoutView.as_view(), name='logout-url'),
    path('user_detail/', UserDetailView.as_view(), name='user-detail-url'),
    path('check_auth/', CheckAuthView.as_view(), name='check-auth-url'),
]
