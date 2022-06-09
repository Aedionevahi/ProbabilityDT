function Character (attribute, skill) {
    this.attribute = attribute;
    this.skill = skill;
}

Character.prototype.createBranch = function(points, challenge){
        //zmien this.attribute na usableAttribute
        let usablePoints = Math.min(points, 19-this.attribute+challenge) // abs żeby nie przekraczać 0 (w 2gim)
        let probArr = [[(this.attribute-challenge)/20,0,0]] // nie przekracznie 100%
        for (let i = 0; i < usablePoints; i++) probArr.push([1/20,0,i+1]);
        probArr.push([(20-this.attribute-usablePoints+challenge)/20,1,0]) // nie wychodź poza skalę, sprawdź przed
        console.log(probArr)
        return probArr
}

Character.prototype.oneRoll = function (challenge = 0, roll = 1, fails = 0, points = this.skill) {
    let sum = 0;

    //check for edge cases PRZENIEŚĆ BEFORE ONE ROLL
    if (this.attribute - challenge <= 0) console.log('-1 Dice');
    else if (this.attribute - challenge > 20) console.log('legendary statistic'); //zmniejsz statystykę do rzutu
    else var probArr = this.createBranch(points, challenge); //try catch

    for (let prob of probArr) {
        if ( fails + prob[1] < 2 ) {
            sum += ( roll < 3 ? this.oneRoll(challenge, roll+1, fails+prob[1], points-prob[2]) * prob[0] : prob[0] )
            console.log(prob[0], roll)
        }
    }
    return sum
}

//magia - 20 nakłada 2 faile i tyle
//add probNode object
const character = new Character(17,8)
console.log(character.oneRoll(11))
//console.log(character.createBranch(15,5))