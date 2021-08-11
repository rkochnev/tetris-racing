const cells = [];
const playerState = {
    isAlive: true,
    points: [],
};

function clickReaction () {
    const gamefield = document.getElementById("gameField");
    const button = document.getElementById("submit");
    button.classList.add("invisiblebutton");
    for ( let y = 0; y<30; y++){
        for( let x = 0; x<10; x++){
            const elem = document.createElement("div");
            elem.classList.add('cell');
            gamefield.appendChild(elem);
            const metadata = {
                x: x,
                y: y,
                isPlayer: false,
                isBlock: false,
                element: elem,
            };
            cells.push(metadata);

            if (y >= 28 && (x === 4 || x === 5)) {
                metadata.isPlayer = true;
                playerState.points.push(metadata);
            }
        }
    }

    setTimeout(tick, 1000);
}

function tick() {
    for (const cell of cells) {
        cell.element.classList.remove('is-player');
        cell.element.classList.remove('is-block');
    }
    for (const cell of playerState.points) {
        cell.element.classList.add('is-player');
    }
    setTimeout(tick, 1000);
}


const el = document.getElementById("submit");
el.addEventListener("click",clickReaction,);


