

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

$( window ).on( "load", function() {
  $('#instructionsModal').modal('show');
})


var game;
var gameStartListener = $('#one-player-button, #two-players-button').click(function(e){
  var playerCount =  $(this).attr('number');
  game = new MemoryGame();
  game.startGame(playerCount);










  // var time = 1000;
  // // cards are face up by this point
  // setTimeout(function(){
  //   game.flipCardsDown();
  // }, time);
  
  // setTimeout(function(){
  //   game.sayQuestion();
  // }, time * 2);

  // setTimeout(function(){
  //   game.showAnswerButtons();
  // }, time * 3);

  // setTimeout(function(){
  //   game.handleRightAnswer();
  // }, time * 4);

  // setTimeout(function(){
  //   game.handleWrongAnswer();
  // }, time * 5);

  // setTimeout(function(){
  //   game.sayNothing();
  //   game.clearAllCards();
  // }, time * 6);



});


