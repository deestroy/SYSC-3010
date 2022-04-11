#Import Libraries
import RPi.GPIO as GPIO
import time

#Set GPIO numbering mode
GPIO.setmode(GPIO.BOARD)

#Set pin 11 as output and pwm
GPIO.setup(7, GPIO.OUT)
servo1 = GPIO.PWM(7, 50) # 50 Hz pulse


#start PWM running with pulse off
servo1.start(0)
print("waiting for 2 second")
time.sleep(2)

# Move servo
print("rotating 180 degrees in 10 steps")

# define variable duty
duty = 2

#loop for duty values from 2 to 12 (0 to 180 duty)
while duty <= 12:
    servo1.ChangeDutyCycle(duty)
    time.sleep(0.3) # wait for the motor to physically catch up
    servo1.ChangeDutyCycle(0) # to stop jittering
    
    time.sleep(0.7)
    duty += 1

#wait a couple of seconds
time.sleep(2)

#turn back 90 degrees
print("turning back to 90 degrees for 2 seconds")
servo1.ChangeDutyCycle(7)
time.sleep(0.5)
servo1.ChangeDutyCycle(0) #hold current position
time.sleep(1.5)

#turn back to 0 degrees
print("turning back to 0 degrees")
servo1.ChangeDutyCycle(2)
time.sleep(0.5)
servo1.ChangeDutyCycle(0)

#Loop to allow user to set servo angle
try:
    while True:
        #ask user for an angle
        angle = float(input('Enter angle between 0 and 180: '))
        servo1.ChangeDutyCycle(2+(angle/18))
        time.sleep(0.5)
        servo1.ChangeDutyCycle(0)
finally:
    #clean things up
    servo1.stop()
    GPIO.cleanup()
    print("goodbye")
    
