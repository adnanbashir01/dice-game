'use strict';

// Selecting Elements
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const btnNew = document.querySelector('.btn--new');
const btnNewModal = document.querySelector('.btn--modal--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnOpenModal = document.querySelectorAll('.show-modal');
const btnCloseModal = document.querySelector('.close-modal');
let currentScore = 0;



// Reset Function
const resetGame = function () {
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    diceEl.classList.add('hidden');
    currentScore = 0;
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}
resetGame();
// Random Number 
const randomNumber = function () {
    let rn = Math.trunc(Math.random() * 6 + 1);
    return rn;
}
// Change the Player
const changePlayer = function () {
    if (player0El.classList.contains('player--active')) {
        player0El.classList.remove('player--active');
        player1El.classList.add('player--active');
    }
    else if (player1El.classList.contains('player--active')) {
        player1El.classList.remove('player--active');
        player0El.classList.add('player--active');
    }
}
// Modal Control
const modalControl = function () {
    // Close the Modal and Open the Modal Functions
    const closeModal = function () {
        modal.classList.add('hidden');
        overlay.classList.add('hidden');
    }
    const openModal = function () {
        modal.classList.remove('hidden');
        overlay.classList.remove('hidden');
    }
    openModal();
    // Close the modal on clicking the Close Modal Button or on the Overlay
    btnCloseModal.addEventListener('click', closeModal);
}


// Reset on Clicking "🔁 New Game"
btnNew.addEventListener('click', resetGame);
btnNewModal.addEventListener('click', resetGame);

// Update Current Score on Roll Dice
btnRoll.addEventListener('click', function () {
    const randomNumberExc = randomNumber();
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${randomNumberExc}.png`;
    if (randomNumberExc !== 1) {
        if (player0El.classList.contains('player--active')) {
            currentScore += randomNumberExc;
            current0El.textContent = currentScore;
        }
        else if (player1El.classList.contains('player--active')) {
            currentScore += randomNumberExc;
            current1El.textContent = currentScore;
        }
    }
    else if (randomNumberExc === 1) {
        current0El.textContent = 0;
        current1El.textContent = 0;
        currentScore = 0;
        changePlayer();
    }

})

// Update the Total Score on Hold
btnHold.addEventListener('click', function () {
    if (player1El.classList.contains('player--active')) {
        score1El.textContent = Number(score1El.textContent) + currentScore;
        current1El.textContent = 0;
        currentScore = 0;
        if (Number(score1El.textContent) >= 100) {
            modalControl();
        }
        else {
            changePlayer();
        }
    }
    else if (player0El.classList.contains('player--active')) {
        score0El.textContent = Number(score0El.textContent) + currentScore;
        current0El.textContent = 0;
        currentScore = 0;
        if (Number(score0El.textContent) >= 100) {
            modalControl();
        }
        else {
            changePlayer();
        }
    }
})