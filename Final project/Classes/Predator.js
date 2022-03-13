"use strict";

class Predator extends LivingCreature{

    constructor(x, y, id, side, idMatrix, objectsMatrix){

        super(x, y, id, side, idMatrix, objectsMatrix);
        this.side = side;
        this.energy = 8;
        this.updateCoordinates();
    }

    chooseCell(characterId){

        super.updateCoordinates();
        return super.chooseCell(characterId);
    }

    eat(){

        this.respond
        const targetCells = this.chooseCell(2);
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
            this.move();
        }
    }

    spawn(){

        const targetCells = this.chooseCell(0);
        const newCell = random(targetCells);
        if(this.energy >= 12 && newCell){
            const newX = newCell[0];
            const newY = newCell[1];
            this.idMatrix[newY][newX] = this.id;
            const newPredator = new Predator(newX, newY, this.id, side, 0, 0, this.idMatrix, this.objectsMatrix);
            this.objectsMatrix[newY][newX] = newPredator;
        }
        this.energy = 8;
    }

    move(){

        const targetCells = this.chooseCell(0);
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
            this.energy--;
        }

        super.die();
    }

    update(){

        this.eat();
    }
}