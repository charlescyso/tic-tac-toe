// board module
const gameBoard = (() => {
    let board = [
        'X', 'O', 'X',
        'O', 'X', 'O',
        'X', 'O', 'X'
    ];

    return {board};
})();

// display module
const displayController = (() => {
    const cells = document.querySelectorAll('cell');



    const render = () => {
        cells.forEach(cell => cell.textContent = 'lol');
    };

    return {render};

})();

displayController.render();

// game module
const gameController = (() => {

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

        return // code that returns true if condition is met
    }
})();


// player factory
const Player = (mark) => {
    const getMark = () => mark;
    
    return {getMark};
};


// players
const player1 = Player('X');
const player2 = Player('O');