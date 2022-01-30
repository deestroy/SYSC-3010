from sense_hat import SenseHat
import requests
import time

sendKey = "E8R7GVO6XCJ8KMOH"
url = "https://api.thingspeak.com/update"

def main():
    sense = SenseHat()
    sense.clear()
    
    t = sense.get_temperature()
    p = sense.get_pressure()
    h = sense.get_humidity()
    
    payload = {'field1': t, 'field2': p, 'field3': h, 'api_key': sendKey} 
    try: 
        response = requests.get(url, params=payload) 
        response = response.json() 
 
        print(response) 
    except: 
        print("Connection Failed") 
 
if __name__ == "__main__":
    while True:
        main()
        time.sleep(120)

