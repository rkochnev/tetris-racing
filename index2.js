let cells = [];
let countEnemyCars = 0;
let timerId = null;
let score = 0;
let needStop = true;

const countCellsInEnemyCar = 6;

function clickReaction() {
    needStop = false;
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
            }

            createEnemyCar(0, 4);
            createEnemyCar(7, 1); 
        }
    }

    timerId = setTimeout(tick, 300);

}

function createEnemyCar(x, y) {
    const carCoords = [
        {
            x: x + 1,
            y: y,
        },
        {
            x: x,
            y: y + 1,
        },
        {
            x: x + 2,
            y: y + 1,
        },
        {
            x: x + 1,
            y: y + 2,
        },
        {
            x: x,
            y: y + 3,
        },
        {
            x: x + 2,
            y: y + 3,
        },
    ];

    for (const coord of carCoords) {
        const cell = cells.find((cell) => coord.x === cell.x && coord.y === cell.y)
        if (cell != null) {
            cell.isBlock = true
        }
    }

    countEnemyCars += 1;

}



const scoreEl = document.querySelector('.time');
function tick() {
    if (needStop) return;
    moveBlock();

    score += 1;
    scoreEl.innerHTML = score;

    if (countEnemyCars < 1) {
        createEnemyCar(Math.floor(Math.random() * 4), 0);
        createEnemyCar(Math.floor(Math.random() * 8)+ 4, 7);
    }
    
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
    crush();
    
    timerId = setTimeout(tick, 200);
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

            const carInOutOfBounce = newCoords.some((coord) => coord.y < 0);

            console.log('new', newCoords, carInOutOfBounce);
    
            if (carInOutOfBounce) {
                for (const cell of playerCells) {
                    cell.isPlayer = true;
                }
                return;
            }

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

            const carInOutOfBounce = newCoords.some((coord) => coord.y > 29);

            console.log('new', newCoords, carInOutOfBounce);
    
            if (carInOutOfBounce) {
                for (const cell of playerCells) {
                    cell.isPlayer = true;
                }
                return;
            }

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
                return {x: cell.x + 1, y: cell.y }
            });

         const carInOutOfBounce = newCoords.some((coord) => coord.x > 9);

        console.log('new', newCoords, carInOutOfBounce);

        if (carInOutOfBounce) {
            for (const cell of playerCells) {
                cell.isPlayer = true;
            }
            return;
        }

        for (const coord of newCoords) {
            const cell = cells.find((cell) => coord.x === cell.x && coord.y === cell.y)
            cell.isPlayer = true;
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
                return {x: cell.x - 1, y: cell.y }
            });

            const carInOutOfBounce = newCoords.some((coord) => coord.x < 0);

            console.log('new', newCoords, carInOutOfBounce);
    
            if (carInOutOfBounce) {
                for (const cell of playerCells) {
                    cell.isPlayer = true;
                }
                return;
            }
        
        for (const coord of newCoords) {
            const cell = cells.find((cell) => coord.x === cell.x && coord.y === cell.y)
            cell.isPlayer = true;
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
        if (coord.y <= 29) {
            cell.isBlock = true
        }
    }
    countEnemyCars = Math.round(cells.filter((cell) => cell.isBlock).length / countCellsInEnemyCar);   
    
    

};



function crush() {
    let player = cells.filter((cell) => cell.isPlayer);
    let block = cells.filter((cell) => cell.isBlock);

    for (const cellPlayer of player) {
        for(const cellBlock of block) {
            if (cellPlayer == cellBlock) {
                alert('Game over');
                
                resetGame();
                return;

            }

        }
    }
};

function resetGame() {
    clearTimeout(timerId);
    needStop = true;
    score = 0;
    score.innerHTML = '';
    cells = [];
    const gamefield = document.getElementById("gameField");
    const button = document.getElementById("submit");
    button.classList.remove("invisiblebutton");
    gamefield.innerHTML = '';
}










