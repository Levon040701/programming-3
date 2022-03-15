"use strict";

class Herbivore extends LivingCreature{

    constructor(x, y, id, side, idMatrix, objectsMatrix){

        super(x, y, id, side, idMatrix, objectsMatrix);
        this.energy = 8;
    }

    eat(){

        super.respond
        const targetCells = super.chooseCell(1);
        const newCell = random(targetCells);

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
        const newCell = random(targetCells);
        if(this.energy >= 12 && newCell){
            const newX = newCell[0];
            const newY = newCell[1];
            this.idMatrix[newY][newX] = this.id;
            const newHerbivore = new Herbivore(newX, newY, this.id, side, 0, 0, this.idMatrix, this.objectsMatrix);
            this.objectsMatrix[newY][newX] = newHerbivore;
        }
        this.energy = 8;
    }

    update(){

        this.eat();
    }
}