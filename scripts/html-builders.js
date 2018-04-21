///////////////////////////////// top header text handlers /////////////////////////////////
/*
// display question on top
*/
MemoryGame.prototype.sayQuestion = function(){
  $("#question").text("Q: " + this.currentQuestion).hide();
  $("#question").fadeIn();
}

/*
// hides top text
*/
MemoryGame.prototype.sayNothing = function(){
  $("#question").fadeOut();
  // $("#question").text("");
}

/*
// You got it wrong 
*/
MemoryGame.prototype.sayYouGotItWrong = function(){
  var html = "You got it wrong X_x";
  html += this.passTheMouseIfNecessary();
  $("#question").html(html).hide();
  $("#question").fadeIn();
}

/*
// You ran out of time
*/
MemoryGame.prototype.sayTimeIsUp = function(){
  var html = "Time's up x_X";
  html += this.passTheMouseIfNecessary();
  $("#question").html(html).hide();
  $("#question").fadeIn();
}

/*
// You answered all of the questions correctly
*/
MemoryGame.prototype.sayYouGotThemAllRight = function(){
  var html = "You got them all right!!! :D";
  html += this.passTheMouseIfNecessary();
  $("#question").html(html).hide();
  $("#question").fadeIn();
}

/*
// Says you need to pass the mouse, if necessary
*/
MemoryGame.prototype.passTheMouseIfNecessary = function(){
  var message = "";
  if(this.numberOfPlayers == 2 && this.isGameOver === false){
    message = "<br><h5>Pass the mouse to the next player</h5>"
  }
  return message;
}

///////////////////////////////// END top header text handlers /////////////////////////////////





///////////////////////////////// Controller content handlers /////////////////////////////////

/*
// clears the controller div while there are no options to be selected by players
*/
MemoryGame.prototype.clearController = function(){
  $("#game-controller").html("").hide();
}

/*
// Asks the next player if they are ready
*/
MemoryGame.prototype.askAreYouReady = function(){
  var currentPlayer = "";

  if (this.currentPlayersTurn == 1){
    currentPlayer = "player-one";
  }
  else{
    currentPlayer = "player-two";
  }

  var html = "";
  html +=    '<div class="row">';
  html +=      '<div class="col-md-12 my-5 instructions-container">';
  html +=        '<h3 class="text-center">';
  html +=          'Are you ready <span class="' + currentPlayer + '"> Player ' + this.currentPlayersTurn + "</span>";
  html +=        '</h3>';
  html +=      '</div>';
  html +=    '</div>';
  html +=    '<div class="container">';
  html +=        '<div class="row">';
  html +=            '<div class="col-sm-4"></div>';
  html +=            '<div class="col-sm-4">';
  html +=              '<button id="ready-button" type="button" class="btn btn-success">Ready!</button>';
  html +=            '</div>';
  html +=            '<div class="col-sm-4"></div>';
  html +=        '</div>';
  html +=    '</div>';

  $("#game-controller").html(html).fadeIn();
}

/*
// give the players the option to start over
*/
MemoryGame.prototype.askToPlayAgain = function(){

  var html = "";
  html +=  '<div class="row">';
  html +=    '<div class="col-md-12 my-5 instructions-container">';
  html +=      '<h3 class="text-center">';
  html +=        'Play Again';
  html +=      '</h3>';
  html +=    '</div>';
  html +=  '</div>';
  html +=  '<div class="container">'
  html +=    '<div class="row">'
  html +=        '<div class="col-sm-4"></div>';
  html +=        '<div class="col-sm-4">';
  html +=          '<button id="play-again" type="button" class="btn btn-warning btn-lg">Go!</button>';
  html +=        '</div>';
  html +=        '<div class="col-sm-4"></div>';
  html +=    '</div>';
  html +=  '</div>';

  $("#game-controller").html(html).fadeIn();
  this.activatePlayAgainButton();
}

/*
// Asks how many players there will be in the game
*/
MemoryGame.prototype.askHowManyPlayers = function(){
  var html = "";

  html += '<div id="game-controller">';
  html += '  <div class="row">';
  html += '    <div class="col-md-12 my-5 instructions-container">';
  html += '      <h3 class="text-center">';
  html += '        How many players will there be?';
  html += '      </h3>';
  html += '    </div>';
  html += '  </div>';
  html += '  <div class="row">';
  html += '    <div class="col-md-2"></div>';
  html += '    <div class="col-md-4">';
  html += '      <button id="one-player-button" type="button" class="btn btn-success" number="1">1-Player</button>';
  html += '    </div>';
  html += '    <div class="col-md-4">';
  html += '      <button id="two-players-button" type="button" class="btn btn-success" number="2">2-Players</button>';
  html += '    </div>';
  html += '    <div class="col-md-2"></div>';
  html += '  </div>';
  html += '  <div class="row">';
  html += '      <div class="col-md-12 text-center my-4">';
  html += '          <button id="show-rules" type="button" class="btn btn-info" number="1">Rules</button>';
  html += '      </div>';
  html += '  </div>';
  html += '</div>';


  $("#game-controller").html(html).fadeIn();
  activateRulesButton();
  activateNewGameButton();
}


///////////////////////////////// END controller content handlers /////////////////////////////////