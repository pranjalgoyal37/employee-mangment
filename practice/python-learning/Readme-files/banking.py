balance =0
is_active = True


def show_balance():
    print(f"your current balance is : {balance}")

def deposit(amount):
    amount =
    balance += amount
    print(f"amount is successfully deposited . your current balance is {balance}")

def withdraw():
    


while is_active:
    print("\n -----Welcome to the Bank System------")
    print("1. Show Balance")
    print("2. Deposit")
    print("3. Withdraw")

    choice = int (input("Enter your choice: "))
    if choice == 1:
        show_balance()
    elif choice == 2:
        deposit()
    elif choice == 3:
        withdraw()
    else:
        print("Invalid choice. Please try again.")