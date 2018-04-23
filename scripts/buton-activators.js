/*
// Activates the button that allows the players to start the game
// the game is not instantiated yet, so it cant be part of the MemoryGame class
*/
function activateNewGameButton(){
  $('#one-player-button, #two-players-button').click(function(e){
    var playerCount =  $(this).attr('number');
    var game = new MemoryGame();
    game.startGame(playerCount);
  });
}

/*
// Activates the button that shows the rules
// the game is not instantiated yet, so it cant be part of the MemoryGame class
*/
function activateRulesButton(){
  $("#show-rules").on("click", function(){
    $('#instructionsModal').modal('show');
  })
}


/*
// Activates the button that asks if the player is ready
*/
MemoryGame.prototype.activateReadyButton = function(){
  $("#ready-button").one("click", () =>{
    this.startTurn();
  })
}

/*
// Activates the button that asks players if they want to play again
*/
MemoryGame.prototype.activatePlayAgainButton = function(){
  $("#play-again").on("click", () => {
    this.clearController();
    this.sayNothing();
    this.askHowManyPlayers();
    this.clearAllCards();
    this.resetPlayerPoints();
    this.updateTimer(0);
    activateNewGameButton();
    activateRulesButton();
  })
}

/*
// Activates the buttons on the back of the cards so that players may anser the questions
*/
MemoryGame.prototype.activateAnswerButtons = function(){
  $(".answer-button").one("click", (e) => {
    var cardIndex = $(e.target).parent().parent().parent().parent().attr("card-number");
    var answerGiven = $(e.target).text();
    this.isItTheRightAnswer(answerGiven, cardIndex);
  })
}