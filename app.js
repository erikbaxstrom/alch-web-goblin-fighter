/* Imports */
import { renderPlayer } from './render-utils.js';

/* Get DOM Elements */
const playerSection = document.getElementById('player-section');
/* State */
let player = {
    hp: 10,
    goblinsDefeated: 8,
};
/* Events */

/* Display Functions */
function displayPlayer() {
    const playerEl = renderPlayer();
    playerSection.innerHTML = playerEl;
}

// (don't forget to call any display functions you want to run on page load!)
displayPlayer();
