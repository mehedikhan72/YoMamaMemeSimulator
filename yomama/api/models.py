from django.db import models

# Create your models here.

class Joke(models.Model):
    type=models.CharField(max_length=64)
    joke=models.CharField(max_length=1024)