from picamera.array import PiRGBArray
from picamera import PiCamera
import time
import cv2
import Scan_Barcode_Unit_Test as BC

def turn_on_camera():
# capture the raw image on the raspberry pi camera
    camera = PiCamera()
    rawCapture = PiRGBArray(camera)

    camera.capture(rawCapture, format="bgr")
    image = rawCapture.array

    # show the image and wait for key to be presssed
    cv2.imshow("Image", image)
    BC.BarcodeReader(image)
    cv2.waitKey(0)
