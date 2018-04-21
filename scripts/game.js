const second = 1000;

var MemoryGame = function(){
  this.numberOfPlayers;
  this.playerOnePoints = 0;
  this.playerTwoPoints = 0;
  this.currentRound = 1;
  this.currentPlayersTurn = 1;
  this.currentDeck;
  this.currentCards = [];
  this.currentQuestion = "";
  this.currentCorrectAnswer = "";
  this.numberOfRightClicks = 0;
  this.isGameOver = false;
  this.winner;
  this.countDown;
  this.currentTimeLimit = 14;
}


/*
// Starts the game
*/
MemoryGame.prototype.startGame = function(players){
  this.clearController();
  this.sayNothing();
  this.numberOfPlayers = players;
  this.setTurn();
}

/*
// Sets the turn
*/ 
MemoryGame.prototype.setTurn = function(){
  this.numberOfRightClicks = 0;
  this.setDeck();
  this.setRandomQuestion();
  this.getFourRandomCards();
  this.askAreYouReady();
  this.activateReadyButton();
}

/*
// After the player has declared that they are ready
// this handles showing to them the cards, hiding them,
// and starts the wait for the player to answer
*/
MemoryGame.prototype.startTurn = function(){
  this.updateTimer("0");
  this.sayNothing();
  this.clearController();
  setTimeout(() => {
    this.flipCardsUp();
    setTimeout(() => {
      this.flipCardsDown();
      setTimeout(() => {
        this.sayQuestion();
        setTimeout(() => {
          this.turnWaitForAnswers();
        }, second * 1);
      }, second * 1);
    }, second * 6);
  }, second * 1);
}


/*
// Wait for the player to answer, start the time limit
*/
MemoryGame.prototype.turnWaitForAnswers = function(){
  this.showAnswerButtons();
  this.activateAnswerButtons();
  this.startTimeLimit();
}


/*
// Ends the turn
*/
MemoryGame.prototype.endTheTurn = function(){
  this.clearAllCards();
  this.togglePlayer();
  this.setTurn();
}


/*
// Handles finishing the game for one player
*/
MemoryGame.prototype.onePlayerGameOver = function(){
  setTimeout(() => {
    // alert("game over\n" + "you scored " + this.playerOnePoints + " points");
    $("#gameOverModalContent").text("Game over :( " + "you scored " + this.playerOnePoints + " points.");
    $("#gameOverModal").modal("show");
    this.askToPlayAgain();
  }, second * 1);
}

/*
// Handles finishing the game for two players
*/
MemoryGame.prototype.twoPlayerGameOver = function(){
  setTimeout(() => {
    $("#gameOverModalContent").text(this.winner + " has won the game!!!");
    $("#gameOverModal").modal("show");
    this.askToPlayAgain();
  }, second * 1);
}
