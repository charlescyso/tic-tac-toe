// board module
const gameBoard = (() => {
    let board = [
        '', '', '',
        '', '', '',
        '', '', ''
    ];

    return {board};
})();

// display module
const displayController = (() => {
    // variables
    const cells = document.querySelectorAll('.cell');


    // module functions
    const render = () => { // render gameBoard.board array onto DOM
        cells.forEach((cell, index) => cell.textContent = gameBoard.board[index]);
    };

    const clearForm = () => {
        document.querySelector('#player-one-name').value = '';
        document.querySelector('#player-two-name').value = '';
    }

    const updateMessage = () => {
        const message = document.querySelector('#message');

        if(gameController.getIsOver() == true && gameController.getTie() == true) {
            message.textContent = 'It\'s a tie!';
        } else if(gameController.getIsOver() == true) {
            message.textContent = `${gameController.getCurrentPlayer().getName()} won!`;
        } else {
            message.textContent = `It's ${gameController.getCurrentPlayer().getName()}'s turn!`;
        }
    };
    

    // events
    cells.forEach(cell => cell.addEventListener('click', (e) => { // cell
        // grabs index from data-index of selected div and throws it in gameController.playRound
        gameController.playRound(e.target.dataset.index);
        
        render();
        updateMessage();
    }));

    document.querySelector('#name-form').addEventListener('submit', (e) => { // change name button
        // prevent default submit function
        e.preventDefault();

        // get names
        const playerOneName = document.querySelector('#player-one-name').value;
        const playerTwoName = document.querySelector('#player-two-name').value;

        // change names
        if(playerOneName == '' || playerTwoName == '') {
            alert('Enter a valid name for Player 1 and Player 2');
            return;
        } else {
            gameController.player1.setName(playerOneName);
            gameController.player2.setName(playerTwoName);
        }
        // reset game and clear form
        gameController.resetGame();

        clearForm();
        render();
        updateMessage();
    });
    
    document.querySelector('#reset-btn').addEventListener('click', () => { // reset button
        gameController.resetGame();

        clearForm();
        render();
        updateMessage();
    });

    window.addEventListener('load', () => { // on load
        updateMessage();
    });

})();

// player factory
const Player = (mark, playerIndex) => {
    let name = `Player ${playerIndex}`
    
    const getMark = () => {
        return mark;
    }

    const setName = (newName) => {
        name = newName;
    }

    const getName = () => {
        return name;
    }

    return {getMark, setName, getName};
};

// game module
const gameController = (() => {
    // variables
    const player1 = Player('X', '1');
    const player2 = Player('O', '2');
    let round = 1;
    let isOver = false;
    let tie = false;


    // module functions
    const playRound = (index) => { // play a single round
        if(isOver === true) { // if game is already over, return
            return;
        }
        if(gameBoard.board[index] !== '') { // if cell has a mark, return
            return;
        } else {
        updateBoard(index);
        }
        if(checkWin(index)) {
            isOver = true;
            console.log('win');
            return;
        }
        if(gameOver()) {
            tie = true;
            isOver = true;
            console.log('tie');
            return;
        }

        round++;
    };

    const updateBoard = (index) => { // updates gameBoard.board array item with player's mark
        gameBoard.board[index] = getCurrentPlayer().getMark();
    };

    const getCurrentPlayer = () => { // gets current player, returns player2 (even) or player1 (odd)
        return round % 2 === 0 ? player2 : player1;
    }

    const checkWin = (index) => { // compares gameBoard.board array with win array
        const winConditions = [
            [0, 1, 2], // rows
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6], // columns
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8], // diagonals
            [2, 4, 6],
        ]

        if(winConditions.some(condition => condition.every(index => gameBoard.board[index] === getCurrentPlayer().getMark()))) {
            return true;
        } else {
            return false;
        }
    }

    const gameOver = () => {
        if(round === 9) {
            return true;
        }
    }

    const resetGame = () => {
        gameBoard.board = ['', '', '', '', '', '', '', '', ''];
        round = 1;
        isOver = false;
        tie = false;
        console.log('game reset');
    }

    const getIsOver = () => {
        return isOver; 
    }

    const getTie = () => {
        return tie;
    }

    return {playRound, getCurrentPlayer, resetGame, getIsOver, getTie, player1, player2};
})();