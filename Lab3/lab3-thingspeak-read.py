import requests
from sense_hat import SenseHat

sense = SenseHat()

# My Thingspeak Channel (Waiting on teammates' Read API Key & Channel Number)
# My readKey = "8BMQ68D2C14CSVUD"
readKey = "EGRNX4KBMOG215KH"
#channelNumber = "1640845"
channelNumber = "1642578"
url = "https://api.thingspeak.com/channels/" + channelNumber + "/feeds.json"
results = 2

def main():
    # payload includes the headers to be sent with the GET request
    # read the documentation for more information (https://docs.python-requests.org)
    payload = {'api_key': readKey, 'results': results}

    # Sends an HTTP GET request
    response = requests.get(url, params=payload)
    response = response.json()

    print("Channel Name: {}".format(response['channel']['name']))
    
    entries = response['feeds']

    # Print out the temperature at each entry's time
    for e in entries:
        print("T = {}, P = {}, H = {}".format(e['field1'], e['field2'], e['field3']))
        sense.show_message("T = {}, P = {}, H = {}".format(e['field1'], e['field2'], e['field3']))


if __name__ == "__main__":
    main()

