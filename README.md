# Calorie Counter

SYSC 3010 Project
TA: Zein _____________

## L1-G3 Team Members:
- Thomas Knechtel
- Keith Lam
- Dhriti Aravind

## Project Summary:
In this project, we created a web-based platform which allows people to log their daily calorie intake in an easy way to assist users to reach their goal weight. Through scanning a barcode through a Raspberry Pi camera, this system will accurately detect the amount of calories consumed by weighing the portion of food that will be consumed on the weighing surface. Our project will help monitor 100% of the users food intake; storing it in an online database and displaying it on a web GUI.



## Project Description:
The calorie counter will perform 4 main tasks: count the total daily calories consumed and relay it back to the user in a GUI; scan barcodes of the food products using a Raspberry Pi camera alongside a barcode database; displaying the progress of an individual user on a Raspberry Pi SenseHat and on the Web GUI; and measuring the amount of pre-packaged food consumed and relaying it back to the database. To accomplish these 4 main tasks we have broken our project down to its functional requirements. 

### Online Database:
The first step is to set up an accessible database to contain all required user info, ID’s for the various user devices, and nutrition item info. 
### Server:
A server is required to handle requests from the Web Application and the RPI Controller. 
### Barcode Scanner:
The next functional requirement is to program the camera to identify and scan barcodes. 
### RPI Controller:
The RPI Controller will operate the camera, weight sensor and rotating platform. Furthermore, the RPI Controller must be able to communicate bi-directionally with the server.
### Web Application:
Lastly, this project requires a bi-directional Web Application for users to login, send a request to scan items and access their information at any time.


## Setup/Installation:
Before setting up our project, it is important to note that there are a lot of hardware components used. Please refer below the setup steps to see the list the hardware components.

### Hardware Components
- Servo Motor
- Raspberry Pi Camera Module V2
- Load Cell
- HX711 Sensor
- SenseHat
- 3x Raspberry Pi

### Connecting Hardware Components
1. To connect the servo motor follow the description below.
-  Motor's VCC (Red) ⟶ Raspberry Pi 3.3V Pin
-  Motor's GND (Brown/Black) ⟶ Raspberry Pi GND Pin
-  Motor's Pulse ⟶ Raspberry Pi Pin 11 (GPIO 17)

The camera is connected the camera port. More information on how to connect and setup the camera can be found [here](https://thepihut.com/blogs/raspberry-pi-tutorials/16021420-how-to-install-use-the-raspberry-pi-camera). Mount the camera on the motor using some double sided tape. 

<img src="IMG_1807.png" width="300">

2. On the same Raspberry Pi as the camera (the Controller), connect the load cell to the HX711 sensor as described below.
- E+ ⟶ Red
- E- ⟶ Black
- A+ ⟶ White
- A- ⟶ Green

From there, connect the HX711 sensor to the RPi Controller and the 4V - 6V power source.
- VCC ⟶ Positive Pin of power source
- DT ⟶ Raspberry Pi Pin 29 (GPIO 5)
- SCK ⟶ Raspberry Pi Pin 31 (GPIO 6)
- GND ⟶ Negative Pin of power source

The result should be as shown below:
![Final Fritzing](image.png)
<img width="398" alt="image" src="https://user-images.githubusercontent.com/39637258/162847014-c2b65645-2c95-4e48-8bfe-2215ea9d8a36.png">

3. On another Raspberry Pi, attach the SenseHat to the Raspberry Pi ensuring all 40 pins from the Pi are properly inserted to ensure connectivity.

### Installing Software
#### Software Dependancies
Prior to running the software in this repository, make sure you have the following packages installed. This code was written using Python 3.9.

On the Raspberry Pi with the camera connected to it, install packages to allow for barcode detection and scanning. If you don't have pip installed already, follow [this tutorial](https://jamesjdavis.medium.com/how-to-install-opencv-on-raspberry-pi-7-easy-steps-7b20a59ae6b2) to install OpenCV.

```
$ sudo apt-get update
$ sudo apt-get upgrade
$ pip3 install numpy
$ pip3 install python3-opencv
$ sudo apt-get install libcblas-dev
$ sudo apt-get install libhdf5-dev
$ sudo apt-get install libhdf5-serial-dev
$ sudo apt-get install libatlas-base-dev
$ sudo apt-get install libjasper-dev 
$ sudo apt-get install libqtgui4 
$ sudo apt-get install libqt4-test
```
For barcode detection and GPIO usage install with

```
$ pip3 install RPi.GPIO
$ pip3 install pyzbar
```

To connect to a Firebase account to create an account, and start a new project, then, install pyrebase.

```
$ sudo apt install pyrebase
```

### Running the Application
1. Using our repository, clone the following files to the following Raspberry Pi's. Make sure the files are located in the same directory.

| RPI Controller: | RPI Server: | RPI Display:             |
|-----------------|-------------|--------------------------|
| Scan_Barcode_Unit_Test.py                |             | RPI_Display.py           |
| cameras.py                |             | RPI_Display_Functions.py |
| example_weight.py                |             | RPI_Display_Register.py  |
|hx711_test.py|               |               |
|get_Barcode_Data_Unit_Test.py|               |             |


2. Register a user to the RPI Display by running the RPI_Display_Register.py. Enter a valid user and corresponding user email that already has been registered using the web application. (Note the program can be used to change the user registered to the device.)
3. Run RPI_Display.py. This program will run/idle until an event occurs.

To activate the RPI controller, 
1. Run `hx711_test.py` on the controller. Until someone presses scan on the GUI, the application will remain idle. 
2. Once the 'Scan' button is pressed, you should see a preview of the camera similar to this:
<img width="1440" alt="image" src="https://user-images.githubusercontent.com/39637258/162845879-e562711c-5949-416b-9f10-36c1fcc06586.png">

Place a barcode in front of the camera. At this point the servo should also be intermitantly scanning. The video will display frame by frame the image on the screen. Press any key to move to the next.

3. If the barcode is sucessfully detected, there should be a blue bounding box around the barcode. The window will close and the GUI will update itself. 
If not, the console will display "no barcode detected".
<img width="1121" alt="image" src="https://user-images.githubusercontent.com/39637258/162846682-65952241-1300-41d9-b324-1d6f56b614d5.png">





