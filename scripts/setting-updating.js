/*
// Sets the deck from within the deck collection
// right now there is only one deck
*/
MemoryGame.prototype.setDeck = function() {
  var randomDeckIndex = Math.floor(Math.random() * decks.length);
  this.currentDeck = decks[randomDeckIndex];
}


/*
// Changes whose player turn it currently is
// it also increases the round when both players have gone
*/
MemoryGame.prototype.togglePlayer = function(){
  if( Number(this.numberOfPlayers) === 2 ){
    if(Number(this.currentPlayersTurn) === 1){
      this.currentPlayersTurn = 2;
      $(".points").parent().toggleClass("current");
    }
    else{
      this.currentPlayersTurn = 1;
      this.currentRound++;
      this.decreaseTimeLimit();
      $(".points").parent().toggleClass("current");
    }
  }
  else{
    this.currentRound++;
  }
}


/*
// Increase Player One Score
*/
MemoryGame.prototype.increasePlayerOneScore = function(){
  this.playerOnePoints++;
  $('#player-one-points').text(this.playerOnePoints);
}


/*
// Increase Player Two Score
*/
MemoryGame.prototype.increasePlayerTwoScore = function(){
  this.playerTwoPoints++;
  $('#player-two-points').text(this.playerTwoPoints);
}


/*
// Resets player scores to zero
*/
MemoryGame.prototype.resetPlayerPoints = function(){
  this.playerOnePoints = 0;
  this.playerTwoPoints = 0;
  $('#player-one-points').text(this.playerOnePoints);
  $('#player-two-points').text(this.playerTwoPoints);
}