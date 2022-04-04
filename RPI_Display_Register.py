import sqlite3

dbconnect = sqlite3.connect("RPI_Display_Database");
dbconnect.row_factory = sqlite3.Row;
cursor = dbconnect.cursor();

query = cursor.execute('SELECT * FROM Device_Info').fetchall()

if len(query) != 0:
    for row in query:
        user = row['user']
        email = row['email']
    
    print("Device is already registered to... ")
    print(user + ":  " + email)
    print("Would you like to Re-Register an email for this device? (y/n)")
    y = input()
    
    if (y == "n" or y == "N"):
        print("New email was not registered.")
    
    elif (y == "y" or y == "Y"):
        print("To Re-Register Device...")
        user = input("    Enter Username: ")
        email = input("    Enter Email: ")
    
        cursor.execute("DELETE FROM Device_Info");
        dbconnect.commit();
        
        cursor.execute('''INSERT into Device_Info (user, email) values (?, ?)''', (user, email));
        dbconnect.commit();
        print("Email has been registered")
    
    else:
        print("Invalid Input.")
    
    print("Exiting Program.")
    quit()
    
print("To Register Device...")
user = input("    Enter Username: ")
email = input("    Enter Email: ")
    
cursor.execute('''INSERT into Device_Info (user, email) values (?, ?)''', (user, email));
dbconnect.commit();
print("Email has been registered")
    

