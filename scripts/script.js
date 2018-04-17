

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



var gameStartListener = $('#one-player-button, #two-players-button').click(function(e){
  var playerCount =  $(this).attr('number');
  var game = new MemoryGame();
  game.startGame(playerCount);

});