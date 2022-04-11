# Importing library
import cv2
from pyzbar.pyzbar import decode
import Scan_Barcode_Unit_Test as BC
import get_Barcode_Data_Unit_Test as gB

# Make one method to decode the barcode
def BarcodeReader(image):
	
	# read the image in numpy array using cv2
	img = cv2.imread(image)
	
	# Decode the barcode image
	detectedBarcodes = decode(img)
	
	# If not detected then print the message
	if not detectedBarcodes:
		print("Barcode Not Detected or your barcode is blank/corrupted!")
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
				print(barcode.type)
				
	#Display the image
	cv2.imshow("Image", img)
	cv2.waitKey(0)
	cv2.destroyAllWindows()

def main():
# Take the image from user
    cam = cv2.VideoCapture(0)
    while True:
        result, image = cam.read()
        if result:
            # showing result, it take frame name and image 000000000000
          
            # saving image in local storage
            cv2.imwrite("scanner.png", image)
          
            # If keyboard interrupt occurs, destroy image 
            # window
            image = "scanner.png"
            x = BC.BarcodeReader(image)
            if type(x) is (type(dict)):
                cv2.destroyAllWindows()
                return x
                
