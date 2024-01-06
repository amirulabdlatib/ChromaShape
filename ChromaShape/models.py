from django.db import models

class ChromaShape(models.Model):

    SHAPE_CHOICES = [
        ('circle','Circle'),
        ('square','Square'),
        ('triangle','Triangle')
    ]

    COLOR_CHOICES = [
        ('red','Red'),
        ('blue','Blue'),
        ('green','Green')
    ]

    name = models.CharField(max_length=200)
    shape = models.CharField(max_length=50,choices=SHAPE_CHOICES)
    color = models.CharField(max_length=50,choices=COLOR_CHOICES)
    create_time = models.DateTimeField(auto_now_add=True)
    update_time = models.DateTimeField(auto_now=True)

    def __str__(self):
        return(f'{self.name} added {self.shape} with color {self.color}')