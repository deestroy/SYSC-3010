import time
import datetime
import sqlite3
from sense_hat import SenseHat

sense = SenseHat()
sense.clear()

dbconnect = sqlite3.connect("sensorDB.db");
dbconnect.row_factory = sqlite3.Row;
cursor = dbconnect.cursor();
for i in range(10):
	time.sleep(1)
	cursor.execute('''insert into sensorData values (?, ?, ?, ?, ?)''', (i, datetime.datetime.now(), sense.get_temperature(), sense.get_pressure(), sense.get_humidity()));
	print('Data Entered: ' + str(i));
dbconnect.commit();

cursor.execute('SELECT * FROM sensorData');
for row in cursor:
	print(row['id'], row['dateTime'], row['temperature']);

dbconnect.close();
