# !/usr/bin/env python3

# The following code is for updating
# a real-time database with the
# weight from a HX711 sensor.
# food_data holds all the data
# about the foods and the
# weight is added to the prexisting
# data here.


import time
import RPi.GPIO as GPIO
import example_weight as ex
from picamera import PiCamera
import test2 as testing
import example_weight as eweight
from datetime import datetime
# import RPi.GPIO as GPIO  # import GPIO
# from food_data import food

# from hx711 import HX711  # import the class HX711

# set a all GPIO pins
# GPIO.setmode(GPIO.BCM)  # set GPIO pin mode to BCM numbering
# hx = HX711(dout_pin=29, pd_sck_pin=31)  # create an object

# Create new Firebase config and database object
config = {
    "apiKey": "AIzaSyAmHtdWuIyvGzFkxE_NNc7hMBMIDZ4eG7s",
    "authDomain": "sysc3010-project-l1g3.firebaseapp.com",
    "databaseURL": "https://sysc3010-project-l1g3-default-rtdb.firebaseio.com/",
    "storageBucket": "sysc3010-project-l1g3.appspot.com"
}

# Initalize firebase for user 0
firebase = pyrebase.initialize_app(config)
db = firebase.database()
dataset = "106073704998317597247"

def scan_food():
    #scan food on command
    camera = PiCamera()

    # change code
    # camera presets
    camera.resolution = (1920,1080)
    camera.vflip = True
    camera.hflip = True
    camera.iso = 100
    time.sleep(2)
    camera.shutter_speed = camera.exposure_speed
    camera.exposure_mode = 'off'
    g = camera.awb_gains
    camera.awb_mode = 'off'
    camera.awb_gains = g
    camera.framerate = 30

def find_weight():
    # find the weight of foods in grams
    GPIO.setmode(GPIO.BCM)  # set GPIO pin mode to BCM numbering
    hx = HX711(dout_pin=29, pd_sck_pin=31)  # create an object
    print(hx.get_data_mean())  # get raw data reading from hx711
    # if raw reading is less than 100 then the data is not valid
    while (hx.get_data_mean() < 100):
        print("not the correct value (too small)")
    
    val = hx.get_weight(5)
    GPIO.cleanup()
    return val


# Write food weights to database and push it to firebase
def writeData(Meal_Name, Meal_Type, Calories, food_weight, Date):
    '''
    Return null
    '''
    entry_id = 0

    # assign the raspberry pi valuews
    db.child(dataset).set({"RPI_Controller_Address": 5050})

    # find weight of food
    Weight = eweight.find_weight()

    # Each 'child' is a JSON key:value pair
    # each item added
    c = "Item" + str(entry_id)
    Calories = round(Weight/food_weight * Calories, 1)

    # assign the meals in the firebase
    sens = {'Meal_Name': Meal_Name, 'Meal_Type': Meal_Type,
            'Calories': Calories, 'Weight': Weight, 'Date': str(Date)}
    # push to firebase
    db.child(dataset).child("Calorie_Count").child(c).set(sens)

# def recursive_find():
    
def stream_handler(message):
    print(message["event"]) # put
    print(message["path"]) # /-K7yGTTEp7O549EzTYtI
    print(message["data"]) # {'title': 'Pyrebase', "body": "etc..."}
    print()
    if(str(message["data"]).find(str({'Edited': 'False'})) > 1):
        # recursive_find()
        print("here")

def get_part_of_day(h):
    return (
        "breakfast"
        if 5 <= h <= 11
        else "lunch"
        if 12 <= h <= 17
        else "snack"
        if 18 <= h <= 23
        else "dinner"
    )
def readData():
    # Returns the entry as an ordered dictionary (parsed from json)
    while True:
        anotherTest = db.child("106073704998317597247").child("ScanItems").get()
        if (anotherTest.val() == True):
            data = testing.startcamera()
            writeData(get_part_of_day(data.get("name"), datetime.now().hour),data.get("Calories"), data.get("size"), datetime.now())
        time.sleep(1)

    # anotherTest.each()
    # db.child("Users").child("User0").child("Calorie_Count").child("Item2").set({'Edited': str(True)})
    #myTest = db.child(username).child("Calorie_Count").stream(stream_handler, stream_id="new_posts")
    # print(stream_handler.message)
    

if __name__ == "__main__":
    readData("User0", 9)

    # if readData():
    #     # if there is a request to write to the database,
    #     # write data
    #     writeData(food.Meal_Name(), food.Meal_Type,
    #               food.Calories, food.Date)
