var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
   res.redirect('index.html');
});

server.listen(3000, () => {
    console.log('connected');
});

matrix = [];

function createMatrix(horizontalLength, verticalLength){
    for(let y = 0; y < verticalLength; y++){
        matrix[y] = [];
        for(let x = 0; x < horizontalLength; x++){
            const randomSectionCursor = Math.random() * 100;
            if(randomSectionCursor <= 35){
                matrix[y][x] = 1;
            } else if(randomSectionCursor <= 60){
                matrix[y][x] = 2;
            } else{
                matrix[y][x] = 0;
            }
        }
    }

    return matrix;
}

const objectsMatrix = createObjectsMatrix(matrix);

io.sockets.emit('send matrix', createMatrix(25,25));

grassArr = [];
herbivoreArr = [];

Grass = require("./Classes/Grass");
Herbivore = require("./Classes/Herbivore");

function createObjectsMatrix(matrix){

    const newObjectMatrix = [];
    for(let y = 0; y < matrix.length; y++){
        newObjectMatrix[y] = [];
        for(let x = 0; x < matrix[y].length; x++){
            if(matrix[y][x] == 1){
                const newGrass = new Grass(x, y, 1, matrix, newObjectMatrix);
                newObjectMatrix[y][x] = newGrass;
            } else if(matrix[y][x] == 2){
                const newHerbivore = new Herbivore(x, y, 2, side, matrix, newObjectMatrix);
                newObjectMatrix[y][x] = newHerbivore;
            } else if(matrix[y][x] == 3){
                const newPredator = new Predator(x, y, 3, side, matrix, newObjectMatrix);
                newObjectMatrix[y][x] = newPredator;
            } else if(matrix[y][x] == 4){
                const newHunter = new Hunter(x, y, 4, matrix, newObjectMatrix);
                newObjectMatrix[y][x] = newHunter;
            } else if(matrix[y][x] == 5){
                const newPiedPiper = new PiedPiper(x, y, 5, matrix, newObjectMatrix);
                newObjectMatrix[y][x] = newPiedPiper;
            } else{
                newObjectMatrix[y][x] = null;
            }
        }
    }

    io.sockets.emit('send matrix', matrix);

    return newObjectMatrix;
}


function game(){

    for(let y = 0; y < objectsMatrix.length; y++){
        for(let x = 0; x < objectsMatrix[y].length; x++){
            const object = objectsMatrix[y][x];
            if(object){
                object.update();
            }
        }
    }
    
    io.sockets.emit("send matrix", matrix);
}

setInterval(game, 1000)


io.on('connection', function (socket){

    createObject(matrix);
})