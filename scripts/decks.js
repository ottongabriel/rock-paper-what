var decks = [

 

  rockPaperScissorsDeck = {
    name: "rockPaperScissorsDeck",
    cards: [
      {
        cardName: 'rock',
        image: 'img/rock.png',
        beats: 'scissors',
        isBeatBy: 'paper',
        size: 'medium',
      },
      {
        cardName: 'paper',
        image: 'img/paper.png',
        beats: 'rock',
        isBeatBy: 'scissors',
        size: 'medium',
      },
      {
        cardName: 'scissors',
        image: 'img/scissors.png',
        beats: 'paper',
        isBeatBy: 'rock',
        size: 'medium',
      }
    ],
    questions: [
      ["What was on the card?", "cardName"],
      ["What does the item on the card beat?", "beats"],
      ["What beats what was on the card?", "isBeatBy"],
      ["What was the color in the background of the card?", "backgroundColor"],
      // ["What was the size of the item on the card?", "size"], // this has not been implemented yet
    ],
    colors: [
      "red", "green", "blue"
    ],
  }
]


