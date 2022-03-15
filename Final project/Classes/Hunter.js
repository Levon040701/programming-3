"use strict";

class Hunter extends LivingCreature{

    constructor(x, y, id, idMatrix, objectsMatrix){

        super(x, y, id, side, idMatrix, objectsMatrix);
        this.energy = 8;
    }

    kill(){

        const herbivoresArround = super.chooseCell(2);
        const predatorsArround = super.chooseCell(3);
        const animalsArround = [];
        for(let i = 0; i < predatorsArround.length; i++){
            animalsArround.push(predatorsArround[i]);
        }
        for(let i = 0; i < herbivoresArround.length; i++){
            animalsArround.push(herbivoresArround[i]);
        }
        const newCell = random(animalsArround);

        if(newCell && this.energy > 0){
            const newX = newCell[0];
            const newY = newCell[1];

            this.idMatrix[newY][newX] = this.id;
            this.idMatrix[this.y][this.x] = 0;

            this.objectsMatrix[newY][newX] = this;
            this.objectsMatrix[this.y][this.x] = null;

            this.x = newX;
            this.y = newY;
            this.energy++;
        } else{
            super.move();
        }
    }

    update(){

        this.kill();
    }
}