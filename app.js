/* Imports */
import { renderPlayer } from './render-utils.js';

/* Get DOM Elements */
const playerSection = document.getElementById('player-section');
/* State */
let player = {
    hp: 1,
    goblinsDefeated: 8,
};
/* Events */

/* Display Functions */
function displayPlayer() {
    playerSection.innerHTML = '';
    const playerEl = renderPlayer(player);
    playerSection.append(playerEl);
    // const playerEl = renderPlayer(player);
    // playerSection.innerHTML = playerEl;
}

// (don't forget to call any display functions you want to run on page load!)
displayPlayer();
