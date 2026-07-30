const  Gameboard  = (function(){
  let board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;

  const placeMarker = (index, marker) => {
    if(board[index] === ""){
      board[index] = marker;

      return true;
    }else{
      return false;
    }
  };

  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
  }

  return {getBoard, placeMarker, resetBoard};
  
})();

console.log(Gameboard.getBoard());


function Player (name, marker) {
  return {name, marker};
};


const GameController = (function(){
  let players = [
    Player("Player X", "X"),
    Player("Player O", "O")
  ];

  let currentPlayerIndex = 0;
  let isGameOver = false;

  const winPattern = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  const getCurrentPlayer = () => {
    return players[currentPlayerIndex];
  };

  const switchPlayer = () => {
    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
  };

  const checkWinner = () => {
    const board = Gameboard.getBoard();

    for(let i = 0; i < winPattern.length; i++){
      const [a, b, c] = winPattern[i];

      if(
        board[a] !== "" &&
        board[a] === board[b] &&
        board[b] === board[c]
      ){
        return true;
      }
    }

    return false;
  };

  const checkTie = () => {
    return !checkWinner() && Gameboard.getBoard().every(cell => cell !== "");
  };

  const playerTurn = (index) => {
    if(isGameOver) return;

    const currentPlayer = getCurrentPlayer();
    const moveMade = Gameboard.placeMarker(index, currentPlayer.marker);

    if(!moveMade) return;

    if(checkWinner()){
      console.log(`${currentPlayer.name} wins!`);
      isGameOver = true;

      return;
    }

    if(checkTie()){
      console.log("It's a tie!");
      isGameOver = true;

      return;
    }

    switchPlayer();

  };

  return {playerTurn};
  
})();


const displayController = (function(){
  const boardDiv = document.querySelector(".board");

  const renderBoard = () => {
    boardDiv.textContent = "";

    // const boardCell = document.createElement("div");
    // boardCell.classList.add("board-cell");

    Gameboard.getBoard().forEach((marker, index) => {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.index = index;
      cell.textContent = marker;

      cell.addEventListener("click", () => {
        GameController.playerTurn(index);

        renderBoard();
      });

      boardDiv.appendChild(cell);
    });

  }

  return {renderBoard};

})();

displayController.renderBoard();
