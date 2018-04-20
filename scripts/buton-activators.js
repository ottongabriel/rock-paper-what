function activateReadyButton(){
  $("#ready-button").one("click", function(){
    game.startTurn();
  })
}

function activateRulesButton(){
  $("#show-rules").on("click", function(){
    $('#instructionsModal').modal('show')
  })
}

function activatePayAgainButton(){
  $("#play-again").on("click", function(){
    // window.location.reload();
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


function activateAnswerButtons(){
  $(".answer-button").one("click", function(){
    var cardIndex = $(this).parent().parent().parent().parent().attr("card-number");
    var answerGiven = $(this).text();
    game.isItTheRightAnswer(answerGiven, cardIndex);
  })
}

function activateNewGameButton(){
  $('#one-player-button, #two-players-button').click(function(e){
    var playerCount =  $(this).attr('number');
    game = new MemoryGame();
    game.startGame(playerCount);
  });
}