"use strict";

class Grass extends LivingCreature{

    constructor(x, y, id, idMatrix, objectsMatrix){

        super(x, y, id);
        this.idMatrix = idMatrix;
        this.objectsMatrix = objectsMatrix;
    }

    chooseCell(characterId){

        return super.chooseCell(characterId);
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