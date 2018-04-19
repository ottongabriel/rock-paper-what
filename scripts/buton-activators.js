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
    console.log("hello")
    window.location.reload();
  })
}


function activateAnswerButtons(){
  $(".answer-button").one("click", function(){
    var cardIndex = $(this).parent().parent().parent().parent().attr("card-number");
    var answerGiven = $(this).text();
    game.isItTheRightAnswer(answerGiven, cardIndex);
  })
}