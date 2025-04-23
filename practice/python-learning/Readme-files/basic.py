# data types
dataInt = 10
dataFloat = 3.5
dataString = "123dfjdhf"
dataList  =[]
dataSet = {}
dataTuple =()
dataDist ={"key":"value" , "":""}

print(.1+.2)  #0.30000000000000004

# list
list_1 = [1,2,3,4,5]



# tuple 
tuple_ex01 = (1,2,3)
# tuple_ex01.add(67)  error
tuple_ex01 = tuple_ex01 + (67,)
print(tuple_ex01) 
print(type (tuple_ex01) )


# =======---------------
# range(start,stop,step)   stop exclude
for num in range(1,100): #`1 to 99`
    print(num) 

for num in range(1,100,2): #`1 to 99` 1,3,5,7 ....... ,99
    print(num)

print("========prime number ===========")
prime_num = 1000
for i in range(2,prime_num):
    if prime_num % i == 0:
        print(f"{prime_num}is not a prime number");
        break;
    
for row in range(1,5):
    for col in range(row):
            print("*", end="  ")
            
    print()

for i in range(1,11):
     print(f"5*{i} = {5*i}")


# age = int(input("pls give your age !!! "))

def ageChecker(age):
    if age < 13:
          print("You are a child")
    elif age <20:
         print("You are a teenager")
    elif age <60:
        print("you are adult")
    else:
         print("you are citizen")

# price = 18 if age >=18 else 8     # age >=18 ? 18 : 8



# def greet(name="guest",message):   // default value in always in last
def greet(message,name="guest"):
     return f"hello {name} , {message}"

print("-------- Args -----")
def sum_all(*args):
    print(args)
    return sum(args)
print("sum of all variable is :" ,sum_all(1,2,3,4,5))

print("============ kwargs ==========")
def kwargs(**kwargs):
     for key ,value in kwargs.items():
          print(key,value)
kwargs(name="robo",age=20,is_student=True)




print("=====yield====")
def even_num(num):
     for i in range(2,num+1,2):
          yield i
print(even_num(29)) # 
for num in even_num(30):
    print(num)


print("========== dictonary ============== ")
student = {
    "name":"pranjal",
    "age" :20,
    "college" : "GLA"

}


keys = student.keys()
values =student.values()
items = student.items()

print(keys , values, items)


for key,value in student.items():
        print(key ,value)

for key in student.keys():
        print(key , student[key])

print("=========Lambda function=======")

cube = lambda x : x**3

print("cube is :",cube)