from django.contrib import admin
from .models import CarMake, CarModel

# Register your models here.
admin.site.register(CarMake)
admin.site.register(CarModel)

# Optional: You can define inline classes if needed.
# Example:
# class CarModelInline(admin.TabularInline):
#     model = CarModel
#     extra = 1

# class CarMakeAdmin(admin.ModelAdmin):
#     inlines = [CarModelInline]

# admin.site.register(CarMake, CarMakeAdmin)
