
describe('#addItem()', function(){
   this.beforeEach(function(){  //remove data from table
        var tbBody=  document.getElementById('UserData').children.item(0)
        tbBody.innerHTML='<tr style="background-color: rgb(191, 191, 255);"><th class="cell" style="width: 20%;">  Item Name  </th><th class="cell" style="width: 10%;">  calories  </th><th class="cell" style="width: 20%;">Meal Type</th><th class="cell" style=" width: 20%;">Weight</th><th>Date</th></tr>'

   })
    context('No arguments', function(){
        it('should return false table not updated', function(){
            expect(addItem()).to.equal(false)
            expect(document.getElementById('UserData').children.item(0).childElementCount).to.equal(1)

        })
    })
    
    context('Incorect Arguments', function(){
        it('Throw error, and table not updated', function(){
            expect(function(){
                addItem({Meal_Name:'kiwi',calories:'2',Weight:50,Meal_Type:'Fruit',Date:'2022-03-11 12:58:42.676354'})}).to.throw(TypeError,'Incorrect Arguments')
            
        })
    })
    context('with correct argument', function(){
        it('should return true and table updated', function(){
            expect(addItem({Meal_Name:'apple',calories:50,Weight:50,Meal_Type:'Fruit',Date:'2022-03-11 12:58:42.676354'})).to.equal(true)
            var tbBody= document.getElementById('UserData').children.item(0)
            expect(tbBody.childElementCount).to.equal(2)
            var row = tbBody.children.item(1)
            
            expect(row.children.item(0).innerHTML).to.equal('apple')
            expect(row.children.item(1).innerHTML).to.equal('50')
            expect(row.children.item(2).innerHTML).to.equal('Fruit')
            expect(row.children.item(3).innerHTML).to.equal('50')
            expect(row.children.item(4).innerHTML).to.equal('2022-03-11 12:58:42.676354')

        })
    })
    context('Add 2 items', function(){
        it('Return true and update table with 2 items', function(){
            expect(addItem({Meal_Name:'apple',calories:50,Weight:50,Meal_Type:'Fruit',Date:'2022-03-11 12:58:42.676354'})).to.equal(true)
            expect(addItem({Meal_Name:'pear',calories:80,Weight:50,Meal_Type:'Fruit',Date:'2022-03-11 12:58:42.676354'})).to.equal(true)
            var tbBody= document.getElementById('UserData').children.item(0)
            expect(tbBody.childElementCount).to.equal(3)
            var row = tbBody.children.item(1)
            
            expect(row.children.item(0).innerHTML).to.equal('apple')
            expect(row.children.item(1).innerHTML).to.equal('50')
            expect(row.children.item(2).innerHTML).to.equal('Fruit')
            expect(row.children.item(3).innerHTML).to.equal('50')
            expect(row.children.item(4).innerHTML).to.equal('2022-03-11 12:58:42.676354')

            var row2 = tbBody.children.item(2)
            expect(row2.children.item(0).innerHTML).to.equal('pear')
            expect(row2.children.item(1).innerHTML).to.equal('80')
            expect(row2.children.item(2).innerHTML).to.equal('Fruit')
            expect(row2.children.item(3).innerHTML).to.equal('50')
            expect(row2.children.item(4).innerHTML).to.equal('2022-03-11 12:58:42.676354')


        })
    })
})