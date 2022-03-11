import datetime
import pyrebase
import random
import time
from unittest import TestCase
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
  key = 0
  x = datetime.datetime.now()
  amount = 10
  j = 0
  db.child(dataset).set({"RPI_Controller_Address": 5050})
  df = []
  l = []
  while j < amount:
                               
    # I'm using dummy sensor data here, you could use your senseHAT
    Meal_Name  = fruits[random.randint(0,4)]

    Meal_Type = ty[random.randint(0,2)]
    Calories = random.randint(0, 500)
    Weight = random.randint(0, 500)
    Date = x


    # Each 'child' is a JSON key:value pair
    #sensorData
    c = "Item" + str(key)
    
    
    print(type(c))
    d = {'Meal_Name': Meal_Name, 'Meal_Type': Meal_Type, 'Calories': Calories, 'Weight':Weight, 'Date': str(Date)}
    sens = {'Meal_Name': Meal_Name, 'Meal_Type': Meal_Type, 'Calories': Calories, 'Weight':Weight, 'Date': str(Date)}
    db.child(dataset).child("Calorie_Count").child(c).set(sens)
    di = {
      c: d
    }
    df.append(di)
    key = key + 1
    j += 1
    time.sleep(1)
  df = set(df)
    
def readData():
  # Returns the entry as an ordered dictionary (parsed from json)
  myFoodData = db.child(dataset).get()
  print(type(myFoodData))
  
  print("Parent Key: {}".format(myFoodData.key()))
  print("Parent Value: {}\n".format(myFoodData.val()))

  # Returns the dictionary as a list
  myFoodData_list = myFoodData.each()
  # Takes the last element of the list
  print("Child Value: {}\n".format(lastDataPoint.val()))
  
  TestCase().assertDictEqual(, myFoodData_list)


if __name__ == "__main__":
   # writeData()
    readData()