from django.urls import path

from apps.photos.api.v1 import BookSessionNSignUpCustomerView
from apps.photos.api.v1 import BookSessionView
from apps.photos.api.v1 import PhotoSessionDetailsView
from apps.photos.api.v1 import PhotoSessionsView
from apps.photos.api.v1 import PaySessionView

urlpatterns = [
    path(
        'photo_sessions/',
        PhotoSessionsView.as_view(),
        name='photo-sessions-url',
    ),
    path(
        'photo_sessions/<int:pk>/',
        PhotoSessionDetailsView.as_view(),
        name='photo-session-details-url',
    ),
    path(
        'book_session_n_sign_up/',
        BookSessionNSignUpCustomerView.as_view(),
        name='book-session-n-sign-up-url',
    ),
    path(
        'book_session/',
        BookSessionView.as_view(),
        name='book-session-url',
    ),
    path(
        'session/<int:session_pk>/pay/',
        PaySessionView.as_view(),
        name='pay-session-url',
    ),
]
