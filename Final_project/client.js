var socket = io();

const m = +prompt("Heigth:");
const n = +prompt("Width:");
const speed = +prompt("Speed:")

const side = 25;
const X = side * n;
const Y = side * m;

function setup(){

    createCanvas(X, Y);
    background("#fff");
    frameRate(speed);
}

function drawMatrix(matrix){

    for(let y = 0; y < matrix.length; y++){
        for(let x = 0; x < matrix[y].length; x++){
            if(matrix[y][x] == 1){
                fill("green");
            } else if(matrix[y][x] == 2){
                fill("yellow");
            }/* else if(matrix[y][x] == 3){
                fill("red");
            } else if(matrix[y][x] == 4){
                fill("blue");
            } else if(matrix[y][x] == 5){
                fill("black");
            }*/ else{
                fill("grey");
            }
            rect(x * side, y * side, side, side);
        }
    }
}

setInterval(
    function () {
        socket.on('send matrix', drawMatrix)
    }, 1000
)