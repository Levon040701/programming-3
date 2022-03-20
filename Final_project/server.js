var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var socket = io();

app.use(express.static("."));

app.get('/', function (req, res) {
   res.redirect('index.html');
});

server.listen(3000);

 m = 20;
 n = 25;
 speed = 5;

 side = 25;
 X = side * n;
 Y = side * m;

function setup(){

    createCanvas(X, Y);
    background("#fff");
    frameRate(speed);
}

matrix = [];

function createMatrix(horizontalLength, verticalLength){

    const newMatrix = [];
    for(let y = 0; y < verticalLength; y++){
        newMatrix[y] = [];
        for(let x = 0; x < horizontalLength; x++){
            const randomSectionCursor = Math.random() * 100;
            if(randomSectionCursor <= 35){
                newMatrix[y][x] = 1;
            } else if(randomSectionCursor <= 60){
                newMatrix[y][x] = 2;
            } else{
                newMatrix[y][x] = 0;
            }
        }
    }

    return newMatrix;
}

matrix = createMatrix(n, m)

io.sockets.emit('send matrix', matrix);



function drawMatrix(matrix){

    for(let y = 0; y < matrix.length; y++){
        for(let x = 0; x < matrix[y].length; x++){
            if(matrix[y][x] == 1){
                fill("green");
            } else if(matrix[y][x] == 2){
                fill("yellow");
            } else{
                fill("grey");
            }
            rect(x * side, y * side, side, side);
        }
    }
}

setInterval(
    function(){
        socket.on("send matrix", drawMatrix)
    1000}
)

grassArr = [];
herbivoreArr = [];

Grass = require("./Grass");
Herbivore = require("./Herbivore");

function draw(){

    if(findObjects(1) == 0){
        let x = findEmptyCells(matrix)[0];
        let y = findEmptyCells(matrix)[1];
        let newGrass = new Grass(x, y, 1, matrix, objectsMatrix);
        objectsMatrix[y][x] = newGrass;
    }
    if(findObjects(2) <= 10){
        let x = findEmptyCells(matrix)[0];
        let y = findEmptyCells(matrix)[1];
        let newHerbivore = new Herbivore(x, y, 2, side, matrix, objectsMatrix);
        objectsMatrix[y][x] = newHerbivore;
    }
    drawMatrix(matrix);
    updateObjectsMatrix(objectsMatrix);

    io.sockets.emit("send matrix", matrix);
}

function game(){

    updateObjectsMatrix(objectsMatrix);
}