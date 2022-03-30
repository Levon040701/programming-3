let express = require('express');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);

app.use(express.static("."));

app.get('/', function (req, res) {
   res.redirect('index.html');
});

server.listen(3000, () => {
    console.log('connected');
});

const side = 25;

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
            } else if(randomSectionCursor <= 75){
                newMatrix[y][x] = 3;
            } else if(randomSectionCursor <= 77){
                newMatrix[y][x] = 4;
            } else if(randomSectionCursor <= 78){
                newMatrix[y][x] = 5;
            } else{
                newMatrix[y][x] = 0;
            }
        }
    }
    
    return newMatrix;
}

const matrix = createMatrix(25, 40);
io.sockets.emit('send matrix', matrix);

const Grass = require("./Classes/Grass");
const Herbivore = require("./Classes/Herbivore");
const Predator = require("./Classes/Predator");
const Hunter = require("./Classes/Hunter");
const PiedPiper = require("./Classes/PiedPiper");


function createObjectsMatrix(matrix){

    const newObjectMatrix = [];
    for(let y = 0; y < matrix.length; y++){
        newObjectMatrix[y] = [];
        for(let x = 0; x < matrix[y].length; x++){
            if(matrix[y][x] == 1){
                const newGrass = new Grass(x, y, 1, side, matrix, newObjectMatrix);
                newObjectMatrix[y][x] = newGrass;
            } else if(matrix[y][x] == 2){
                const newHerbivore = new Herbivore(x, y, 2, side, matrix, newObjectMatrix);
                newObjectMatrix[y][x] = newHerbivore;
            } else if(matrix[y][x] == 3){
                const newPredator = new Predator(x, y, 3, side, matrix, newObjectMatrix);
                newObjectMatrix[y][x] = newPredator;
            } else if(matrix[y][x] == 4){
                const newHunter = new Hunter(x, y, 4, side, matrix, newObjectMatrix);
                newObjectMatrix[y][x] = newHunter;
            } else if(matrix[y][x] == 5){
                const newPiedPiper = new PiedPiper(x, y, 5, side, matrix, newObjectMatrix);
                newObjectMatrix[y][x] = newPiedPiper;
            } else{
                newObjectMatrix[y][x] = null;
            }
        }
    }
    
    return newObjectMatrix;
}

const objectsMatrix = createObjectsMatrix(matrix);


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

setInterval(game, 1000);


io.on('connection', function (socket){
    
    createObjectsMatrix(matrix);
})