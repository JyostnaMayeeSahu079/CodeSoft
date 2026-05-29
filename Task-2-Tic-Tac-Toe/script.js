const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");
const body = document.body;

let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const human = "X";
const ai = "O";

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

cells.forEach(cell => {
    cell.addEventListener("click", handleClick);
});

restartBtn.addEventListener("click", restartGame);

function handleClick(e){

    const index = e.target.dataset.index;

    if(board[index] !== "" || !gameActive) return;

    makeMove(index, human);

    if(checkWinner(board, human)){

        statusText.innerHTML = "🎉 YOU WIN!";
        body.className = "human-win";
        gameActive = false;

        return;
    }

    if(isDraw()){

        statusText.innerHTML = "🤝 IT'S A DRAW!";
        body.className = "draw";

        return;
    }

    statusText.innerHTML = "🤖 AI THINKING...";

    setTimeout(() => {

        aiMove();

        if(checkWinner(board, ai)){

            statusText.innerHTML = "🤖 AI WINS!";
            body.className = "ai-win";
            gameActive = false;

            return;
        }

        if(isDraw()){

            statusText.innerHTML = "🤝 IT'S A DRAW!";
            body.className = "draw";

            return;
        }

        statusText.innerHTML = "🔥 YOUR TURN";
    }, 500);
}

function makeMove(index, player){

    board[index] = player;
    cells[index].innerHTML = player;
}

function aiMove(){

    let bestScore = -Infinity;
    let move;

    for(let i = 0; i < board.length; i++){

        if(board[i] === ""){

            board[i] = ai;

            let score = minimax(board, 0, false);

            board[i] = "";

            if(score > bestScore){

                bestScore = score;
                move = i;
            }
        }
    }

    makeMove(move, ai);
}

function minimax(board, depth, isMaximizing){

    if(checkWinner(board, ai)) return 10 - depth;
    if(checkWinner(board, human)) return depth - 10;
    if(isDrawBoard(board)) return 0;

    if(isMaximizing){

        let bestScore = -Infinity;

        for(let i = 0; i < board.length; i++){

            if(board[i] === ""){

                board[i] = ai;

                let score = minimax(board, depth + 1, false);

                board[i] = "";

                bestScore = Math.max(score, bestScore);
            }
        }

        return bestScore;

    } else {

        let bestScore = Infinity;

        for(let i = 0; i < board.length; i++){

            if(board[i] === ""){

                board[i] = human;

                let score = minimax(board, depth + 1, true);

                board[i] = "";

                bestScore = Math.min(score, bestScore);
            }
        }

        return bestScore;
    }
}

function checkWinner(board, player){

    return winPatterns.some(pattern => {

        return pattern.every(index => board[index] === player);
    });
}

function isDraw(){

    return board.every(cell => cell !== "");
}

function isDrawBoard(tempBoard){

    return tempBoard.every(cell => cell !== "");
}

function restartGame(){

    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;

    cells.forEach(cell => {

        cell.innerHTML = "";
    });

    statusText.innerHTML = "🔥 YOUR TURN";

    body.className = "";
}