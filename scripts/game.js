var MemoryGame = function(){
  this.numberOfPlayers;
  this.playerOnePoints = 0;
  this.playerTwoPoints = 0;
  this.currentRound = 0;
  this.currentPlayersTurn = 1;
  this.currentDeck;
  this.currentCards = [];
  this.currentQuestion = "";
  this.currentAnswer = "";
}

/*
// Sets the deck from within the deck collection
// right now there is only one deck
*/
MemoryGame.prototype.setDeck = function() {
  var randomDeckIndex = Math.floor(Math.random() * decks.length);
  this.currentDeck = decks[randomDeckIndex];
  console.log('this.currentDeck: ', this.currentDeck);
}

/*
// Gets 4 random cards
// NOTE: the deck must be set first
*/ 
MemoryGame.prototype.getFourRandomCards = function () {
  this.currentCards = [];
  for(var i = 0; i < 4; i++){
    var randomCardIndex = Math.floor(Math.random() * this.currentDeck.cards.length);
    var card = this.currentDeck.cards[randomCardIndex];
    card["answer"] = card[this.currentAnswer];
    this.currentCards.push(card);
    console.log('card: ', card);
  }
  console.log('this.currentCards: ', this.currentCards);
}

MemoryGame.prototype.setRandomQuestion = function(){

  //////////////////// for testing purposes only, we will work with the first question only for now//////////////////
  this.currentQuestion = this.currentDeck.questions[0][0];
  console.log('this.currentQuestion: ', this.currentQuestion);
  this.currentAnswer = this.currentDeck.questions[0][1]
  console.log('this.currentAnswer: ', this.currentAnswer);



  //////////////////////// this will be the code to use in the future/////////////////////////////////
  // var randomQuestionIndex = Math.floor(Math.random() * this.currentDeck.questions.length);
  // this.currentQuestion = this.currentDeck.questions[randomQuestionIndex][0];
  // console.log('this.currentQuestion: ', this.currentQuestion);
  // this.currentAnswer = this.currentDeck.questions[randomQuestionIndex][1]

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
  console.log('cardsToFlip up: ', cardsToFlip);

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
  console.log('cardsToFlip down: ', cardsToFlip);

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
  switch (this.currentDeck.name) {
    case "rockPaperScissorsDeck":
      html+='   <div class="container center-block">';
      html+='     <div class="row">';
      html+='       <button type="button" class="btn btn-success my-1">rock</button>';
      html+='     </div>';
      html+='     <div class="row">';
      html+='       <button type="button" class="btn btn-success my-1">paper</button>';
      html+='     </div>';
      html+='     <div class="row">';
      html+='       <button type="button" class="btn btn-success my-1">scissors</button>';
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
// hide answer buttons
*/
MemoryGame.prototype.hideAnswerButtons = function() {
  // cards to remove buttons from
  var cards = $(".game-card");

  for(var i = 0; i < cards.length; i++){
    // fill the card
    $(cards[i]).html("");
  }
}









/*
// starts the game
*/
MemoryGame.prototype.startGame = function(players){
  this.numberOfPlayers = players;
  console.log('this.numberOfPlayers: ', this.numberOfPlayers);
  this.setTurn();
  this.flipCardsUp();
  // this.flipCardsDown();



 



}