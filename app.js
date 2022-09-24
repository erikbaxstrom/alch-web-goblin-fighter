/* Imports */
import { renderPlayer, renderGoblin } from './render-utils.js';
import { getRandomItem } from './utlis.js';

/* Get DOM Elements */
const playerSection = document.getElementById('player-section');
const goblinList = document.getElementById('goblin-list');
const goblinsDefeatedDisplay = document.getElementById('goblins-defeated-display');
const messageDisplay = document.getElementById('message-display');
const summonGoblinForm = document.getElementById('summon-goblin-form');
const clearBattlefieldButton = document.getElementById('clear-battlefield-button');

/* State */
let player = {
    hp: 10,
    goblinsDefeated: 0,
};

let goblins = [
    {
        name: 'Grog',
        hp: 3,
        type: 'cyclops',
    },
    {
        name: 'Xorg',
        hp: 2,
        type: 'tree',
    },
    {
        name: 'Ted',
        hp: 5,
        type: 'goblin',
    },
];

let message = '';

let goblinHpDistribution = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5];
let goblinTypeDistrobution = [
    'cyclops',
    'cyclops',
    'cyclops',
    'tree',
    'tree',
    'ogre',
    'ogre',
    'ogre',
    'cthulhu',
    'goblin',
    'goblin',
    'goblin',
    'goblin',
    'goblin',
    'goblin',
];
const goblinDamageDistribution = [0, 0, 1, 1, 1, 2, 2, 3];
const playerDamageDistribution = [0, 1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5];

/* Events */

summonGoblinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(summonGoblinForm);
    const goblin = {
        name: formData.get('goblin-name'),
        hp: getRandomItem(goblinHpDistribution),
        type: getRandomItem(goblinTypeDistrobution),
    };
    goblins.push(goblin);

    message = `${goblin.name} joined the fray.`;
    summonGoblinForm.reset();
    displayGoblins();
    displayMessage();
});

clearBattlefieldButton.addEventListener('click', () => {
    let stillAlive = [];
    for (let goblin of goblins) {
        if (goblin.hp > 0) {
            stillAlive.push(goblin);
        }
    }
    goblins = stillAlive;
    //set message
    message = 'Cleared the Battlefield of defeated Goblins';
    displayGoblins();
    displayMessage();
});

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

        goblinEl.addEventListener('click', () => {
            if (player.hp === 0) {
                message = "No more fighting. You've been defeated. ";
            } else {
                if (goblin.hp === 0) {
                    message = `You: -1 from exposure to ${goblin.name}'s toxic viscera. `;
                    player.hp--;
                    if (player.hp <= 0) {
                        player.hp = 0; //don't let hp go below zero
                        message += ` You were defeated by ${goblin.name}`;
                    }
                } else {
                    const playerDamageReceived = getRandomItem(goblinDamageDistribution);
                    const goblinDamageReceived = getRandomItem(playerDamageDistribution);
                    player.hp -= playerDamageReceived;
                    goblin.hp -= goblinDamageReceived;
                    message = `You: -${playerDamageReceived}  ${goblin.name}: -${goblinDamageReceived}`;
                    if (goblin.hp <= 0 && player.hp <= 0) {
                        message += ` You and ${goblin.name} defeated each other.`;
                        goblin.hp = 0;
                        player.hp = 0;
                        player.goblinsDefeated += 1;
                    } else {
                        if (goblin.hp <= 0) {
                            goblin.hp = 0; //don't let hp go below zero
                            message += ` You defeated ${goblin.name}`;
                            player.goblinsDefeated += 1;
                        }
                        if (player.hp <= 0) {
                            player.hp = 0; //don't let hp go below zero
                            message += ` You were defeated by ${goblin.name}`;
                        }
                    }
                }
            }

            displayMessage();
            displayPlayer();
            displayGoblins();
            displayScore();
        });
    }
}

function displayScore() {
    goblinsDefeatedDisplay.textContent = player.goblinsDefeated;
}

function displayMessage() {
    messageDisplay.textContent = message;
}

displayPlayer();
displayGoblins();
displayScore();
displayMessage();
