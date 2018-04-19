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
  this.isNotOver = true;
  this.winner;
  this.countDown;
  this.currentTimeLimit = 15;
}

/*
// Sets the deck from within the deck collection
// right now there is only one deck
*/
MemoryGame.prototype.setDeck = function() {
  var randomDeckIndex = Math.floor(Math.random() * decks.length);
  this.currentDeck = decks[randomDeckIndex];
}

/*
// Gets 4 random cards
// NOTE: the deck must be set first
// NOTE: the question must be set first
*/ 
MemoryGame.prototype.getFourRandomCards = function () {
  this.currentCards = [];
  for(var i = 0; i < 4; i++){
    var randomCardIndex = Math.floor(Math.random() * this.currentDeck.cards.length);

    // var card = this.currentDeck.cards[randomCardIndex]; ///original
    var card = {};
    card = Object.assign({}, this.currentDeck.cards[randomCardIndex]); 
    if(this.currentRound > 4){
      var randomColor = this.getRandomColor();
      card["backgroundColor"] = randomColor;
    }
    // console.log('card: ', card);
    card["answer"] = card[this.currentCorrectAnswer];
    this.currentCards.push(card);
  }
  return this.currentCards;
}

/*
// Returns a random color to be used in the get 4 random cards color
*/
MemoryGame.prototype.getRandomColor = function(){
  var randomColorIndex = Math.floor(Math.random() * this.currentDeck.colors.length);
  var randomColor = this.currentDeck.colors[randomColorIndex];
  // console.log('randomColor: ', randomColor);
  return randomColor;
}


MemoryGame.prototype.setRandomQuestion = function(){

  //////////////////// for testing purposes only, we will work with the first question only for now//////////////////
  // this.currentQuestion = this.currentDeck.questions[3][0];
  // console.log('this.currentQuestion: ', this.currentQuestion);
  // this.currentCorrectAnswer = this.currentDeck.questions[3][1]
  // console.log('this.currentCorrectAnswer: ', this.currentCorrectAnswer);



  //////////////////////// this will be the code to use in the future/////////////////////////////////
  var randomQuestionIndex = Math.floor(Math.random() * this.currentDeck.questions.length);
  this.currentQuestion = this.currentDeck.questions[randomQuestionIndex][0];
  this.currentCorrectAnswer = this.currentDeck.questions[randomQuestionIndex][1]
}





MemoryGame.prototype.togglePlayer = function(){
  if( Number(this.numberOfPlayers) === 2 ){
    if(Number(this.currentPlayersTurn) === 1){
      this.currentPlayersTurn = 2;
    }
    else{
      this.currentPlayersTurn = 1;
      this.currentRound++;
      this.decreaseTimer();
    }
  }
  else{
    this.currentRound++;
  }
  console.log('this.currentRound: ', this.currentRound);
}


/*
// Increase Player One Score
*/
MemoryGame.prototype.increasePlayerOneScore = function(){
  this.playerOnePoints++;
  var currentScore = $('#player-one-points').text();
  currentScore++;
  $('#player-one-points').text(currentScore);
}

/*
// Increase Player Two Score
*/
MemoryGame.prototype.increasePlayerTwoScore = function(){
  this.playerTwoPoints++;
  var currentScore = $('#player-two-points').text();
  currentScore++;
  $('#player-two-points').text(currentScore);
}

/*
// for use within intervals to update the displayed amount of time that the player has to make a selection
*/
MemoryGame.prototype.updateTimer = function(secondsLeft){
  $('#timer-display').text(secondsLeft);
}


/*
// Handle time limits
*/
MemoryGame.prototype.startTimeLimit = function(){

  var currentSeconds = this.currentTimeLimit;


  this.countDown = window.setInterval(() => {
    this.updateTimer(currentSeconds);
    currentSeconds--;
    
    if(currentSeconds < 0){
      window.clearInterval(this.countDown);
      this.handleWrongAnswer("time is up");
    }
  }, second);
}



/*
// builds the front of the card's html
// takes index on one of the current cards
*/ 
MemoryGame.prototype.buildFrontCardHtml = function(index){
  var html="";
  var cardImage = this.currentCards[index].image;
  html += '<img src="' + cardImage + '">';
  return html;
}


