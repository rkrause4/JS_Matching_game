const cardsArr = [
  'tree',
  'birthday-cake',
  'crow',
  'ghost',
  'rocket',
  'cat',
  'cookie',
  'bread-slice',
  'tree',
  'birthday-cake',
  'crow',
  'ghost',
  'rocket',
  'cat',
  'cookie',
  'bread-slice'
];
let selectedCardsArr = [];
let firstSelectedCard;
let score = 0,
  moves = 0;
let scoreOutput = document.querySelector('#score-output'),
  movesOutput = document.querySelector('#moves-output'),
  gameDisplayScreen = document.querySelector('.game-display');

// Create Cards on screen
document.body.onload = createCards();

// Look for clicks on LI elements in the #game-screen section
document.querySelector('#game-screen').addEventListener('click', e => {
  if (e.target.tagName.toLowerCase() === 'li') {
    getCardDetails(e);
  }
});

// Event listener for the modal "replay game" button
document.querySelector('#restart-button').addEventListener('click', resetGame);

// Takes the array and shuffles the array items
function shuffleCards(array) {
  // Shuffle the array
  let temp, index;
  let number = array.length;
  while (number > 0) {
    index = Math.floor(Math.random() * number);
    number--;
    temp = array[number];
    array[number] = array[index];
    array[index] = temp;
  }
  return array;
}

// Calls shuffleCards, then creates .cards from the shuffled array
function createCards() {
  let shuffledItems = shuffleCards(cardsArr);
  let output = '';

  shuffledItems.forEach(item => {
    output += `
          <li class="card animated" type="${item}">
            <i class="fas fa-${item}"></i>
          </li>
          `;
  });
  document.querySelector('.game-screen-wrapper').innerHTML = output;
}

/* 
Receives the event (clicked item) checks for card class.
  If .card has shake or active class, it removes them
  Adds show and active class to card
  pushes that item (li) to the selectedCardsArr
*/
function getCardDetails(e) {
  if (e.target.classList.contains('card')) {
    if (
      e.target.classList.contains('shake') ||
      e.target.classList.contains('active')
    ) {
      e.target.classList.remove('shake', 'active');
    }
    e.target.classList.add('show', 'active');
    selectedCardsArr.push(e.target);

    if (selectedCardsArr.length === 2) {
      if (selectedCardsArr[0].type === selectedCardsArr[1].type) {
        score += 1;
        moves += 1;
        scoreOutput.innerHTML = score;
        movesOutput.innerHTML = moves;
        selectedCardsArr[0].classList.add(
          'match',
          'heartBeat',
          'disabled',
          'active'
        );
        selectedCardsArr[1].classList.add(
          'match',
          'heartBeat',
          'disabled',
          'active'
        );
        selectedCardsArr[0].classList.remove('active');
        selectedCardsArr[1].classList.remove('active');
        selectedCardsArr = [];

        if (score === 8) {
          setTimeout(modal(), 1100);
        }
      } else {
        gameDisplayScreen.style.display = 'block';
        moves += 1;
        movesOutput.innerHTML = moves;
        selectedCardsArr[0].classList.add('shake');
        selectedCardsArr[1].classList.add('shake');
        // Removes active, show an shake classes from the cards after 1.1 seconds
        setTimeout(() => {
          selectedCardsArr[0].classList.remove('active', 'show', 'shake');
          selectedCardsArr[1].classList.remove('active', 'show', 'shake');
          selectedCardsArr = [];
          gameDisplayScreen.style.display = 'none';
        }, 1200);
      }
    }
  }
}

// Resets game after modal click of replay
function resetGame(e) {
  score = 0;
  moves = 0;
  movesOutput.innerHTML = moves;
  scoreOutput.innerHTML = score;
  createCards();
  modal();
  e.preventDefault();
}

// Opens/Closes the modal depending on conditional
function modal() {
  const modal = document.querySelector('#winning-modal'),
    modalScoreOutput = document.querySelector('#modal-score-output'),
    modalMovesOutput = document.querySelector('#modal-moves-output');

  modalScoreOutput.innerHTML = score;
  modalMovesOutput.innerHTML = moves;
  if (modal.classList.contains('closed')) {
    modal.classList.remove('closed');
    modal.classList.add('open');
  } else {
    modal.classList.add('closed');
    modal.classList.remove('open');
  }
}
