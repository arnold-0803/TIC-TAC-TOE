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
console.log(Gameboard);


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
    currentPlayerIndex= currentPlayerIndex === 0 ? 1 : 0;
  };

  const checkWinner = () => {

  };

  const checkTie = () => {

  };

  const playerTurn = () => {
    
  };
  
})();


const displayController = (function(){

}());
