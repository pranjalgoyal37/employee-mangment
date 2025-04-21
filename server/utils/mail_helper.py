from flask_mail import Message
from flask import current_app
def send_mail(data):
    try:
        msg = Message(
            subject="Your EMS Employee Login Credentials",
            recipients=[data["email"]],
            body=f"""
                Hello {data['name']},

                Your account for the Employee Management System has been created.

                Login Credentials:
                Email: {data['email']}
                Password: {data['password']}

                Please change your password after first login.

                Regards,  
                EMS Admin
                """
        )
        current_app.mail.send(msg)
        print(f"mail send to  {data['name']}.")
    except Exception as e:
        print(e)
