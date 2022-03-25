function scan(){
    var req = new XMLHttpRequest()
    req.open('GET','/scan')
    req.send()
}

function rescan(){
    var items = document.getElementsByClassName('clicked')
    var itemList = []
    for(var item of items){
        itemList.push(item.children.item(0).innerHTML)
    }
    var req = new XMLHttpRequest()
    req.open('post', '/rescan')
    req.setRequestHeader('Content-Type','application/json')
    req.send(JSON.stringify(itemList))

}
var req = new XMLHttpRequest()
function getItems(){
   
    req.open('GET','/user/User0') 
    
    req.send()
   
    
    
}
req.onload=function(){
        var items= req.response.Calorie_Count
        for(item in items){
            addItem(JSON.parse(item))
    }
}
function calculate(){
    var items = document.getElementsByClassName('clicked')
    var itemList = []
    for(var item of items){
        itemList.push(parseInt(item.children.item(1).innerHTML))
    }
    var calories = calculateCalories(itemList)
    document.getElementById('displayCals').innerHTML=calories
}
function clickHandler(elem){
    if(elem.classList.contains('clicked')){
        elem.classList.remove('clicked')
    }else{
         elem.classList.add('clicked')
    }
   

}