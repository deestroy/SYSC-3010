import { getUserData, data } from "../FireBaseFunctions.js"

import { expect } from "chai"
import { Context } from "mocha"
describe('#getUserData', async function(){
    Context('Retreives Data for User0', async function(){
        it('Should return json data for user',async function(){
            await getUserData('User0')
            console.log(data)
            expect(data.Calorie_Count.item3).to.equal({
                "Calories" : 330,
                "Date" : "2022-03-11 12:58:45.893657",
                "Meal_Name" : "mango",
                "Meal_Type" : "Breakfast",
                "Weight" : 239
              })
        })
    })
    

})