/*
// flips the cards up
// goes through the current cards array and makes the changes to the html to make the cads show their content
*/
MemoryGame.prototype.flipCardsUp = function(){
  var cardsToFlip = $(".game-card");

  for(var i = 0; i < cardsToFlip.length; i++){
    // goes through each card and gets the background color within their properties
    var cardBackgroundColor = this.currentCards[i].backgroundColor;
    // that is necessary to set it here
    $(cardsToFlip[i]).toggleClass("btn-secondary card-color-" + cardBackgroundColor);
    // build the html content
    var cardFrontContent = this.buildFrontCardHtml(i);
    // fill the card
    $(cardsToFlip[i]).html(cardFrontContent);
  }
  // cardsToFlip.hide();
  // cardsToFlip.fadeIn("linear");
  cardsToFlip.hide();
  cardsToFlip.slideDown();
}
    
    
/*
// flips cards down
*/
MemoryGame.prototype.flipCardsDown = function(){
  var cardsToFlip = $(".game-card");

  for(var i = 0; i < cardsToFlip.length; i++){
    // goes through each card and gets the background color within their properties
    var cardBackgroundColor = this.currentCards[i].backgroundColor;
    // tha is necessary to unset it here
    $(cardsToFlip[i]).toggleClass("btn-secondary card-color-" + cardBackgroundColor);
    // create an empty string
    var cardBackContent = "";
    // to empty the card
    $(cardsToFlip[i]).html(cardBackContent);
  }
  cardsToFlip.hide();
  cardsToFlip.slideDown();
}


/*
// Build options to answer
*/
MemoryGame.prototype.buildAnswerButtons = function(){
  var html="";
  switch (this.currentCorrectAnswer) {
    case "cardName":   // Fallthrough
    case "beats":
    case "isBeatBy":
      html+='   <div class="container center-block">';
      html+='     <div class="row">';
      html+='       <button type="button" class="btn btn-success my-2 answer-button">rock</button>';
      html+='     </div>';
      html+='     <div class="row">';
      html+='       <button type="button" class="btn btn-success my-2 answer-button">paper</button>';
      html+='     </div>';
      html+='     <div class="row">';
      html+='       <button type="button" class="btn btn-success my-2 answer-button">scissors</button>';
      html+='     </div>';
      html+='   </div>';  
      break;

    case "backgroundColor":
      html+='   <div class="container center-block">';
      html+='     <div class="row">';
      html+='       <button type="button" class="btn btn-success my-2 answer-button">red</button>';
      html+='     </div>';
      html+='     <div class="row">';
      html+='       <button type="button" class="btn btn-success my-2 answer-button">green</button>';
      html+='     </div>';
      html+='     <div class="row">';
      html+='       <button type="button" class="btn btn-success my-2 answer-button">blue</button>';
      html+='     </div>';
      html+='   </div>';  
      break;
  
    default:
      console.log("something went wrong with the answer button builder");
      break;
  }

  return html;
}



/*
// show answer buttons
*/
MemoryGame.prototype.showAnswerButtons = function(){
  // cards to add buttons to
  var cards = $(".game-card");

  for(var i = 0; i < cards.length; i++){
    // build the html for the buttons
    var answerButtonsHtml = this.buildAnswerButtons();
    // fill the card
    $(cards[i]).html(answerButtonsHtml);
  }
  $(".answer-button").hide();
  $(".answer-button").fadeIn();
}

/*
// marks the clicked card as being answered correctly
// takes the index of the card to mark as correct
*/
MemoryGame.prototype.markAsCorrect = function(index){
  this.hideAnswerButton(index);
  var cards = $(".game-card");
  $(cards[index]).addClass('btn-light');
}


/*
// hide the answer buttons from one card
// takes the index of the card whose buttons need to be removed
*/
MemoryGame.prototype.hideAnswerButton = function(index){
  var cards = $(".game-card");
  $(cards[index]).html("");
}


/*
// clears all buttons of the cards and takes away the marker that the answer was correct on that card
*/
MemoryGame.prototype.clearAllCards = function(){
  var cards = $(".game-card");
  for(var i = 0; i < 4; i++){
    $(cards[i]).html("");
    $(cards[i]).removeClass('btn-light');
  }
}

/*
// Checks if the button clicked is the correct answer to the question
// receives the answer given and the index of the card cliked
// returns true if it is, returns false otherwise
*/
MemoryGame.prototype.isItTheRightAnswer = function(answerGiven, cardIndex) {
  correctAnswer = this.currentCards[cardIndex].answer;
  if(answerGiven === correctAnswer){
    this.handleRightAnswer(cardIndex);
  }
  else{
    this.handleWrongAnswer("wrong answer");
  }
}

