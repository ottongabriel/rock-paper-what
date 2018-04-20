/*
// Activates the button that allows the players to start the game
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
*/
function activateRulesButton(){
  $("#show-rules").on("click", function(){
    $('#instructionsModal').modal('show')
  })
}


/*
// Activates the button that asks if the player is ready
*/
function activateReadyButton(){
  $("#ready-button").one("click", function(){
    game.startTurn();
  })
}



/*
// Activates the button that asks players if they want to play again
*/
function activatePayAgainButton(){
  $("#play-again").on("click", function(){
    game.clearController();
    game.sayNothing();
    game.askHowManyPlayers();
    game.clearAllCards();
    game.resetPlayerPoints();
    game.updateTimer(0);
    activateRulesButton();
    activateNewGameButton();
  })
}

/*
// Activates the buttons on the back of the cards so that players may anser the questions
*/
function activateAnswerButtons(){
  $(".answer-button").one("click", function(){
    var cardIndex = $(this).parent().parent().parent().parent().attr("card-number");
    var answerGiven = $(this).text();
    game.isItTheRightAnswer(answerGiven, cardIndex);
  })
}

