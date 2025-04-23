# abstraction -     hiding the implementation details from the user and only showing the essential feature
# encapsulation -   wrap data and related function into  a single unit(object)
# inheritance   -   when one class(children/derived class) can inherit(derives) the properties of another class(parent/base)
# polymorphism   
# @classmethod
# @staticmethod

#super  is used to access the method of parent class from child class  super()


class Car:
    def __init__ (self, model  ,year):
        self.model = model 
        self.year =  year

    def description(self):
        print(f"car model is {self.model} and brand is {self.brand} and year is {self.year}")
    @staticmethod
    def start():
        print("car is started")

    @staticmethod
    def stop():
        print("Car is stop")

class ToyotaCar(Car):
    def __init__(self,name,model,year):
        super().__init__(model,year)
        self.name = name

car1 = ToyotaCar("fortuner")