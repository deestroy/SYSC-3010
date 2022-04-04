from picamera.array import PiRGBArray
from picamera import PiCamera
import time
import cv2
import Scan_Barcode_Unit_Test as BC

resulting_data = ""

# https://pyimagesearch.com/2015/03/30/accessing-the-raspberry-pi-camera-with-opencv-and-python/
def turn_on_camera():
    # capture the raw image on the raspberry pi camera
    # set all presets
    camera = PiCamera()
    camera.resolution = (640, 480)
    camera.framerate = 32
    rawCapture = PiRGBArray(camera)

    for frame in camera.capture_continuous(rawCapture, format="r", use_video_port=True):
    	# grab the raw NumPy array representing the image, then initialize the timestamp
        # and occupied/unoccupied text
        image = frame.array
        # show the frame
        cv2.imshow("Frame", image)

        #if the image of
        if BC.BarcodeReader(image) != None:
            resulting_data = BC.BarcodeReader(image)
            break
        key = cv2.waitKey(1) & 0xFF
        # clear the stream in preparation for the next frame
        rawCapture.truncate(0)
        # if the `q` key was pressed, break from the loop
        if key == ord("q"):
            break



    

    # show the image and wait for key to be presssed
    cv2.imshow("Image", image)
    BC.BarcodeReader(image)
    cv2.waitKey(0)

    
