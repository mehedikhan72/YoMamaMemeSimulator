from django.shortcuts import get_object_or_404
from rest_framework import generics
from .models import Joke
from .serializers import JokeSerializer

class JokeDetail(generics.RetrieveAPIView):
    queryset = Joke.objects.all()
    serializer_class = JokeSerializer

    def get_object(self):
        queryset = self.get_queryset()
        obj = get_object_or_404(queryset, pk=self.kwargs['pk'])
        return obj
