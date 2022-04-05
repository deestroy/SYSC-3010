from imutils.video import VideoStream
import imutils
import time
import cv2
import argparse
from pyzbar import pyzbar
import Scan_Barcode_Unit_Test as BC
import get_Barcode_Data_Unit_Test as gB
import RPi.GPIO as GPIO

GPIO.setmode(GPIO.BOARD)

#Set pin 11 as output and pwm
GPIO.setup(7, GPIO.OUT)
servo1 = GPIO.PWM(7, 50) # 50 Hz pulse
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
def start_camera():
    vs = cv2.VideoCapture(0)
    time.sleep(2.0)


    while True:
        _, img = vs.read()
        
        z = BC.BarcodeReader(img)
        if z == True:
            val = gb.return_data(z)
            if val != {}:
                servo1.stop()
                GPIO.cleanup()
                return val
        else:
            servo1.ChangeDutyCycle(duty)
            time.sleep(0.3) # wait for the motor to physically catch up
            servo1.ChangeDutyCycle(0) # to stop jittering
            if duty < 12:
                duty +=1
            else:
                duty -=1
            time.sleep(2)
        cv2.imshow("code detector", img)
        
