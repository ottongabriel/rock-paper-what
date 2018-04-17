

///////////////////////////////////////////////////////////////
// dealing with timeouts example


// function hi(){
//   console.log('"hello": ', "hello");  
// }

// var oneSecond = 1000;

// totalSeconds = 3;

// var currentSeconds = totalSeconds;


// var countDown = setInterval(() => {
//   game.updateTimer(currentSeconds);
//   console.log('currentSeconds: ', currentSeconds);
//   currentSeconds--;
  
//   if(currentSeconds < 0){
//     clearInterval(countDown);
//     $("body").trigger("count-down:finished");
//   }
// }, oneSecond);


// $("body").on("count-down:finished", function(){
//   hi();
// })



// DEALING WITH TIMEOUTS^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//////////////////////////////////////////////////////


var game;
var gameStartListener = $('#one-player-button, #two-players-button').click(function(e){
  var playerCount =  $(this).attr('number');
  game = new MemoryGame();
  game.startGame(playerCount);

  var time = 1000;

  setTimeout(function(){
    game.flipCardsDown();
  }, time);
  
  setTimeout(function(){
    game.showAnswerButtons();
  }, time * 2);

  setTimeout(function(){
    game.hideAnswerButtons();
  }, time * 3);




});