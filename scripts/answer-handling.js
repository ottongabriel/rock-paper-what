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


/*
// Handles each time that a player clicks on a correck answer
*/
MemoryGame.prototype.handleRightAnswer = function(cardIndex){
  // after choosing the correct answer
  // make the answer buttons disapear and make the card "go away"
  this.markAsCorrect(cardIndex);
  // then increase the score of the current active player
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
  // keep track of how many correct answers the player has had this turn
  this.numberOfRightClicks++;
  // then, if they have given correct answers for all cards
  if(this.numberOfRightClicks >= 4){
    // stop the timer
    window.clearInterval(this.countDown);
    // congratulate the player
    this.sayYouGotThemAllRight();
    // and handle the ending of the turn
    this.endTheTurn();
  }
}


/*
// Handles a player choosing the wrong answer or running out of time
*/
MemoryGame.prototype.handleWrongAnswer = function(situation){
  // turn all of the answer buttons red
  $(".answer-button").toggleClass("btn-success btn-danger");
  // and deactivates their click functionality
  $(".answer-button").off();

  // if there is only one Player
  if(Number(this.numberOfPlayers) === 1){
    this.isGameOver = true;
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
  // if the player clicked on the wrong answer 
  if(situation === "wrong answer"){
    // say you got it wrong
    this.sayYouGotItWrong();
    window.clearInterval(this.countDown);
  }
  // if the player took too long
  if(situation === "time is up"){
    // say you ran out of time
    this.sayTimeIsUp();
  }
}


/*
// Checks if someone has won a two player game
// if someone has won, it sets them as the winner
// then returns true
// if no one has won, returns false
*/
MemoryGame.prototype.figureOutIfSomeoneWon = function(){
  // if the difference in score between player one and player two is greater than 4
  if(this.playerOnePoints - this.playerTwoPoints >= 4){
    // sets the game as over
    this.isGameOver = true;
    // set player one as the winner
    this.winner = "Player 1";
    // inform the program that someone has won
    return true;
  }
  // if the difference in points between player two and player one is greater than 4
  else if(this.playerTwoPoints - this.playerOnePoints >= 4){
    // sets the game as over
    this.isGameOver = true;
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