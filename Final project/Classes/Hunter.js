"use strict";

class Hunter extends LivingCreature{

    constructor(x, y, id, idMatrix, objectsMatrix){

        super(x, y, id);
        this.killedAnimals = 0;
        this.idMatrix = idMatrix;
        this.objectsMatrix = objectsMatrix;
        this.updateCoordinates();
    }

    updateCoordinates(){

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

        this.updateCoordinates();
        return super.chooseCell(characterId);
    }

    kill(){

        const herbivoresArround = this.chooseCell(2);
        const predatorsArround = this.chooseCell(3);
        const animalsArround = [];
        for(let i = 0; i < predatorsArround.length; i++){
            animalsArround.push(predatorsArround[i]);
        }
        for(let i = 0; i < herbivoresArround.length; i++){
            animalsArround.push(herbivoresArround[i]);
        }
        const newCell = random(animalsArround);

        if(newCell && this.killedAnimals > -8){
            const newX = newCell[0];
            const newY = newCell[1];

            this.idMatrix[newY][newX] = this.id;
            this.idMatrix[this.y][this.x] = 0;

            this.objectsMatrix[newY][newX] = this;
            this.objectsMatrix[this.y][this.x] = null;

            this.x = newX;
            this.y = newY;
            this.killedAnimals++;
        } else{
            this.move();
        }
    }

    move(){

        const targetCells = this.chooseCell(0);
        const newCell = random(targetCells);

        if(newCell && this.killedAnimals > -8){
            const newX = newCell[0];
            const newY = newCell[1];

            this.idMatrix[newY][newX] = this.id;
            this.idMatrix[this.y][this.x] = 0;

            this.objectsMatrix[newY][newX] = this;
            this.objectsMatrix[this.y][this.x] = null;

            this.x = newX;
            this.y = newY;
        }
        this.killedAnimals--;

        this.die();
    }

    die(){

        if(this.killedAnimals <= -8){
            this.idMatrix[this.y][this.x] = 0;
            this.objectsMatrix[this.y][this.x] = null;
        }
    }

    update(){

        this.kill();
    }
}