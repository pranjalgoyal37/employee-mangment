# python full notes by Pranjal

## python-> python is high-level, interpreted dynamic-typed and garbage collected programming language . It's known for readability and simplicity

## variable

- variable is a name given to a value
- In python , variables are dynamincally typed(no need to declare data type).
- case-sensitive and naming should follow snake_case.

```
name = "Alice"
age = 25
is_student = True
```

Note-> Python is indentation-sensitive. Use 4 spaces.

## Data Types

1.primitive type -> int.float,bool(True / False),str ,None(null value)
True = 1
False = 0

None -> absence of value
a = None

2.Collection Data Type -> list,tuple,set,dictionary

### List

- list is a collection of mixed items which can be of any data type
- list is ordered and changeable
- list is denoted by square brackets []

#### function of List

1. .append(value) - add an item the end of this list
2. insert(index,value) - insert an item at a specified position in the list
3. extend(list) - add multiple items to the end of this list
4. remove(value) - remove the first occurrence of the value
5. pop(index) - Removes and returns an item at the given index (default: last item).

6. index(value) - Returns the index of the first occurrence of the specified value
7. count(value) - Returns the number of occurrences of the specified value
8. sort() - Sorts the list in ascending order
9. reverse() - Reverses the list
10. clear() - Removes all items from the list
11. copy() - Returns a copy of the list

```
my_list = [1, 2, 3, 'apple', 4.5]
list_num =[2,4,1,3,5]
1)-  my_list.append(6)    # [1, 2, 3, 'apple', 4.5,6]
2)-  my_list.insert(1,"pg")    # [1, "pg" 2, 3, 'apple', 4.5,6]
3)-  my_list.extend([1,2,5])    # [1, 2, 3, 'apple', 4.5,6 ,1,2,5]
4)-  my_list.remove(1)    # [ 2, 3, 'apple', 4.5,6 ,1,2,5]
5)-  my_list.pop(3)    # [ 2,3,4,5,6,1,2,5]
10)  my_list.count(5)    # 2
6)-  list_num.sort()  # [1,2,3,4,5]
7)- list_num.reverse()  # [5,4,3,2,1]
9)- list_num.copy()  # [5,4,3,2,1]
8)- list_num.clear()  # []


```

```
list_1 = [1."hello",3.14,[101,"pg",25]]
```

## Type casting/conversion

```
int("5")   -> 5
float("5.6") -> 5.6
str(123)  -> 123
list("abc") -> ['a','b','c']
```

2. Tuple:
   A tuple is an immutable, ordered collection of items. Tuples are similar to lists but cannot be modified after creation. They are defined using parentheses ().

💡 Properties:
Ordered: Items maintain their order.

Immutable: Once created, items cannot be changed.

Allows duplicates: You can have multiple occurrences of the same value.

Faster than lists due to immutability.

## #type checking

```
type(x)  -> Gives types
isinstance(c,int)
```

## 🧠 Memory Optimization Tips:

- Use tuple instead of list when data is constant.
- Use set for fast membership testing.
- U se defaultdict or Counter from collections for better dict manipulation.

3. Dictionary:
   A dict is an unordered, mutable collection of key-value pairs. It is similar to a real-world dictionary, where each key is mapped to a value.

💡 Properties:
Unordered: Python dictionaries are unordered before version 3.7. From Python 3.7+, dictionaries are ordered (the insertion order is preserved).

Mutable: You can modify the dictionary after creation (add/remove/change values).

Keys are unique: No duplicate keys are allowed.

Keys must be immutable types (e.g., str, int, tuple), but values can be any type.
