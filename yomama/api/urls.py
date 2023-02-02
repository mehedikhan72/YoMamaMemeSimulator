from django.urls import path
from .views import JokeDetail

urlpatterns = [
    path('joke/<int:pk>/', JokeDetail.as_view(), name='joke_detail'),
]