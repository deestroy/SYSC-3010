#! /usr/bin/python2

import time
import sys

EMULATE_HX711=False

referenceUnit = 1

if not EMULATE_HX711:
    import RPi.GPIO as GPIO
    from hx711 import HX711
else:
    from emulated_hx711 import HX711

def cleanAndExit():
    print("Cleaning...")

    if not EMULATE_HX711:
        GPIO.cleanup()
        
    print("Bye!")
    sys.exit()

hx = HX711(5, 6)

hx.set_reading_format("MSB", "MSB")
def find_weight():
    # HOW TO CALCULATE THE REFFERENCE UNIT
    # If 2000 grams is 184000 then 1000 grams is 184000 / 2000 = 92.
    #hx.set_reference_unit(114)s
    hx.set_reference_unit(113)

    hx.reset()

    hx.tare()

    print("Tare done! Add weight now...")

    # to use both channels, you'll need to tare them both
    #hx.tare_A()
    #hx.tare_B()
    time.sleep(5)
    s = 0
    for i in range(20):
        try:
            
            # Prints the weight. Comment if you're debbuging the MSB and LSB issue.
            val = hx.get_weight(5)
            s += val

            hx.power_down()
            hx.power_up()
            time.sleep(0.1)

        except (KeyboardInterrupt, SystemExit):
            cleanAndExit()
    return s/20
