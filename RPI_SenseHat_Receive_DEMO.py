import socket
from sense_hat import SenseHat
sense = SenseHat()

UDP_IP = "localhost"
UDP_PORT = 8080

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.bind((UDP_IP, UDP_PORT))

while True:
    # buffer size is 1024 bytes
    data, addr = sock.recvfrom(1024) 
    print ("Received message: ", data)
    sense.show_message(str(data))
