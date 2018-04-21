/*
// Gets 4 random cards
// NOTE: the deck must be set first
// NOTE: the question must be set first
*/ 
MemoryGame.prototype.getFourRandomCards = function () {
  this.currentCards = [];
  for(var i = 0; i < 4; i++){
    var randomCardIndex = Math.floor(Math.random() * this.currentDeck.cards.length);

    // var card = this.currentDeck.cards[randomCardIndex]; ///original/didn't work because objects are assigned by reference in JS
    var card = {};
    card = Object.assign({}, this.currentDeck.cards[randomCardIndex]); ///new one/assigning object by value
    if(this.currentRound > 1){
      var randomColor = this.getRandomColor();
      card["backgroundColor"] = randomColor;
    }
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
  return randomColor;
}


/*
// Chooses a random question from the current deck being used
*/
MemoryGame.prototype.setRandomQuestion = function(){
  var randomQuestionIndex = Math.floor(Math.random() * this.currentDeck.questions.length);
  this.currentQuestion = this.currentDeck.questions[randomQuestionIndex][0];
  this.currentCorrectAnswer = this.currentDeck.questions[randomQuestionIndex][1]
}


