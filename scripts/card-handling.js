/*
// Builds the front of the card's html
// takes index on one of the current cards
*/ 
MemoryGame.prototype.buildFrontCardHtml = function(index){
  var html="";
  var cardImage = this.currentCards[index].image;
  html += '<img src="' + cardImage + '">';
  return html;
}


/*
// Flips the cards up
// goes through the current cards array and makes the changes to the html to make the cads show their content
*/
MemoryGame.prototype.flipCardsUp = function(){
  var cardsToFlip = $(".game-card");

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
  // effects
  cardsToFlip.hide();
  cardsToFlip.slideDown();
}


/*
// Flips cards down
*/
MemoryGame.prototype.flipCardsDown = function(){
  var cardsToFlip = $(".game-card");

  for(var i = 0; i < cardsToFlip.length; i++){
    // goes through each card and gets the background color within their properties
    var cardBackgroundColor = this.currentCards[i].backgroundColor;
    // that is necessary to unset it here
    $(cardsToFlip[i]).toggleClass("btn-secondary card-color-" + cardBackgroundColor);
    // create an empty string
    var cardBackContent = "";
    // to empty the card
    $(cardsToFlip[i]).html(cardBackContent);
  }
  // effects
  cardsToFlip.hide();
  cardsToFlip.slideDown();
}


/*
// Build options to answer
// decides which answer button to build based on the value of what the current correct answer is
*/
MemoryGame.prototype.buildAnswerButtons = function(){
  var html="";
  switch (this.currentCorrectAnswer) {
    case "cardName":   // Fallthrough
    case "beats":
    case "isBeatBy":
      html+='   <div class="container center-block">';
      html+='     <div class="row">';
      html+='       <div class="col-md-12 text-center">'
      html+='         <button type="button" class="btn btn-success btn-block my-2 answer-button">rock</button>';
      html+='       </div>'
      html+='     </div>';
      html+='     <div class="row">';
      html+='       <div class="col-md-12 text-center">'
      html+='         <button type="button" class="btn btn-success btn-block my-2 answer-button">paper</button>';
      html+='       </div>'
      html+='     </div>';
      html+='     <div class="row">';
      html+='       <div class="col-md-12 text-center">'
      html+='         <button type="button" class="btn btn-success btn-block my-2 answer-button">scissors</button>';
      html+='       </div>'
      html+='     </div>';
      html+='   </div>';  
      break;

    case "backgroundColor":
      html+='   <div class="container center-block">';
      html+='     <div class="row">';
      html+='       <div class="col-md-12 text-center">'
      html+='         <button type="button" class="btn btn-success btn-block my-2 answer-button">red</button>';
      html+='       </div>'
      html+='     </div>';
      html+='     <div class="row">';
      html+='       <div class="col-md-12 text-center">'
      html+='         <button type="button" class="btn btn-success btn-block my-2 answer-button">green</button>';
      html+='       </div>'
      html+='     </div>';
      html+='     <div class="row">';
      html+='       <div class="col-md-12 text-center">'
      html+='         <button type="button" class="btn btn-success btn-block my-2 answer-button">blue</button>';
      html+='       </div>'
      html+='     </div>';
      html+='   </div>';  
      break;
  
    default:
      console.log("something went wrong with the answer button builder");
      break;
  }

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
  $(".answer-button").hide();
  $(".answer-button").fadeIn();
}


/*
// Marks the clicked card as being answered correctly
// takes the index of the card to mark as correct
*/
MemoryGame.prototype.markAsCorrect = function(index){
  this.hideAnswerButton(index);
  var cards = $(".game-card");
  $(cards[index]).addClass('btn-light');
}


/*
// Hide the answer buttons from one card
// takes the index of the card whose buttons need to be removed
*/
MemoryGame.prototype.hideAnswerButton = function(index){
  var cards = $(".game-card");
  $(cards[index]).html("");
}


/*
// clears all buttons of the cards and takes away the marker that the answer was correct on that card
*/
MemoryGame.prototype.clearAllCards = function(){
  var cards = $(".game-card");
  for(var i = 0; i < 4; i++){
    $(cards[i]).html("");
    $(cards[i]).removeClass('btn-light');
  }
}