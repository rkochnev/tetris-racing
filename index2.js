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
        if (cell.isPlayer) {
            cell.element.classList.remove('is-block');
            cell.element.classList.add('is-player');
        } else if (cell.isBlock) {
            cell.element.classList.remove('is-player');
            cell.element.classList.add('is-block');
        } else {
            cell.element.classList.remove('is-player');
            cell.element.classList.remove('is-block');
        }
    }
    setTimeout(tick, 1000);
}


const el = document.getElementById("submit");
el.addEventListener("click",clickReaction,);


function moveUp(event){
    if (event.code == 'ArrowUp') {
        const playerCells = cells.filter((cell) => cell.isPlayer);
        for (const cell of playerCells) {
            cell.isPlayer = false;
        }

        console.log('Current', playerCells);

        const newCoords = playerCells
            .map((cell) => {
                return {x: cell.x, y: cell.y - 1}
            });

        console.log('new', newCoords);

        for (const coord of newCoords) {
            const cell = cells.find((cell) => coord.x === cell.x && coord.y === cell.y)
            cell.isPlayer = true;
        }

    }};

document.addEventListener('keydown',moveUp);
