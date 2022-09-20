export function renderPlayer(player) {
    const div = document.createElement('div');
    const img = document.createElement('img');
    img.src = './assets/player/player.png';
    div.append(img);
    const p = document.createElement('p');
    p.textContent = `${player.hp} HP`;
    div.append(p);
    console.log(div);
    return div;
}
