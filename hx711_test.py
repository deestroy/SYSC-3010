#!/usr/bin/env python3
import RPi.GPIO as GPIO  # import GPIO
from hx711 import HX711  # import the class HX711

GPIO.setmode(GPIO.BCM)  # set GPIO pin mode to BCM numbering
hx = HX711(dout_pin=29, pd_sck_pin=31)  # create an object
print(hx.get_data_mean())  # get raw data reading from hx711
if hx.get_data_mean() < 1.0:
    print("not the correct value (too small)")
if hx.get_data_mean() > 2.0:
    print("not the correct value(too big)")
GPIO.cleanup()
