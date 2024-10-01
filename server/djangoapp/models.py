# Import necessary Django modules
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.utils.timezone import now

# Create your models here.

class CarMake(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    
    def __str__(self):
        return self.name  # Return the name as the string representation

class CarModel(models.Model):
    car_make = models.ForeignKey(CarMake, on_delete=models.CASCADE)  # Many-to-One relationship
    name = models.CharField(max_length=100)
    CAR_TYPES = [
        ('SEDAN', 'Sedan'),
        ('SUV', 'SUV'),
        ('WAGON', 'Wagon'),
        # Add more choices as required
    ]
    type = models.CharField(max_length=10, choices=CAR_TYPES, default='SUV')
    year = models.IntegerField(
        default=2023,
        validators=[
            MaxValueValidator(2023),
            MinValueValidator(2015)
        ]
    )
    
    def __str__(self):
        return f"{self.car_make.name} {self.name}"  # Return the car make and model as string representation

class Review(models.Model):
    car_model = models.ForeignKey(CarModel, on_delete=models.CASCADE)  # Many-to-One relationship with CarModel
    name = models.CharField(max_length=100)  # Name of the reviewer
    review = models.TextField()  # Review content
    rating = models.IntegerField(
        validators=[
            MaxValueValidator(5),
            MinValueValidator(1)
        ]
    )  # Rating out of 5
    created_at = models.DateTimeField(default=now)  # When the review was created

    def __str__(self):
        return f"Review by {self.name} for {self.car_model.name}"  # Return a meaningful string representation
