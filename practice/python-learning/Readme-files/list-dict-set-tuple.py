# collection -> single value store multiple value
# list -    [] ordered ,      mutable(changeable)         ,allow duplicate 
# set  -    {} unordered ,    immutable() add/remove allow     ,duplicate jot allowed
# tuple -   () ordered  ,     immutable(not changeable)    ,allow duplicate faster


# list
fruits = ["apple","orange","banana","coconut"]
print(fruits[0:])

print(dir(fruits))
for fruit in fruits:
    print(fruit ,end ="  ")

# function
# len() , 