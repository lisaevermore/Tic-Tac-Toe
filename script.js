const cellElements = document.querySelectorAll('[data-cell]')
const boardElement = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.getElementById('winningMessageText')
let isPlayer_O_Turn = false

const PLAYER_X_CLASS = 'x'
const PLAYER_O_CLASS = 'circle'
const WINNING_COMBINATIONS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
]

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
	isPlayer_O_Turn = false
	cellElements.forEach(cell => {
		cell.classList.remove(PLAYER_X_CLASS)
		cell.classList.remove(PLAYER_O_CLASS)
		cell.removeEventListener('click', handleCellClick)
		cell.addEventListener('click', handleCellClick, { once: true })
	})
	setBoardHoverClass()
	winningMessageElement.classList.remove('show')
}

function handleCellClick(e) {
	const cell = e.target
	const currentClass = isPlayer_O_Turn ? PLAYER_O_CLASS : PLAYER_X_CLASS
	placeMark(cell, currentClass)
	if (checkWin(currentClass)) {
		endGame(false)
	} else if (isDraw()) {
		endGame(true)
	} else {
		swapTurns()
		setBoardHoverClass()
	}
}
function endGame(draw) {
    if (draw) {
        winningMessageElement.innerText = "It's a Draw!"
        
    } else {
        winningMessageElement.innerText = `Player with ${isPlayer_O_Turn ? "O' s" : "X's"} Wins!`
    }
    winningMessageElement.classList.add('show')
    
}

function isDraw() {
	return [...cellElements].every(cell => {
		return cell.classList.contains(PLAYER_X_CLASS) || cell.classList.contains(PLAYER_O_CLASS)
	})
}
function placeMark(cell, currentClass) {
	cell.classList.add(currentClass)
}

function swapTurns() {
	isPlayer_O_Turn = !isPlayer_O_Turn
}

function setBoardHoverClass() {
	boardElement.classList.remove(PLAYER_X_CLASS)
	boardElement.classList.remove(PLAYER_O_CLASS)
	if (isPlayer_O_Turn) {
		boardElement.classList.add(PLAYER_O_CLASS)
	} else {
		boardElement.classList.add(PLAYER_X_CLASS)
	}
}

function checkWin(currentClass) {
	return WINNING_COMBINATIONS.some(combination => {
		return combination.every(index => {
			return cellElements[index].classList.contains(currentClass)
		})
	})
}

// let gameActive = true;
// let currentPlayer = 'X';
// let gameState = ['', '', '', '', '', '', '', '', ''];

// const winningMessage = () => `Player ${currentPlayer} has won!`;
// const drawMessage = () => `Game ended in a draw!`;
// const currentPlayerTurn = () => `Player ${currentPlayer}'s turn`;

// status.textContent = currentPlayerTurn();

// const handleCellClick = (e) => {
//   const cell = e.target;
//   const cellIndex = parseInt(cell.getAttribute('data-cell'));

//   if (gameState[cellIndex] !== '' || !gameActive) {
//     return;
//   }

//   cell.textContent = currentPlayer;
//   gameState[cellIndex] = currentPlayer;
//   handleResultValidation();
// };

//     function handleResultValidation() {
//         const winConditions = [
//             [0, 1, 2],
//             [3, 4, 5],
//             [6, 7, 8],
//             [0, 3, 6],
//             [1, 4, 7],
//             [2, 5, 8],
//             [0, 4, 8],
//             [2, 4, 6],
//         ];

//         let roundWon = false;
//         let winningCondition;

//         for (let i = 0; i < winConditions.length; i++) {
//             const [a, b, c] = winConditions[i];
//             const firstCell = gameState[a];
//             const secondCell = gameState[b];
//             const thirdCell = gameState[c];
//             if (firstCell === '' || secondCell === '' || thirdCell === '') {
//                 continue;
//             }

//             if (firstCell === secondCell && secondCell === thirdCell) {
//                 roundWon = true;
//                 winningCondition = winConditions[i];
//                 break;
//             }
//         }

//         if (roundWon) {
//             gameActive = false;
//             winningCondition.forEach((index) => {
//                 cells[index].classList.add('won');
//             });
//             status.textContent = winningMessage();
//             return;
//         }

//         let roundDraw = !gameState.includes('');
//         if (roundDraw) {
//             gameActive = false;
//             status.textContent = drawMessage();
//             return;
//         }

//         currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
//         status.textContent = currentPlayerTurn();
//     }
        
//         const handleRestart = () => {
//         gameActive = true;
//         currentPlayer = 'X';
//         gameState = ['', '', '', '', '', '', '', '', ''];
//         cells.forEach((cell) => {
//         cell.textContent = '';
//         cell.classList.remove('won');
//         });
//         status.textContent = currentPlayerTurn();
//         };
        
//         cells.forEach((cell) => {
//         cell.addEventListener('click', handleCellClick);
//         });
        
//         restartBtn.addEventListener('click', handleRestart); 
