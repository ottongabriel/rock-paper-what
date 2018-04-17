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
  html += '<img src="' + this.currentCards[index].image + '">';
  console.log('html: ', html);
  return html;
}


/*
// flips the cards up
// goes through the current cards array and makes the changes to the html to make the cads show their content
*/
MemoryGame.prototype.flipCardsUp = function(){
  var cardsToFlip = $(".game-card");
  console.log('cardsToFlip: ', cardsToFlip);

  for(var i = 0; i < cardsToFlip.length; i++){
    $(cardsToFlip[i]).toggleClass("btn-secondary btn-outline-primary");
    var cardFrontContent = this.buildFrontCardHtml(i);
    $(cardsToFlip[i]).html(cardFrontContent);
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
}