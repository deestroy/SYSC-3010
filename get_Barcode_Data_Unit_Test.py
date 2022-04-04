import requests
from time import sleep

UPC = "00070247172525"

headers = {
    'accept': 'application/json',
}

#def get_Barcode_Data(barcodeInt):

params = {
    'query': UPC,
    'dataType': '',
    'pageSize': '1',
    'pageNumber': '1',
    'sortBy': 'dataType.keyword',
    'sortOrder': 'asc',
    'api_key': 'm9WJyUKm093VdojnznmJU23UUhhgsVktbOhI9sPl',
}

# try:
response = requests.get('https://api.nal.usda.gov/fdc/v1/foods/search', headers=headers, params=params)

print(response.status_code)

if(response.status_code == 200):
    print("Item Found!")

item = response.json()

# except:
#     print("Connection Failed.")
#     quit()
