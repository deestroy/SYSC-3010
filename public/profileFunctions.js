const request = new XMLHttpRequest()
const requestGoals = new XMLHttpRequest()
let type = {type: 'ALL_TIME'}
let x = []
let y=[] 

requestGoals.open("post","getGoals")
requestGoals.send()
/**
 * when /getGoals receives response update table
 */
requestGoals.onload=function(){
    const GOALS =JSON.parse(requestGoals.response)
    Object.keys(GOALS).forEach((key)=>{
        addGoalToTable(GOALS[key])
    })
}
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
/**
 * When /getStats receives response populate chart
 */
request.onload=function(){
    var data = JSON.parse(request.response)
    x = data.x
    y = data.y
    myChart.data.labels=x
    myChart.data.datasets[0].data=y
    myChart.update()
}
/**
 * add a Goal object to table
 * @param {Goal} goal 
 */
function addGoalToTable(goal){
    let table = document.getElementById("goals_table")
    table.innerHTML+=`<tr><td>${goal.name}</td><td>${goal.content}</td><td>${goal.date}</td></tr>`
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