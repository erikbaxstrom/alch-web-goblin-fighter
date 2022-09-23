/* Imports */
import { renderPlayer, renderGoblin } from './render-utils.js';
import { getRandomItem, getRandomNumber } from './utlis.js';

/* Get DOM Elements */
const playerSection = document.getElementById('player-section');
const goblinList = document.getElementById('goblin-list');
const goblinsDefeatedDisplay = document.getElementById('goblins-defeated-display');
const messageDisplay = document.getElementById('message-display');
const summonGoblinForm = document.getElementById('summon-goblin-form');
const clearBattlefieldButton = document.getElementById('clear-battlefield-button');

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

/* Events */

summonGoblinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(summonGoblinForm);
    console.log(formData.get('goblin-name'));
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
    //iterate through goblins, adding live ones to stillAlive array
    let stillAlive = [];
    for (let goblin of goblins) {
        if (goblin.hp > 0) {
            stillAlive.push(goblin);
        }
    }
    //assign stillAlive into goblins array
    goblins = stillAlive;
    //set message
    message = 'Cleared the Battlefield of defeated Goblins';
    //update goblin display and message display
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
            console.log('clicked');
            if (goblin.hp === 0) {
                message = `You: -1 from exposure to ${goblin.name}'s toxic viscera. `;
                player.hp--;
            } else {
                const playerDamageReceived = 2;
                const goblinDamageReceived = 2;
                player.hp -= playerDamageReceived;
                goblin.hp -= goblinDamageReceived;
                message = `you attacked`; //todo add damages in here
                //todo logic if dead
            }

            displayMessage();
            displayPlayer();
            displayGoblins();
            displayScore();
            //set player damage from distribution array
            //set goblin damage from distribution array
            // update player hp
            //update goblin hp
            //update message w/ player and goblin hp
            //some logic for special message if player hp <= 0 (in which case, set hp 0 )
            //some logic for special message if goblin hp <= 0 (in which case, set it to 0)
        });
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
