export function renderPlayer() {
    const div = document.createElement('div');
    const p = document.createElement('p');
    p.textContent = 'blah';
    div.append(p);
    console.log(div);
    return div;
}
