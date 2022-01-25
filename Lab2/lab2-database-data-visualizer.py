import pandas as pd
import plotly.express as px
import datetime
import sqlite3
from sense_hat import SenseHat

sense = SenseHat()
sense.clear()

dbconnect = sqlite3.connect("sensorDB.db");
dbconnect.row_factory = sqlite3.Row;
cursor = dbconnect.cursor();


query = cursor.execute('SELECT * FROM sensorData').fetchall()
df = pd.DataFrame(query)

for row in cursor:
	print(row['id'], row['dateTime'], row['temperature']);

dbconnect.close();

