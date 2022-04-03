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
    request.send(JSON.stringify(type))
}
request.onload=function(){
    var data = JSON.parse(request.response)
    x = data.x
    y = data.y
    myChart.data.labels=x
    myChart.data.datasets[0].data=y
    myChart.update()
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