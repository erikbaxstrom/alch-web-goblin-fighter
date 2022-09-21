/* Imports */
import { renderPlayer, renderGoblin } from './render-utils.js';

/* Get DOM Elements */
const playerSection = document.getElementById('player-section');
const goblinList = document.getElementById('goblin-list');
const goblinsDefeatedDisplay = document.getElementById('goblins-defeated-display');
const messageDisplay = document.getElementById('message-display');
/* State */
let player = {
    hp: 1,
    goblinsDefeated: 13,
};

let goblins = [
    {
        name: 'Grog',
        hp: 3,
        type: 'cyclops',
    },
    {
        name: 'Xorg',
        hp: 0,
        type: 'tree',
    },
    {
        name: 'Ted',
        hp: 150,
        type: 'goblin',
    },
];

let message = 'something something something message';
/* Events */

/* Display Functions */
function displayPlayer() {
    // playerSection.innerHTML = '';
    // const playerEl = renderPlayer(player);
    // playerSection.append(playerEl);
    const playerEl = renderPlayer(player);
    playerSection.innerHTML = playerEl.innerHTML;
}

function displayGoblins() {
    goblinList.innerHTML = '';
    for (let goblin of goblins) {
        const goblinEl = renderGoblin(goblin);
        goblinList.append(goblinEl);
    }
}

function displayScore() {
    goblinsDefeatedDisplay.textContent = player.goblinsDefeated;
}

function displayMessage() {
    messageDisplay.textContent = message;
}

// (don't forget to call any display functions you want to run on page load!)
displayPlayer();
displayGoblins();
displayScore();
displayMessage();
