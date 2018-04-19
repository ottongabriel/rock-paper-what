$( window ).on( "load", function() {
  $('#instructionsModal').modal('show');
})


var game;
var gameStartListener = $('#one-player-button, #two-players-button').click(function(e){
  var playerCount =  $(this).attr('number');
  game = new MemoryGame();
  game.startGame(playerCount);
});


