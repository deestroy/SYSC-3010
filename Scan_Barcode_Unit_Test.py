"""
This code takes an image (.JPG) of a barcode and decodes the barcode into byte form data.

Sorry, FLAKE8 was not working for me. Partial marks for me at best. RIP
"""

# Importing library
import cv2
from pyzbar.pyzbar import decode
import RPi.GPIO as GPIO
import time
import get_Barcode_Data_Unit_Test as gB
GPIO.setwarnings(False)

duty = 2
GPIO.setmode(GPIO.BCM)
#Set pin 11 as output and pwm
GPIO.setup(17, GPIO.OUT)
servo1 = GPIO.PWM(17, 50) # 50 Hz pulse
# Move servo
print("start servo")
servo1.start(0)

# Make one method to decode the barcode
def BarcodeReader(image):
    global duty
    # read the image in numpy array using cv2
    img = cv2.imread(image)
      
    # Decode the barcode image
    detectedBarcodes = decode(img)
      
    # If not detected then print the message
    if not detectedBarcodes:
        print("Barcode Not Detected or your barcode is blank/corrupted!")
        servo1.ChangeDutyCycle(duty)
        time.sleep(0.3) # wait for the motor to physically catch up
        servo1.ChangeDutyCycle(0) # to stop jittering
        print("change duty", duty)
        if duty < 12:
            duty +=1
        elif duty == 12:
            duty = 0
        else:
            duty -=1
    else:
       
          # Traverse through all the detected barcodes in image
        for barcode in detectedBarcodes: 
           
            # Locate the barcode position in image
            (x, y, w, h) = barcode.rect
             
            # Put the rectangle in image using
            # cv2 to heighlight the barcode
            cv2.rectangle(img, (x-10, y-10),
                          (x + w+10, y + h+10),
                          (255, 0, 0), 2)
             
            if barcode.data!="":
               
            # Print the barcode data
                print(barcode.data)
                return barcode.data.decode("utf-8")
            
            
                val = gB.return_data(barcode.data)
                print(val, "val")
                if val != {}:
                    servo1.stop()
                    GPIO.cleanup()
                    return val
    cv2.imshow("Image", img)
    cv2.waitKey(0)
    cv2.destroyAllWindows()
    return duty
 
# Main
# if __name__ == '__main__':
#     # Read image
#     img = "barcode0.jpg"
#  
#     print("Decode")
#     decodedObjects = BarcodeReader(img)