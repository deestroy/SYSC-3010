function scan() {
  const req = new XMLHttpRequest();
  req.open('GET', '/scan');
  req.send();
}

function rescan() {
  const items = document.getElementsByClassName('clicked');
  const itemList = [];
  items.map((item) => itemList.push(item.children.item(0).innerHTML));
  const req = new XMLHttpRequest();
  req.open('post', '/rescan');
  req.setRequestHeader('Content-Type', 'application/json');
  req.send(JSON.stringify(itemList));
}
const req = new XMLHttpRequest();
function getItems() {
  req.open('GET', '/user/User0');

  req.send();
}
req.onload = function () {
  const items = req.response.Calorie_Count;
  Object.keys(items).forEach((key) => {
    addItem(JSON.parse(items[key]));
  });
};
function calculate() {
  const items = document.getElementsByClassName('clicked');
  const itemList = [];
  items.map((item) => itemList.push(parseInt(item.children.item(1).innerHTML)));
  const calories = calculateCalories(itemList);
  document.getElementById('displayCals').innerHTML = calories;
}
function clickHandler(elem) {
  if (elem.classList.contains('clicked')) {
    elem.classList.remove('clicked');
  } else {
    elem.classList.add('clicked');
  }
}