MemoryGame.prototype.handleWrongAnswer = function(situation){
  // turn all of the answer buttons red
  $(".answer-button").toggleClass("btn-success btn-danger");
  
  // handle if the player clicked on the wrong answer or ran out of time
  if(situation === "wrong answer"){
    // say you got it wrong
    this.sayYouGotItWrong();
    window.clearInterval(this.countDown);
  }
  if(situation === "time is up"){
    this.sayTimeIsUp();
  }

  // if there is only one Player
  if(Number(this.numberOfPlayers) === 1){
    // the game is over
    this.onePlayerGameOver();
  }
  // if there are two players
  else{
    // figure out if someone has won
    var someoneHasWon = this.figureOutIfSomeoneWon();
    // if someone has
    if(someoneHasWon){
      // game is over
      this.twoPlayerGameOver();
    }
    // if no one has won yet
    else{
      // wait a second and end the turn 
      setTimeout(() => {
        this.endTheTurn();
      }, second * 1);
      
    }
  }

}

MemoryGame.prototype.handleRightAnswer = function(cardIndex){
  this.markAsCorrect(cardIndex);
  switch(this.currentPlayersTurn){
    case 1:
      this.increasePlayerOneScore();
      break;

    case 2:
      this.increasePlayerTwoScore();
      break;

    default:
      console.log("something went wrong in the handle right answer function");
      break;
  }
  this.numberOfRightClicks++;
  if(this.numberOfRightClicks >= 4){
    window.clearInterval(this.countDown);
    this.sayYouGotThemAllRight();
    this.endTheTurn();
  }
}

MemoryGame.prototype.figureOutIfSomeoneWon = function(){
  // if the difference in score between player one and player two is greater than 8
  if(this.playerOnePoints - this.playerTwoPoints >= 8){
    // set player one as the winner
    this.winner = "Player 1";
    // inform the program that someone has won
    return true;
  }
  // if the difference in points between player two and player one is greater than 8
  else if(this.playerTwoPoints - this.playerOnePoints >= 8){
    // set player two as the winner
    this.winner = "Player 2"
    // inform the program that someone has won
    return true;
  }
  // no one has won
  else{
    // inform the program
    return false;
  }
}





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
  $("#question").text("You got it wrong X_x").hide();
  $("#question").fadeIn();
}

MemoryGame.prototype.sayTimeIsUp = function(){
  $("#question").text("Time's up x_X").hide();
  $("#question").fadeIn();
}

/*
// Celebration for getting them all right
*/
MemoryGame.prototype.sayYouGotThemAllRight = function(){
  $("#question").text("You got them all right!!! :D").hide();
  $("#question").fadeIn();
}
///////////////////////////////// END top header text handlers /////////////////////////////////




///////////////////////////////// controller content handlers /////////////////////////////////
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


///////////////////////////////// END controller content handlers /////////////////////////////////





/*
// decrases the time available to players if the game has gone for too long
*/
MemoryGame.prototype.decreaseTimer = function(){
  if(this.currentRound > 5 && this.currentRound < 15){
    this.currentTimeLimit--;
  }
}






/*
// starts the game
*/
MemoryGame.prototype.startGame = function(players){
  this.clearController();
  this.sayNothing();
  this.numberOfPlayers = players;
  game.setTurn();
}

/*
// sets the turn
// ...
*/ 
MemoryGame.prototype.setTurn = function(){
  this.numberOfRightClicks = 0;
  this.setDeck();
  this.setRandomQuestion();
  this.getFourRandomCards();
  this.askAreYouReady();
  activateReadyButton();
}

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
    }, second * 2);
  }, second * 1);
}

MemoryGame.prototype.turnWaitForAnswers = function(){
  this.showAnswerButtons();
  activateAnswerButtons();
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







MemoryGame.prototype.onePlayerGameOver = function(){
  setTimeout(() => {
    // alert("game over\n" + "you scored " + this.playerOnePoints + " points");
    $("#gameOverModalContent").text("Game over :( " + "you scored " + this.playerOnePoints + " points.    Refresh page to start over");
    $("#gameOverModal").modal("show");
  }, second * 1);
}

MemoryGame.prototype.twoPlayerGameOver = function(){
  setTimeout(() => {
    $("#gameOverModalContent").text(this.winner + " has won the game!!!   Refresh the page to start over");
    $("#gameOverModal").modal("show");
  }, second * 1);
}
