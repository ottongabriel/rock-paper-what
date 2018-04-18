var MemoryGame = function(){
  this.numberOfPlayers;
  this.playerOnePoints = 0;
  this.playerTwoPoints = 0;
  this.currentRound = 0;
  this.currentPlayersTurn = 1;
  this.currentDeck;
  this.currentCards = [];
  this.currentQuestion = "";
  this.currentCorrectAnswer = "";
  this.numberOfRightClicks = 0;
}

/*
// Sets the deck from within the deck collection
// right now there is only one deck
*/
MemoryGame.prototype.setDeck = function() {
  var randomDeckIndex = Math.floor(Math.random() * decks.length);
  this.currentDeck = decks[randomDeckIndex];
  // console.log('this.currentDeck: ', this.currentDeck);
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
    var card = this.currentDeck.cards[randomCardIndex];
    card["answer"] = card[this.currentCorrectAnswer];
    this.currentCards.push(card);
    // console.log('card: ', card);
  }
  // console.log('this.currentCards: ', this.currentCards);
}

MemoryGame.prototype.setRandomQuestion = function(){

  //////////////////// for testing purposes only, we will work with the first question only for now//////////////////
  this.currentQuestion = this.currentDeck.questions[0][0];
  console.log('this.currentQuestion: ', this.currentQuestion);
  this.currentCorrectAnswer = this.currentDeck.questions[0][1]
  console.log('this.currentCorrectAnswer: ', this.currentCorrectAnswer);



  //////////////////////// this will be the code to use in the future/////////////////////////////////
  // var randomQuestionIndex = Math.floor(Math.random() * this.currentDeck.questions.length);
  // this.currentQuestion = this.currentDeck.questions[randomQuestionIndex][0];
  // console.log('this.currentQuestion: ', this.currentQuestion);
  // this.currentCorrectAnswer = this.currentDeck.questions[randomQuestionIndex][1]
}








/*
// Increase Player One Score
*/
MemoryGame.prototype.increasePlayerOneScore = function(){
  var currentScore = $('#player-one-points').text();
  currentScore++;
  $('#player-one-points').text(currentScore);
}

/*
// Increase Player Two Score
*/
MemoryGame.prototype.increasePlayerTwoScore = function(){
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
// builds the front of the card's html
// takes index on one of the current cards
*/ 
MemoryGame.prototype.buildFrontCardHtml = function(index){
  var html="";
  var cardImage = this.currentCards[index].image;
  html += '<img src="' + cardImage + '">';
  // console.log('html: ', html);
  return html;
}


/*
// flips the cards up
// goes through the current cards array and makes the changes to the html to make the cads show their content
*/
MemoryGame.prototype.flipCardsUp = function(){
  var cardsToFlip = $(".game-card");
  // console.log('cardsToFlip up: ', cardsToFlip);

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
}
    
    
/*
// flips cards down
*/
MemoryGame.prototype.flipCardsDown = function(){
  var cardsToFlip = $(".game-card");
  // console.log('cardsToFlip down: ', cardsToFlip);

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

  // console.log('html: ', html);
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
    this.handleWrongAnswer();
  }
}

MemoryGame.prototype.handleWrongAnswer = function(){
  // turn all of the answer buttons red
  $(".answer-button").toggleClass("btn-success btn-danger");
  // say you got it wrong
  this.sayYouGotItWrong();
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
}


///////////////////////////////// top header text handlers /////////////////////////////////
/*
// display question on top
*/
MemoryGame.prototype.sayQuestion = function(){
  $("#question").text("Q: " + this.currentQuestion);
}

/*
// hides top text
*/
MemoryGame.prototype.sayNothing = function(){
  $("#question").text("");
}

/*
// You got it wrong 
*/
MemoryGame.prototype.sayYouGotItWrong = function(){
  $("#question").text("You got it wrong X_x");
}

/*
// Celebration for getting them all right
*/
MemoryGame.prototype.sayYouGotThemAllRight = function(){
  $("#question").text("You got them all RIGHT :D");
}
///////////////////////////////// END top header text handlers /////////////////////////////////




///////////////////////////////// controller content handlers /////////////////////////////////
/*
// clears the controller div while there are no options to be selected by players
*/
MemoryGame.prototype.clearController = function(){
  $("#game-controller").html("");
}

/*
// Asks the next player if they are ready
*/
MemoryGame.prototype.askAreYouReady = function(){
  var html = "";
  html +=    '<div class="row">';
  html +=      '<div class="col-md-12 my-5 instructions-container">';
  html +=        '<h3 class="text-center">';
  html +=          'Are you ready Player ' + this.currentPlayersTurn;
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

  $("#game-controller").html(html);
}


///////////////////////////////// END controller content handlers /////////////////////////////////












/*
// starts the game
*/
MemoryGame.prototype.startGame = function(players){
  this.clearController();
  this.hideTopText();
  this.numberOfPlayers = players;
  // console.log('this.numberOfPlayers: ', this.numberOfPlayers);
  this.setTurn();
  this.flipCardsUp();
  // this.flipCardsDown();


}




/*
// sets the turn
// selects a deck
// selects 4 random cards from within that deck
// ...
*/ 
MemoryGame.prototype.setTurn = function(){
  this.setDeck();
  this.setRandomQuestion();
  this.getFourRandomCards();

}




/*
// Ends the turn
*/
MemoryGame.prototype.endTheTurn = function(){
  this.sayNothing();
  this.clearAllCards();
  this.clearController();
}







MemoryGame.prototype.onePlayerGameOver = function(){
  console.log("game over");
  console.log("you scored " + this.playerOnePoints + " points");
}