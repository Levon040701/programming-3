"use strict";

class Predator{

    constructor(x, y, id, side, idMatrix, objectsMatrix){

        this.x = x;
        this.y = y;
        this.id = id;
        this.side = side;
        this.energy = 8;
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

        this.die();
    }

    computeDistance(x1, y1, x2, y2){

        const distance = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
        return distance;
    }

    respond(){

        let PiedPiperX = -1;
        let PiedPiperY = -1;
        for(let y = 0; y < this.idMatrix.length; y++){
            for(let x = 0; x < this.idMatrix[y].length; x++){
                if(this.idMatrix[y][x] = 5 && this.computeDistance(this.x, this.y, x, y) / side <= 8){
                    PiedPiperX = x;
                    PiedPiperY = y;
                }
            }
        }
        const targetCells = this.chooseCell(0);
        if(PiedPiperX >= 0 && PiedPiperY >= 0 && this.energy > 0){
            const distances = [];
            for(let i = 0; i < targetCells.length; i++){
                distances.push(this.computeDistance(targetCells[i][0], targetCells[i][1], witchX, witchY));
            }

            let minimalDistanceIndex = 0;
            for(let i = 0; i < distances.length; i++){
                if(distances[i] < distance[minimalDistanceIndex]){
                    minimalDistanceIndex = i;
                }
            }

            const newX = targetCells[minimalDistanceIndex][0];
            const newY = targetCells[minimalDistanceIndex][1];

            this.idMatrix[newY][newX] = this.id;
            this.idMatrix[this.y][this.x] = 0;

            this.objectsMatrix[newY][newX] = this;
            this.objectsMatrix[this.y][this.x] = null;

            this.x = newX;
            this.y = newY;
        }
    }

    die(){

        if(this.energy <= 0){
            this.idMatrix[this.y][this.x] = 0;
            this.objectsMatrix[this.y][this.x] = null;
        }
    }

    update(){

        this.eat();
    }
}