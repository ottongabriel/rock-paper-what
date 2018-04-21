/*
// for use within intervals to update the displayed amount of time that the player has to make a selection
*/
MemoryGame.prototype.updateTimer = function(secondsLeft){
  $('#timer-display').text(secondsLeft);
}


/*
// Start timer
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
// Decrases the time each player will have on their next turn if the game takes too long
// The adjustment is based on the round, so each player will have the same ammount of time once
*/
MemoryGame.prototype.decreaseTimeLimit = function(){
  if(this.currentRound > 1 && this.currentRound < 6){
    this.currentTimeLimit -= 2;
  }
}


