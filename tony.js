console.log('hello')
// const X_CLASS = 'x'
// const O_CLASS = "o"

const boardTurn = document.querySelector(".board");
const WINNING_COMB = [
    [0, 1, 2],
    [3, 4, 5], 
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const cellElements = document.querySelectorAll('[data-cell]');
const winningMessageElement = document.querySelector('#winningMessage');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const restartButton = document.querySelector("#restartButton");

restartButton.addEventListener('click', startGame());

let xTurn = true;

function startGame() {
    cellElements.forEach(cell => {
        cell.classList.remove('o');
        cell.classList.remove('x')
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true })
    })
    winningMessageElement.classList.remove('show')

}

function handleClick(event) {
    const cell = event.target
    const currentClass = xTurn ? 'x' : 'o';
    // place mark
    // check win
    // check draw
    // switch turns
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (checkDraw(currentClass)) {
        endGame(true);
    } else {
        swapTurn()
        setBoardHoverClass(xTurn)
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurn() {
    xTurn = !xTurn;
}

function setBoardHoverClass(bool) {
    if (bool) {
        boardTurn.classList.replace("o", "x");
        return;
    }
    boardTurn.classList.replace("x", "o");
}

function checkWin(currentClass) {
    return WINNING_COMB.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        })
    }) 
}

function checkDraw(currentClass) {
    return [...cellElements].every(cell => {
        return cell.classList.contains("x") || cell.classList.contains("o");
    })
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = "No Winner"
    } else {
        winningMessageTextElement.innerText = `Winner: ${xTurn ? "X" : "O"}`
    }
    winningMessageElement.classList.add('show');
}