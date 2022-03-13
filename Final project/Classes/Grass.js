"use strict";

class Grass extends Living_creature{

    constructor(x, y, id, idMatrix, objectsMatrix){

        super(x, y, id);
        this.idMatrix = idMatrix;
        this.objectsMatrix = objectsMatrix;
        this.energy = 0;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];    
    }

    chooseCell(characterId){

        super.chooseCell(characterId);
    }

    spawn(){

        this.energy++;
        const targetCells = this.chooseCell(0);
        const newCell = random(targetCells);
        if(this.energy >= 6 && newCell){
            const newX = newCell[0];
            const newY = newCell[1];
            this.idMatrix[newY][newX] = this.id;
            const newGrass = new Grass(newX, newY, this.id, this.idMatrix, this.objectsMatrix);
            this.objectsMatrix[newY][newX] = newGrass;
            this.energy = 0;
        }
    }

    update(){

        this.spawn();
    }
}