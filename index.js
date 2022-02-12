
const grid = document.querySelector('.grid');
const startBtn = document.querySelector('#start');
const scoreDisplay = document.querySelector('#score');
let squares = [];
let currentSnake = [2,1,0];
let direction = 1;
const width = 10;
let appleIndex = 0;
let score = 0;
let intervalTime = 1000;
let speed = 0.9;
let timerId = 0;

function createGrid () {
    for(let i = 0; i < width*width; i++) {
        const square = document.createElement('div');
        square.classList.add('squareStyle');
        grid.appendChild(square);
        squares.push(square);
    }        
}
 createGrid();

 currentSnake.forEach(index => squares[index].classList.add('snake'));


 function startGame() {
    currentSnake.forEach(index => squares[index].classList.remove('snake'));
    squares[appleIndex].classList.remove('apples');
    clearInterval(timerId);
    currentSnake = [2,1,0];
    direction = 1;
    score = 0;
    scoreDisplay.textContent = score;
    intervalTime = 1000;
    speed = 0.9;
    generateApples();
    currentSnake.forEach(index => squares[index].classList.add('snake'));
    timerId = setInterval(move, intervalTime);
 }   

 function move() {
     if (
         (currentSnake[0] + width >= width*width && direction === width) ||   //si cabeza de la serpiente toca el fondo
         (currentSnake[0] - width < 0 && direction === -width) ||     //si cabeza de la serpiente toca arriba
         (currentSnake[0] % width === 0 && direction === -1) ||    //si cabeza de la serpiente toca izquierda
         (currentSnake[0] % width === width - 1 && direction === 1) ||       //si cabeza de la serpiente toca derecha
         squares[currentSnake[0] + direction].classList.contains('snake')
     )  
     return clearInterval(timerId); 

     const tail = currentSnake.pop();
     squares[tail].classList.remove('snake');
     const headAdd = currentSnake.unshift(currentSnake[0] + direction);
     squares[currentSnake[0]].classList.add('snake');

     if(squares[currentSnake[0]].classList.contains('apples')) {
         squares[currentSnake[0]].classList.remove('apples');
         squares[tail].classList.add('snake');
         currentSnake.push(tail);
         generateApples();
         score += 10;
         scoreDisplay.textContent = score;
         clearInterval(timerId);
         intervalTime *= speed;
         timerId = setInterval(move, intervalTime);
     }
 }

function generateApples () {
    do {
        appleIndex = Math.floor(Math.random() * squares.length);
    } while(squares[appleIndex].classList.contains('snake'));

    squares[appleIndex].classList.add('apples');
}

generateApples();


 function control (e) {
     if (e.keyCode === 39) {                   // 39 is right arrow
         direction = 1;
     } else if (e.keyCode === 37){             // 37 is for the left arrow
        direction = -1;
     } else if (e.keyCode === 38){             // 38 is for the up arrow
        direction = -width;
     } else if (e.keyCode === 40){             // 40 is for the down arrow
        direction = +width;
     }
 }

 document.addEventListener('keydown', control);
 startBtn.addEventListener('click', startGame);