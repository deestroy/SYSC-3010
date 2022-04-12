/**
 * Adds an item to the user table if an items not null or throws an error if incorrect arguments
 * @param item an Item object:
 * {"Meal_Type":mealType, "Meal_Name":mealName, "calories":calories, "Weight":weight, "Date":date}
 * @returns true if item added, false otherwise
 */
function addItem(item) {
  const tbBody = document.getElementById('UserData').children.item(0);
  if (item != null) {
    if (typeof item.Meal_Name === 'string' && typeof item.Meal_Type === 'string' && typeof item.Calories === 'number' && typeof item.Weight === 'number' && typeof item.Date === 'string') {
      tbBody.innerHTML += `<tr class='item' onclick='clickHandler(this)'><td>${item.Meal_Name}</td><td>${item.Calories}</td><td>${item.Meal_Type}</td><td>${item.Weight}</td><td>${item.Date}</td></tr>`;
      return true;
    }
    throw new TypeError('Incorrect Arguments');
  }
  return false;
}

function addItemRescanned(item) {
  const tbBody = document.getElementById('Rescanned Items').children.item(0);
  if (item != null) {
    if (typeof item.Meal_Name === 'string' && typeof item.Calories === 'number' && typeof item.Weight === 'number') {
      tbBody.innerHTML += `<tr class='item' onclick='clickHandler(this)'><td>${item.Meal_Name}</td><td>${item.Calories}</td><td>${item.Weight}</td></tr>`;
      return true;
    }
    throw new TypeError('Incorrect Arguments');
  }
  return false;
}

/*  Style used: airbnb. FLAKE8 can not be used for JavaScript. ESLint output:
C:\Users\Thomas\Documents\3010Project\SYSC-3010\public\addItem.js
  7:10  error  'addItem' is defined but never used  no-unused-vars

✖ 1 problem (1 error, 0 warnings)

Ignored error no-unused-vars since addItem is used in another JavaScript file
 */