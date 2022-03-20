"use strict";

let LivingCreature = require('./Living_creature')

module.exports = class Predator extends LivingCreature{

    constructor(x, y, id, side, idMatrix, objectsMatrix){

        super(x, y, id, side, idMatrix, objectsMatrix);
        this.energy = 8;
    }

    eat(){

        super.respond
        const targetCells = super.chooseCell(2);
        const newCell = targetCells[Math.floor(Math.random() * targetCells.length)];

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

            this.spawn();
        } else{
            super.move();
        }
    }

    spawn(){

        const targetCells = super.chooseCell(0);
        const newCell = targetCells[Math.floor(Math.random() * targetCells.length)];
        if(this.energy >= 12 && newCell){
            const newX = newCell[0];
            const newY = newCell[1];
            this.idMatrix[newY][newX] = this.id;
            const newPredator = new Predator(newX, newY, this.id, side, 0, 0, this.idMatrix, this.objectsMatrix);
            this.objectsMatrix[newY][newX] = newPredator;
        }
        this.energy = 8;
    }

    update(){

        this.eat();
    }
}