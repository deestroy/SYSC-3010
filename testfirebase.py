import datetime
import pyrebase
import random
import time
from sense_hat import SenseHat

config = {
  "apiKey": "AIzaSyAmHtdWuIyvGzFkxE_NNc7hMBMIDZ4eG7s", #"AIzaSyDt03uJ1v4zagGvtVRPjwYiikkukbeyHSQ",
  "authDomain": "sysc3010-project-l1g3.firebaseapp.com", # sysc3010l3-16bb9.firebaseapp.com
  "databaseURL": "https://sysc3010-project-l1g3-default-rtdb.firebaseio.com/", #https://sysc3010l3-16bb9-default-rtdb.firebaseio.com/
  "storageBucket": "sysc3010-project-l1g3.appspot.com" # sysc3010l3-16bb9.appspot.com
}

firebase = pyrebase.initialize_app(config)
db = firebase.database()
dataset = "User0"

fruits = ["apple", "banana", "cherry", "kiwi", "mango"]
ty = ["Breakfast", "Lunch", "Dinner"]

# Write random numbers to database
def writeData():
  key = 5
  x = datetime.datetime.now()
  sense = SenseHat()
  while True:
    # I'm using dummy sensor data here, you could use your senseHAT
    Meal_Name  = fruits[random.randint(0,4)]

    Meal_Type = ty[random.randint(0,2)]
    Calories = random.randint(0, 500)
    Weight = random.randint(0, 500)
    Date = x

    # Will be written in this form:
    # {
    #   "sensor1" : {
    #     "0" : 0.6336863763908736,
    #     "1" : 0.33321038818190285,
    #     "2" : 0.6069185320998802,
    #     "3" : 0.470459178006184,
    #   }
    # }
    # Each 'child' is a JSON key:value pair
    #sensorData
    c = "Item" + str(key)
    print(type(c))
    sens = {'Meal_Name': Meal_Name, 'Meal_Type':Meal_Type, 'Calories': Calories, 'Weight':Weight, 'Date': Date}
    db.child(dataset).child("Calorie_Count").child(c).set(sens)

    key = key + 1
    time.sleep(1)

# def readData():
#   # Returns the entry as an ordered dictionary (parsed from json)
#   mySensorData = db.child(dataset).get()
#   print(type(mySensorData))
# 
#   print("Parent Key: {}".format(mySensorData.key()))
#   print("Parent Value: {}\n".format(mySensorData.val()))
# 
#   # Returns the dictionary as a list
#   mySensorData_list = mySensorData.each()
#   # Takes the last element of the list
#   lastDataPoint = mySensorData_list[-1]
# 
#   print("Child Key: {}".format(lastDataPoint.key()))
#   print("Child Value: {}\n".format(lastDataPoint.val()))


if __name__ == "__main__":
    writeData()