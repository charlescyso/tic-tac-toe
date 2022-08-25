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
        gameController.updateBoard(event.target.dataset.index);
        render();
    }));
})();

// game module
const gameController = (() => {

    // updates gameBoard.board array item with player's mark
    const updateBoard = (index) => {
        gameBoard.board[index] = player1.getMark();
    };



    const checkWin = () => {
        const winConditions = [
            [0, 1, 2], // rows
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6], // columns
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8], // diagonals
            [2, 4, 6],
        ];
    }

    return {updateBoard};
})();


// player factory
const Player = (mark) => {
    const getMark = () => mark;
    
    return {getMark};
};


// players
const player1 = Player('X');
const player2 = Player('O');