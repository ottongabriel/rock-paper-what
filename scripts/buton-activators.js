/*
// Activates the button that allows the players to start the game
// the game is not instantiated yet, so it cant be part of the MemoryGame class
*/
function activateNewGameButton(){
  $('#one-player-button, #two-players-button').click(function(e){
    var playerCount =  $(this).attr('number');
    game = new MemoryGame();
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
   var that = this;
  $("#ready-button").one("click", function(){
    that.startTurn();
  })
}



/*
// Activates the button that asks players if they want to play again
*/
MemoryGame.prototype.activatePlayAgainButton = function(){
  var that = this;
  $("#play-again").on("click", function(){
    that.clearController();
    that.sayNothing();
    that.askHowManyPlayers();
    that.clearAllCards();
    that.resetPlayerPoints();
    that.updateTimer(0);
    activateNewGameButton();
    activateRulesButton();
  })
}

/*
// Activates the buttons on the back of the cards so that players may anser the questions
*/
MemoryGame.prototype.activateAnswerButtons = function(){
  var that = this;
  $(".answer-button").one("click", function(){
    var cardIndex = $(this).parent().parent().parent().parent().attr("card-number");
    var answerGiven = $(this).text();
    that.isItTheRightAnswer(answerGiven, cardIndex);
  })
}

