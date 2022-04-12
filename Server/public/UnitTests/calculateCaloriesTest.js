

describe('#calculateCalories()', function(){
    context('List containing invalid argument', function(){
        it('should ignore argument', function(){
            const calories = [10, 80, 240, '11']
            expect(calculateCalories(calories)).to.equal(330)
        })
    })
    context('Correct Arguments', function(){
        it('should calculate calories', function(){
            const calories = [10, 80, 24.9, -10]
            expect(calculateCalories(calories)).to.equal(104.9)
        })
    })
})