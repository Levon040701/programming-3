"use strict";

class PiedPiper{

    constructor(x, y, id, idMatrix, objectsMatrix){

        this.x = x;
        this.y = y;
        this.id = id;
        this.energy = 0;
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
        const found = [];

        for(let i = 0; i < this.directions.length; i++){
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if(x >= 0 && x < this.idMatrix[0].length && y >= 0 && y < this.idMatrix.length){
                if(this.idMatrix[y][x] == characterId){
                    found.push(this.directions[i]);
                }
            }
        }

        return found;
    }

    move(){

        const targetCells = this.chooseCell(0);
        const newCell = random(targetCells);

        if(newCell){
            const newX = newCell[0];
            const newY = newCell[1];

            this.idMatrix[newY][newX] = this.id;
            this.idMatrix[this.y][this.x] = 0;

            this.objectsMatrix[newY][newX] = this;
            this.objectsMatrix[this.y][this.x] = null;

            this.x = newX;
            this.y = newY;
        }

        this.die();
    }

    kill(){

        const killGrass = this.chooseCell(1);
        const killHerbivore = this.chooseCell(2);
        const killPredator = this.chooseCell(3);
        const kill = [];
        for(let i = 0; i < killGrass.length; i++){
            kill.push(killGrass[i]);
        }
        for(let i = 0; i < killHerbivore.length; i++){
            kill.push(killHerbivore[i]);
        }
        for(let i = 0; i < killPredator.length; i++){
            kill.push(killPredator[i]);
        }

        for(let i = 0; i < kill.length; i++){
            const victimX = kill[i][0];
            const victimY = kill[i][1];
            this.idMatrix[victimY][victimX] = 0;
            this.objectsMatrix[victimY][victimX] = null;
            this.energy++;
        }
    }

    die(){

        const hunters = this.chooseCell(4);
        let huntersAdvantage = 0;
        for(let i = 0; i < hunters.length; i++){
            huntersAdvantage += this.objectsMatrix[hunters[i][1]][hunters[i][0]].killedAnimals;
        }
        if(this.energy / 5 < huntersAdvantage){
            this.idMatrix[this.y][this.x] = 0;
            this.objectsMatrix[this.y][this.x] = null;
        } else{
            for(let i = 0; i < hunters.length; i++){
                const hunterX = hunters[i][0];
                const hunterY = hunters[i][1];
                this.idMatrix[hunterY][hunterX] = 0;
                this.objectsMatrix[hunterY][hunterX] = null;
            }
        }
    }

    update(){

        this.move();
        this.kill();
    }
}