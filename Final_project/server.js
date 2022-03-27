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

var matrix = [[2, 2, 1, 2, 1, 0, 1],
[1, 2, 1, 0, 1, 1, 1],
[1, 0, 2, 0, 1, 0, 1],
[0, 1, 0, 1, 0, 0, 1],
[1, 2, 1, 0, 1, 1, 1],
[1, 0, 2, 0, 1, 0, 1],
[0, 1, 0, 1, 0, 1, 1],
[1, 2, 1, 0, 1, 1, 1],
[1, 0, 2, 0, 1, 0, 1],
[0, 1, 0, 1, 0, 0, 1],
[1, 2, 1, 0, 1, 1, 1],
[1, 0, 2, 0, 1, 0, 1],
[0, 1, 0, 1, 0, 0, 1]];


io.sockets.emit('send matrix', matrix);
// const side = 25;


/* function createMatrix(horizontalLength, verticalLength){
    for(let y = 0; y < verticalLength; y++){
        matrix[y] = [];
        console.log(matrix);
        
        for(let x = 0; x < horizontalLength; x++){
            const randomSectionCursor = Math.random() * 100;
            if(randomSectionCursor <= 35){
                matrix[y][x] = 1;
            } else if(randomSectionCursor <= 60){
                matrix[y][x] = 2;
            } else if(randomSectionCursor <= 75){
                matrix[y][x] = 3;
            } else if(randomSectionCursor <= 77){
                matrix[y][x] = 4;
            } else if(randomSectionCursor <= 78){
                matrix[y][x] = 5;
            } else{
                matrix[y][x] = 0;
            }
        }
    }
    return matrix
}
 */

// io.sockets.emit('send matrix', matrix);


// Grass = require("./Classes/Grass");
// Herbivore = require("./Classes/Herbivore");
// Predator = require("./Classes/Predator");
// Hunter = require("./Classes/Hunter");
// PiedPiper = require("./Classes/PiedPiper");


// function createObjectsMatrix(){
//     for(let y = 0; y < matrix.length; y++){
//         for(let x = 0; x < matrix[y].length; x++){
//             if(matrix[y][x] == 1){
//                 const newGrass = new Grass(x, y, 1, side, matrix, matrix);
//                 matrix[y][x] = newGrass;
//             } else if(matrix[y][x] == 2){
//                 const newHerbivore = new Herbivore(x, y, 2, side, matrix, matrix);
//                 matrix[y][x] = newHerbivore;
//             } else if(matrix[y][x] == 3){
//                 const newPredator = new Predator(x, y, 3, side, matrix, matrix);
//                 matrix[y][x] = newPredator;
//             } else if(matrix[y][x] == 4){
//                 const newHunter = new Hunter(x, y, 4, side, matrix, matrix);
//                 matrix[y][x] = newHunter;
//             } else if(matrix[y][x] == 5){
//                 const newPiedPiper = new PiedPiper(x, y, 5, side, matrix, matrix);
//                 matrix[y][x] = newPiedPiper;
//             } else{
//                 matrix[y][x] = null;
//             }
//         }
//     }
//     console.log(matrix);
    
//     io.sockets.emit('send matrix', matrix);
// }


// function game(){
//     for(let y = 0; y < matrix.length; y++){
//         for(let x = 0; x < matrix[y].length; x++){
//             const object = matrix[y][x];
//             if(object){
//                 object.update();
//             }
//         }
//     }
    
//     io.sockets.emit("send matrix", matrix);
// }

// setInterval(game, 1000)


io.on('connection', function (socket){
    console.log('okok');
    
    // createObjectsMatrix();
})