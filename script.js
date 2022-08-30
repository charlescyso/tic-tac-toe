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
    const cells = document.querySelectorAll('.cell');

    // render gameBoard.board array onto DOM
    const render = () => {
        cells.forEach((cell, index) => cell.textContent = gameBoard.board[index]);
    };


    // events
    cells.forEach(cell => cell.addEventListener('click', (event) => {
        gameController.playRound(event.target.dataset.index);
        render();
    }));
})();

// player factory
const Player = (mark) => {
    const getMark = () => {
        return mark;
    }

    return {getMark};
};

// game module
const gameController = (() => {
    const player1 = Player('X');
    const player2 = Player('O');
    let round = 1;

    // play a single round
    const playRound = (index) => {
        if (gameBoard.board[index] !== '') {
            return;
        } else {
        updateBoard(index);
        round++;
    }};

    // updates gameBoard.board array item with player's mark
    const updateBoard = (index) => {
        gameBoard.board[index] = getCurrentPlayer().getMark();
    };

    const getCurrentPlayer = () => {
        return round % 2 === 0 ? player2 : player1;
    }

    // const checkWin = () => {
    //     const winConditions = [
    //         [0, 1, 2], // rows
    //         [3, 4, 5],
    //         [6, 7, 8],
    //         [0, 3, 6], // columns
    //         [1, 4, 7],
    //         [2, 5, 8],
    //         [0, 4, 8], // diagonals
    //         [2, 4, 6],
    //     ];
    // }

    return {playRound};
})();