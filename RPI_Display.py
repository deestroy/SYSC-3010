import pyrebase
import random
import sqlite3
from time import sleep
from RPI_Display_Functions import *

sense = SenseHat()

# Create new Firebase config and database object
config = {
  "apiKey": "AIzaSyAmHtdWuIyvGzFkxE_NNc7hMBMIDZ4eG7s",
  "authDomain": "sysc3010-project-l1g3.firebaseapp.com",
  "databaseURL": "https://sysc3010-project-l1g3-default-rtdb.firebaseio.com/",
  "storageBucket": "sysc3010-project-l1g3.appspot.com"
}

firebase = pyrebase.initialize_app(config)
db = firebase.database()

dbconnect = sqlite3.connect("RPI_Display_Database");
dbconnect.row_factory = sqlite3.Row;
cursor = dbconnect.cursor();

def isRequest():
    query = cursor.execute('SELECT * FROM Device_Info').fetchall()
    
    for row in query:
        email = row['email']
    
    RpiData = db.child("RPI_Display").get()
    x = RpiData.each()
    
<<<<<<< HEAD
    length = len(x)
=======
    
>>>>>>> 5749bbf (first commit)
    deviceNum = 0
    
    for tmp in x:
        if email == tmp.val()["email"]:
            break
        
        deviceNum = deviceNum + 1
    
    if deviceNum == len(x):
        print("Registered Device not found.")
        print("Exiting Program.")
        quit()
    
    while x[deviceNum].val()["isRequest"] == 0:
        sleep(5)

    if x[deviceNum].val()["isRequest"] != 1:
        return False
<<<<<<< HEAD
    
=======
>>>>>>> 5749bbf (first commit)
    return True
    
def main():
    dbconnect = sqlite3.connect("RPI_Display_Database");
    dbconnect.row_factory = sqlite3.Row;
    cursor = dbconnect.cursor();

    query = cursor.execute('SELECT * FROM Device_Info').fetchall()

    if len(query) == 0:
        print("No User Registered to this device. Please register using 'RPI_Display_Register.py' to register a user.")
        print("Exiting Program.")
        quit()
        
    for row in query:
        user = row['user']
        email = row['email']
    
    print("Registered User Found. Waiting for Request.")
    request = isRequest()
    
    if (not request):
        print("Error occurred while waiting for request.")
        quit()
    
    print("Getting User Data")
    items = firebaseData(user)
<<<<<<< HEAD
=======

>>>>>>> 5749bbf (first commit)
    menuDisplay(items)
    
    print("Resetting Request")
    
    
    deviceData = db.child("RPI_Display").get()
    x = deviceData.each()
    
    for d in x:
        if d.val()['email'] == email:
            print("found")
            kid = d
            break
            
    sdata = {"email": email, "isRequest": 0}
    db.child("RPI_Display").child(kid.key()).set(sdata)
    
    print("Program has Completed.")
    
if __name__ == "__main__":
<<<<<<< HEAD
    main()
=======
    main()
>>>>>>> 5749bbf (first commit)
