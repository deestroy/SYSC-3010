# importing socket module
import socket
  
UDP_IP = "192.168.2.31"
UDP_PORT = 8080
MESSAGE = "test0"
  
print ("message:", MESSAGE)
  
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.sendto(bytes(MESSAGE, "utf-8"), (UDP_IP, UDP_PORT))
