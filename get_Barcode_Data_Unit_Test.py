import requests
from time import sleep
import json

#UPC = "00070247172525"
def return_data(UPC):
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
    print(type(item))
    calories = (((item.get("foods")[0]).get("foodNutrients"))[3]).get("nutrientNumber")
    size = item.get("foods")[0].get("servingSize")
    name = item.get("foods")[0].get("description")
    print(name)
    return {"name": name, "size": size, "calories": calories}

# except:
#     print("Connection Failed.")
#     quit()
