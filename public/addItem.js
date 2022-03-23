
function addItem(item){
    var tbBody = document.getElementById('UserData').children.item(0)
    if(item!=null){
        if(typeof item.Meal_Name == 'string' && typeof item.Meal_Type=='string'&& typeof item.calories == 'number' && typeof item.Weight == 'number' && typeof item.Date=='string'){
             tbBody.innerHTML+=`<tr><td>${item.Meal_Name}</td><td>${item.calories}</td><td>${item.Meal_Type}</td><td>${item.Weight}</td><td>${item.Date}</td></tr>`
             return true;
        }
        else throw new TypeError('Incorrect Arguments')
       
    }
    return false;
    
}