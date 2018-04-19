function activateReadyButton(){
  $("#ready-button").one("click", function(){
    game.startTurn();
  })
}


function activateAnswerButtons(){
  $(".answer-button").one("click", function(){
    var cardIndex = $(this).parent().parent().parent().attr("card-number");
    var answerGiven = $(this).text();
    game.isItTheRightAnswer(answerGiven, cardIndex);
  })
}