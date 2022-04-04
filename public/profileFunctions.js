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
    Object.keys(GOALS).forEach((date)=>{
        Object.keys(GOALS[date]).forEach((key)=>{
              addGoalToTable(GOALS[date][key])
        })
      
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
    document.getElementById("average").innerHTML=average(y)
    document.getElementById("median").innerHTML=median(y)
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
/**
 * get median of an array. From: https://stackoverflow.com/questions/45309447/calculating-median-javascript. 
 * @param {Array} vals 
 * @returns the median value
 */
function median(vals){
    if(vals.length ===0) throw new Error("No inputs");

    vals.sort(function(a,b){
        return a-b;
    });

    let half = Math.floor(vals.length / 2);
  
    if (vals.length % 2)
        return vals[half];
  
    return (vals[half - 1] + vals[half]) / 2.0;
}
/**
 * Gets average of an array.
 * @param {Array} vals 
 * @returns the average of array 
 */
function average(vals){
    let total = 0
    if(vals.length===0)throw new Error("No inputs")
    vals.map((value)=>{
        total += value
    })
    return total/vals.length
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