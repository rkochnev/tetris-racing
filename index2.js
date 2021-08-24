const cells = [];
const playerState = {
    isAlive: true,
    points: [],
};

function clickReaction() {
    const gamefield = document.getElementById("gameField");
    const button = document.getElementById("submit");
    button.classList.add("invisiblebutton");
    for (let y = 0; y < 30; y++) {
        for (let x = 0; x < 10; x++) {
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
            //объйвление игрока

            if ((y === 29 && x === 4) || (y === 29 && x === 6) ||
                (y === 28 && x === 5) || (y === 27 && x === 4) ||
                (y === 27 && x === 6) || (y === 26 && x === 5)) {
                metadata.isPlayer = true;
                playerState.points.push(metadata);
            }

            if ((x === 1 && y === 4) || (x === 0 && y === 5) ||
                (x === 2 && y === 5) || (x === 1 && y === 6) ||
                (x === 0 && y === 7) || (x === 2 && y === 7)) {

                metadata.isBlock = true;
                playerState.points.push(metadata);
            }

            if ((x === 7 && y === 4) || (x === 9 && y === 4) ||
                (x === 8 && y === 1) || (x === 7 && y === 2) ||
                (x === 9 && y === 2) || (x === 8 && y === 3)) {

                metadata.isBlock = true;
                playerState.points.push(metadata);
            }
        }
    }

    setTimeout(tick, 1000);

}


function tick() {
    moveBlock();
    crush();

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

    
    setTimeout(tick, 200);
}


const el = document.getElementById("submit");
el.addEventListener("click", clickReaction, );


function moveUp(event) {
    if (event.code == 'ArrowUp') {
        // находим ячейки, которые принадлежат игроку
        const playerCells = cells.filter((cell) => cell.isPlayer);

        // раскрашиваем ячейки, которые принадлежат игроку
        for (const cell of playerCells) {
            cell.isPlayer = false;
        }

        console.log('Current', playerCells);

        // смещаем игрока
        const newCoords = playerCells
            .map((cell) => {
                return { x: cell.x, y: cell.y - 1 }
            });

        console.log('new', newCoords);

        // закрашиваем ячейки игрока
        for (const coord of newCoords) {
            const cell = cells.find((cell) => coord.x === cell.x && coord.y === cell.y)
            cell.isPlayer = true;
        }

    }
};

document.addEventListener('keydown', moveUp);


function movedown(event) {
    if (event.code == 'ArrowDown') {
        const playerCells = cells.filter((cell) => cell.isPlayer);

        for (const cell of playerCells) {
            cell.isPlayer = false;
        }

        console.log('Current', playerCells);

        const newCoords = playerCells
            .map((cell) => {
                return { x: cell.x, y: cell.y + 1 }
            });

        console.log('new', newCoords);

        for (const coord of newCoords) {
            const cell = cells.find((cell) => coord.x === cell.x && coord.y === cell.y)
            cell.isPlayer = true;
        }
    }
};

document.addEventListener('keydown', movedown);



function moveright(event) {
    if (event.code == 'ArrowRight') {
        const playerCells = cells.filter((cell) => cell.isPlayer);

        for (const cell of playerCells) {
            cell.isPlayer = false;
        }

        console.log('Current', playerCells);

        const newCoords = playerCells
            .map((cell) => {
                return { x: cell.x + 1, y: cell.y }
            });

        console.log('new', newCoords);

        for (const coord of newCoords) {
            const cell = cells.find((cell) => coord.x === cell.x && coord.y === cell.y)
            if (coord.x < 10){
            cell.isPlayer = true;}
            else {
                coord.x === 1;
            }
           
        }
    }
};

document.addEventListener('keydown', moveright);

function moveleft(event) {
    if (event.code == 'ArrowLeft') {
        const playerCells = cells.filter((cell) => cell.isPlayer);

        for (const cell of playerCells) {
            cell.isPlayer = false;
        }

        console.log('Current', playerCells);

        const newCoords = playerCells
            .map((cell) => {
                return { x: cell.x - 1, y: cell.y }
            });

        console.log('new', newCoords);

        for (const coord of newCoords) {
            const cell = cells.find((cell) => coord.x === cell.x && coord.y === cell.y)
            if (coord.x >= 0) {
            cell.isPlayer = true;}
            else {
                coord.x = 10;
            }
        }
    }
};

document.addEventListener('keydown', moveleft);


function moveBlock() {

    
    const blockCells = cells.filter((cell) => cell.isBlock);

    console.log(blockCells);
    
    
    

    for (const cell of blockCells) {
        cell.isBlock = false;
    }
    const newCoords = blockCells
        .map((cell) => {
            return {x: cell.x, y: cell.y + 1}
        });
        console.log(newCoords);
        
       
  
    for (const coord of newCoords) {
        
        const cell = cells.find((cell) => coord.x === cell.x && coord.y === cell.y)
        if (coord.y < 29){
        cell.isBlock = true}
         else {
            cell.isBlock = false;
            ;
        
         }   
    }
};



function crush() {
    let playerCells = document.querySelectorAll('.is-player');
    let blockCells = document.querySelectorAll('.is-block');    

}







