class Student:
    

    # ============    constructor  ===========
    # ->  Special method called automatically when an object is created.
    # ->  used for initialization of the object.
    # self -> 	•	Refers to the current instance of the class. used for access instance variables and methods.  


    className = "GLA"  #  class attributes store in memory only one time for all instances

    def __init__(self):  # default constructor
        pass

    # parameterized constructor
    def __init__(self , fullName): 
        # name  = fullName    # ❌  fullName is assign to the local variable 
        self.name = fullName  # ✅   fullName is assign to the instance variable

    # methods  -> a function that belong to a object 

    # def greet():      # ❌  0 parameter but required one parameter (self)
    def greet(self):    # self is required for the method in first parameter
        print(f"Hello, {self.name}")


    # static method   -> don't use the self parameter work as class level
    @staticmethod        # @static method decorator
    def getCollege():
        print("college is GLA")



# object creation
s1 = Student("robo")
print(s1.name)
s1.greet()


# public and private attributes
class MyClass:
    def __private_method(self):
        print("This is a private method.")

    def public_method(self):
        print("Calling private method from within the class:")
        self.__private_method()



class Bank:
    def __init__(self ,acc_no, acc_pass):
        self.acc_no = acc_no          # public attribute
        self.__acc_pass = acc_pass  # private attribute

    def reset_pass(self,new_pass):
        self.__acc_pass = new_pass
        print("Pass is successfully rest=et ......")

    def bank_details(self):
        print(f"your bank account number is {self.acc_no} and your account pass is {self.__acc_pass}")


acc_01 = Bank(12345 , "Pixel@2022")
print(acc_01.acc_no)

# print(acc_01.__acc_pass)   # ❌  private attribute ('Bank' object has no attribute '__acc_pass')

acc_01.bank_details()
acc_01.reset_pass("Pixel@2023")
acc_01.bank_details()  