/**
 * Sends a scan get request to server.js.
 */
function scan() {
  const req = new XMLHttpRequest();
  req.open('POST', '/scan');
  req.send();
}
/**
 * sends a rescan POST request to the server. Passes all items that are clicked in the POST body.
 */
function rescan() {
  const items = Array.from(document.getElementsByClassName('clicked'));
  itemList = {}
  items.map((item) => {
    let item_row = item.children
    const ITEM = {
      'Meal_Name':item_row[0].innerHTML,
      'Calories': item_row[1].innerHTML,
      'Weight':item_row[3].innerHTML
    }
    itemList[item_row[0].innerHTML]=ITEM
  })
  const req = new XMLHttpRequest();
  req.open('post', '/rescan');
  req.setRequestHeader('Content-Type', 'application/json');
  req.send(JSON.stringify({'items':itemList}));
}
/**
 * get Profile page
 */
function getProfile(){
  window.location.href="profile.html"
}
const req = new XMLHttpRequest();
/**
 * Sends a GET request to get all items for the user with userID = User0
 */
function getItems() {
  req.open('POST','/user_items');
  req.send();
}
/**
 * When GET 'user/User0' loads add items to table
 */
req.onload = () => {
  const items = req.response.Calorie_Count;
  Object.keys(items).forEach((key) => {
    addItem(JSON.parse(items[key]));
  });
};
/**
 * Calculate the total calories of clicked items
 */
function calculate() {
  const items = Array.from(document.getElementsByClassName('clicked'));
  const itemList = [];
  items.map((item) => itemList.push(parseInt(item.children.item(1).innerHTML, 10)));
  const calories = calculateCalories(itemList);
  document.getElementById('displayCals').innerHTML = calories;
}
function addToIntake(){
  const items = Array.from(document.getElementsByClassName('clicked'));
  const itemList = [];
  items.map((item) => itemList.push(parseInt(item.children.item(1).innerHTML, 10)));
  const calories = calculateCalories(itemList)
  const request = new XMLHttpRequest()
  request.open('POST', '/intake')
  request.setRequestHeader('Content-Type', 'application/json')
  request.send(JSON.stringify({'calories':calories}))
}
/**
 * On Item clicked, update the item's class to reflect if the item is selcted or not
 * @param elem the HTMLElement object that called clickHandler
 */
function clickHandler(elem) {
  if (elem.classList.contains('clicked')) {
    elem.classList.remove('clicked');
  } else {
    elem.classList.add('clicked');
  }
}

/* Style used: airbnb. FLAKE8 can not be used for JavaScript. ESLint output:

C:\Users\Thomas\Documents\3010Project\SYSC-3010\public\buttonFunctions.js
   4:10  error  'scan' is defined but never used          no-unused-vars
  12:10  error  'rescan' is defined but never used        no-unused-vars
  25:10  error  'getItems' is defined but never used      no-unused-vars
  36:5   error  'addItem' is not defined                  no-undef
  42:10  error  'calculate' is defined but never used     no-unused-vars
  46:20  error  'calculateCalories' is not defined        no-undef
  53:10  error  'clickHandler' is defined but never used  no-unused-vars

✖ 7 problems (7 errors, 0 warnings)

The no-unused-vars error is being ignored because the functions are used in an HTML file.
The no-undef error is being ignored as addItem and calculateCalories is from another javascript file.
*/
