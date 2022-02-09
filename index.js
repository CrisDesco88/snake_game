
const grid = document.querySelector('.grid');
const startBtn = document.querySelector('#start');
const score = document.querySelector('#score');
let squares = [];

function createGrid () {
    for(let i = 0; i < 100; i++) {
        const square = document.createElement('div');
        console.log(square);
        square.classList.add('squareStyle');
        grid.appendChild(square);
        squares.push(square);
    }        
}
 createGrid();