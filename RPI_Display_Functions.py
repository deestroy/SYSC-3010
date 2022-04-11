from sense_hat import SenseHat
import pyrebase
import sqlite3

config = {
  "apiKey": "AIzaSyAmHtdWuIyvGzFkxE_NNc7hMBMIDZ4eG7s",
  "authDomain": "sysc3010-project-l1g3.firebaseapp.com",
  "databaseURL": "https://sysc3010-project-l1g3-default-rtdb.firebaseio.com/",
  "storageBucket": "sysc3010-project-l1g3.appspot.com"
}

firebase = pyrebase.initialize_app(config)
db = firebase.database()

sense = SenseHat()
itemElements = 5

def firebaseData(user):
    RpiData = db.child(user).get()
    x = RpiData.each()
    return x[0].val()

def getData(typ, state, items):
    currItem = "Item" + str(state)
    
    if typ == 0:
        return items[currItem]["Meal_Name"]
    elif typ == 1:
        return items[currItem]["Calories"]
    elif typ == 2:
        return items[currItem]["Date"]
    elif typ == 3:
        return items[currItem]["Meal_Type"]
    elif typ == 4:
        return items[currItem]["Weight"]
    
    print("Error: Unknown item Type.")
    return "Error: Unknown item Type."

def menuDisplay(items):
    state = 0
    state0 = 1
    isSelected = False
    menu = True
    
    print("Menu Display")
    display("Main Menu:")
    display(getData(0, state, items))
    
    while menu:
        for event in sense.stick.get_events():
            # Check if the joystick was pressed
            if event.action == "pressed":
      
            # Check which direction
                if event.direction == "up":
                    print("up")   
                
                    if not isSelected:
                        if state == 0:
                            state = len(items) - 1
                        else:
                            state = state - 1
                            
                        display(getData(0, state, items))
                        
                    elif isSelected:
                        if state0 == 1:
                            state0 = itemElements - 1
                        else:
                            state0 = state0 - 1
                            
                        display(getData(state0, state, items))
        
                elif event.direction == "down":
                    print("down")
                    if not isSelected:
                        if state == (len(items) - 1):
                            state = 0
                        else:
                            state = state + 1
                        
                        display(getData(0, state, items))
                    
                    elif isSelected:
                        if state0 == itemElements - 1:
                            state0 = 0
                        else:
                            state0 = state0 + 1
                        
                        display(getData(state0, state, items))
        
                elif event.direction == "left": 
                    print("Back to main menu.")
                    isSelected = False
                    display("Main Menu:")
                    display(getData(0, state, items))
        
                elif event.direction == "right":
                    print("select")
                    isSelected = True
                    display(getData(1, state, items))
        
                elif event.direction == "middle":
                    print("Exiting Menu.")
                    display("Closing.")
                    menu = False            

def display(msg):
    sense = SenseHat()
    sense.show_message(str(msg))
