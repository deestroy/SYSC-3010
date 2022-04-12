function calculateCalories(calorieList){
    var total =0
    for(calories of  calorieList){
        if(typeof calories == 'number'){
              total +=calories
        }
    }
    return total
}