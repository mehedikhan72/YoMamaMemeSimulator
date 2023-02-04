from django.db import models

# Create your models here.

class Joke(models.Model):
    type=models.CharField(max_length=64)
    top_text=models.CharField(max_length=1024)
    bottom_text=models.CharField(max_length=1024)

    def __str__(self):
        return self.top_text + self.bottom_text