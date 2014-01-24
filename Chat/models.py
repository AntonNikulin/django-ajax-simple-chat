from django.db import models

# Create your models here.
class Message(models.Model):
    User = models.CharField(max_length= 25)
    Text = models.CharField(max_length=75)