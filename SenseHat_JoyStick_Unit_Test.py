from sense_hat import SenseHat
sense = SenseHat()

while True:
  for event in sense.stick.get_events():
    # Check if the joystick was pressed
    if event.action == "pressed":
      
      # Check which direction
      if event.direction == "up":
        print("up")
      elif event.direction == "down":
        print("down")
      elif event.direction == "left": 
        print("left")
      elif event.direction == "right":
        print("right")
      elif event.direction == "middle":
        print("middle")
