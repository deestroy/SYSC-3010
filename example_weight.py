import time
import RPi.GPIO as GPIO
from hx711 import HX711

GPIO.setmode(GPIO.BOARD)
hx = HX711(5, 6)
hx.set_reading_format("MSB", "MSB")


def cleanAndExit():
    # Clean and exit the program
    print("Cleaning...")
    GPIO.cleanup()


def find_weight():
    # HOW TO CALCULATE THE REFFERENCE UNIT
    # If 2000 grams is 184000 then 1000 grams is 184000 / 2000 = 92.
    hx.set_reference_unit(113)
    hx.reset()
    hx.tare()
    print("Tare done! Add weight now...")
    time.sleep(5)
    avg = 0
    # for 20 times, weight the item and average it
    for i in range(20):
        try:
            val = hx.get_weight(5)
            avg += val
            hx.power_down()
            time.sleep(0.01)
            hx.power_up()

        except (KeyboardInterrupt, SystemExit):
            cleanAndExit()
    if avg/20 < -1:
        return find_weight()
    return avg/20
