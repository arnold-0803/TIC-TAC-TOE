// THE GAME BOARD
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


// THE PLAYER FACTORY
function Player (name, marker) {
  return {name, marker};
};


// THE GAME CONTROLLER
const GameController = (function(){
  let players = [
    Player("Player X", "X"),
    Player("Player O", "O")
  ];

  let currentPlayerIndex = 0;
  let isGameOver = false;
  let gameStatus = `${players[currentPlayerIndex].name}'s turn`;

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
      gameStatus = (`${currentPlayer.name} wins!`);
      isGameOver = true;

      return;
    }

    if(checkTie()){
      gameStatus = ("It's a tie!");
      isGameOver = true;

      return;
    }

    switchPlayer();

    gameStatus = `${getCurrentPlayer().name}'s turn`;

  };

  const getGameStatus = () => {
    return gameStatus;
  }

  const restartGame = () => {
    Gameboard.resetBoard();
    currentPlayerIndex = 0;
    isGameOver = false;
    gameStatus = `${getCurrentPlayer().name}'s turn`;
  };

  const setPlayers = (name1, name2) => {
    players = [
      Player(name1 || "Player X", "X"),
      Player(name2 || "Player O", "O")
    ];

    gameStatus = `${getCurrentPlayer().name}'s turn`;
  }

  return {
    playerTurn,
    getGameStatus,
    restartGame,
    setPlayers
  };
  
})();


// THE DISPLAY CONTROLLER
const displayController = (function(){
  const boardDiv = document.querySelector(".board");
  const statusDiv = document.querySelector(".status");
  const resetBtn = document.querySelector(".reset");
  const startBtn = document.querySelector(".start-game");
  const playerOne = document.getElementById("player1");
  const playerTwo = document.getElementById("player2");

  const renderBoard = () => {
    boardDiv.textContent = "";

    statusDiv.textContent = GameController.getGameStatus();

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

  startBtn.addEventListener("click", () => {
    const name1 = playerOne.value;
    const name2 = playerTwo.value;

    GameController.setPlayers(name1, name2)
    GameController.restartGame();
    renderBoard();
  });

  resetBtn.addEventListener("click", () => {
    GameController.restartGame();
    renderBoard()
  });

  return {renderBoard};

})();

displayController.renderBoard();
