const request = new XMLHttpRequest()
let type = {type: 'ALL_TIME'}
let x = []
let y=[] 
/**
 * on button month update table
 */
function monthButtonClick(){
    type = {type:"MONTHLY"}
    getStats()
}
function yearlyButtonClick(){
    type = {type:"YEARLY"}
    getStats('YEAR')
}
function allTimeButtonClick(){
    type = {type:"ALL_TIME"}
    getStats('ALL_TIME')
}
/**
 * get the user stats for Month, Yearly or all time and update table
 */
function getStats(){
    request.open("POST", '/getStats' )
    request.setRequestHeader('Content-Type', "application/json")
    request.send(type)
}
request.onload=function(){
    var data = request.response
    x = Object.keys(data)
    y = Object.values(data)
}

const myChart = new Chart("myChart", {
    type: "bar",
    
    data: {
       labels: x,
       datasets: [{label:'Calories Consumed', data: y}]
       
    },
    options: {
        scales: {
            yAxes: [{
                 display: true,
                ticks: {
                suggestedMin: 0,  
                        }
                     }]
                }
             }
    });