/*----- constants -----*/
const chess = {
    x: "X",
    o: "O"
}

/*----- state variables -----*/
const state = {
    currentPlayer: "X",
    winner: null,
    tie: false,
    board: ["", "", "", "", "", "", "", "", ""]
}

/*----- cached elements  -----*/
const container = document.querySelector(".container");
const info = document.querySelector(".info");
const restart = document.querySelector(".restart");
const player = document.querySelector(".player");

/*----- event listeners -----*/
restart.addEventListener("click", init);

for (let i = 0; i < container.children.length; i++) {
    container.children[i].addEventListener("click", selectChess);
}

/*----- functions -----*/
function init() {
    resetCell();
    state.currentPlayer = "X";
    state.winner = null;
    state.tie = false;
    resetInfo();
    render();
}

function selectChess(evt) {
    if (state. winner === null) {
        evt.preventDefault();
        const cell = evt.target;
        if (state.board[Number(cell.id[5]) - 1] === "") {
            if (state.currentPlayer === "X") {
                state.board[Number(cell.id[5]) - 1] = chess.x;
            } else {
                state.board[Number(cell.id[5]) - 1] = chess.o;
            }
        }
        const winner = checkWinner(state.board);
        if (winner !== null) {
            if (winner === "X") {
                state.winner = 1;
            } else {
                state.winner = 2;
            }
        }
        changeCurrentPlayer();
        checkTie();
        render();
    }
}

function resetInfo() {
    player.innerText = `Current Player: Player ${state.currentPlayer}`;
    info.innerText = "";
}

function render() {
    player.innerText = `Current Player: Player ${state.currentPlayer}`;
    for (let i = 0; i < container.children.length; i++) {
        container.children[i].innerText = state.board[i]; 
    }
    if (state.winner !== null) {
        info.innerText = `The winner is Player ${state.winner} !`;
    } else if (state.tie === true) {
        info.innerText = `Tie!`;
    }
}

function resetCell() {
    for (let i = 0; i < state.board.length; i++) {
        state.board[i] = "";
    }
}

function changeCurrentPlayer() {
    if (state.winner === null && state.tie === false) {
        if (state.currentPlayer === "X") {
            state.currentPlayer = "O";
        } else {
            state.currentPlayer = "X";
        }
    }
}

function checkTie() {
    let count = 0;
    state.board.forEach(function(cell) {
        if (cell !== "") {
            count += 1;
        }
    })
    if (state.winner === null && count === 9) {
        state.tie = true;
    }
}

function checkWinner(board) {
    const twoDBoard = [
        rowOne = board.slice(0, 3),
        rowTwo = board.slice(3, 6),
        rowThree = board.slice(6, 9),
    ]
    for (let i = 0; i < 3; i++) {
        if (twoDBoard[i][0] === twoDBoard[i][1] && twoDBoard[i][1] === twoDBoard[i][2] && twoDBoard[i][0] !== "") {
            return twoDBoard[i][0];
        }
    }

    for (let i = 0; i < 3; i++) {
        if (twoDBoard[0][i] === twoDBoard[1][i] && twoDBoard[1][i] === twoDBoard[2][i] && twoDBoard[0][i] !== "") {
            return twoDBoard[0][i];
        }
    }

    if (((twoDBoard[0][0] === twoDBoard[1][1] && twoDBoard[1][1] === twoDBoard[2][2])
        || (twoDBoard[2][0] === twoDBoard[1][1] && twoDBoard[1][1] === twoDBoard[0][2]))
        && twoDBoard[1][1] !== "") {
        return twoDBoard[1][1];
    }
    return null;
}

init();