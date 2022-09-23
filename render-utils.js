export function renderPlayer(player) {
    const div = document.createElement('div');
    const img = document.createElement('img');
    if (player.hp === 0) {
        img.src = './assets/player/defeated.png';
    } else {
        img.src = './assets/player/player.png';
    }
    div.append(img);
    const p = document.createElement('p');
    p.textContent = `${player.hp} HP`;
    div.append(p);
    return div;
}

export function renderGoblin(goblin) {
    const li = document.createElement('li');
    const button = document.createElement('button');
    const img = document.createElement('img');
    const name = document.createElement('p');
    const hp = document.createElement('p');
    //if live. else use defeated.png
    if (goblin.hp > 0) {
        img.src = `./assets/goblins/${goblin.type}.png`;
    } else {
        img.src = './assets/goblins/defeated.png';
    }
    img.alt = goblin.type;
    name.textContent = goblin.name;
    hp.textContent = `${goblin.hp} HP`;
    button.append(img, name, hp);
    button.classList.add('goblin-button');

    li.append(button);
    return li;
}
