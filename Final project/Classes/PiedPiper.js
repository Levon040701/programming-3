"use strict";

class PiedPiper extends LivingCreature{

    constructor(x, y, id, idMatrix, objectsMatrix){

        super(x, y, id, side, idMatrix, objectsMatrix);
        this.updateCoordinates();
    }

    chooseCell(characterId){

        super.updateCoordinates();
        return super.chooseCell(characterId);
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

        this.fight();
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

    fight(){

        const hunters = this.chooseCell(4);
        let huntersAdvantage = 0;
        for(let i = 0; i < hunters.length; i++){
            huntersAdvantage += this.objectsMatrix[hunters[i][1]][hunters[i][0]].energy;
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