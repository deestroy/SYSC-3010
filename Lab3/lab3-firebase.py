import pyrebase
import random
import time
from sense_hat import SenseHat

sense = SenseHat()

# Create new Firebase config and database object
config = {
  "apiKey": "AIzaSyB34rNm8y69gJmrme-6kaWNiYtdAsbIzLs",
  "authDomain": "sysc3010lab3-97b95.firebaseapp.com",
  "databaseURL": "https://sysc3010lab3-97b95-default-rtdb.firebaseio.com/",
  "storageBucket": "sysc3010lab3-97b95.appspot.com"
}

firebase = pyrebase.initialize_app(config)
db = firebase.database()

mydata = db.child("Lab3").get()
x = mydata.each()
y = x[-1].key() + 1

#Write
for i in range(3):
    sdata = {"temperature":sense.get_temperature(), "pressure":sense.get_pressure(), "humidity":sense.get_humidity()}

    db.child("Lab3").child(y).set(sdata)
    y = y +1

#Read (Waiting on teammates' API)
config = {
  "apiKey": "AIzaSyB34rNm8y69gJmrme-6kaWNiYtdAsbIzLs",
  "authDomain": "lab3-1d7f0.firebaseapp.com",
  "databaseURL": "https://lab3-1d7f0-default-rtdb.firebaseio.com/",
  "storageBucket": "lab3-1d7f0.appspot.com"
}

firebase = pyrebase.initialize_app(config)
db = firebase.database()

#Lab3 may need to change (sensor1)
mydata = db.child("SensorData").get()
x = mydata.each()
y = x[-1].key()

print("Latest 3:")
for i in range(3):
    print("Key: " + str(y))
    print("Data Set: " + str(x[y].val()))
    y = y - 1

