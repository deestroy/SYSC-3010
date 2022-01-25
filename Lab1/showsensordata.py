from sense_hat import SenseHat
sense = SenseHat()
sense.clear()

print("Temperature: " + str(sense.get_temperature()))
print("Pressure: " + str(sense.get_pressure()))
print("Humidity: " + str(sense.get_humidity()))

