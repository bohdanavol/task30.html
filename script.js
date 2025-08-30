// розмір клітинки
const CELL = 50;

// лабіринт: 0 - дорога, 1 - стіна
const maze = [
  [0,1,0,0,0,0,0,1,0,0],
  [0,1,0,1,1,0,0,1,0,0],
  [0,0,0,1,0,0,1,1,0,1],
  [1,1,0,1,0,0,0,0,0,0],
  [0,0,0,0,1,1,1,1,1,0],
  [0,1,1,0,0,0,0,0,1,0],
  [0,1,0,0,1,1,0,1,0,0],
  [0,0,0,1,0,0,0,0,0,0],
];

// старт і фініш
const start = { x: 0, y: 0 };
const end   = { x: 9, y: 7 };

// прив'язка з HTML
const game = document.getElementById('game');
const msg  = document.getElementById('msg');

// розміри поля
game.style.width  = (maze[0].length * CELL) + 'px';
game.style.height = (maze.length * CELL) + 'px';

// поле
for (let y = 0; y < maze.length; y++) {
  for (let x = 0; x < maze[y].length; x++) {
    const cell = document.createElement('div');
    cell.className = 'cell ' + (maze[y][x] ? 'wall' : 'floor');
    cell.style.left = (x * CELL) + 'px';
    cell.style.top  = (y * CELL) + 'px';
    game.appendChild(cell);
  }
}

// фініш
const finish = document.createElement('img');
finish.id = 'finish';
finish.src = 'media/LA7691BC-BLACK_05-600x715.jpg';
finish.alt = 'Холодильник';
finish.width = CELL;
finish.height = CELL;
finish.draggable = false;
finish.style.left = (end.x * CELL) + 'px';
finish.style.top  = (end.y * CELL) + 'px';
game.appendChild(finish);

// гравець
const player = document.createElement('img');
player.id = 'player';
player.src = 'media/kurica-gril-fozzy.jpg';
player.alt = 'Курочка-гриль';
player.width = CELL;
player.height = CELL;
player.draggable = false;
player.style.left = (start.x * CELL) + 'px';
player.style.top  = (start.y * CELL) + 'px';
game.appendChild(player);

// рух стрілками
document.addEventListener('keydown', (e) => {
  if (msg.innerText) return; // якщо вже перемога — стоп

  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
    e.preventDefault();
  }

  // рух залежно від самої клавіші
  if (e.key === 'ArrowUp')    movePlayer(0, -CELL);
  if (e.key === 'ArrowDown')  movePlayer(0,  CELL);
  if (e.key === 'ArrowLeft')  movePlayer(-CELL, 0);
  if (e.key === 'ArrowRight') movePlayer( CELL, 0);

  // перевірка перемоги
  checkWin();
});

// функція руху
function movePlayer(dx, dy) {
  const x = parseInt(player.style.left, 10);
  const y = parseInt(player.style.top , 10);
  const nextX = x + dx;
  const nextY = y + dy;

  if (!inBounds(nextX, nextY)) return;    // не виходимо за межі
  if (hasCollision(nextX, nextY)) return; // не влітаємо в стіну

  player.style.left = nextX + 'px';
  player.style.top  = nextY + 'px';
}

// чи в межах поля
function inBounds(px, py) {
  return px >= 0 && py >= 0 &&
         px < maze[0].length * CELL &&
         py < maze.length     * CELL;
}

// чи стіна
function hasCollision(nextX, nextY) {
  const gx = Math.floor(nextX / CELL);
  const gy = Math.floor(nextY / CELL);

  if (gy < 0 || gy >= maze.length) return true;
  if (gx < 0 || gx >= maze[0].length) return true;

  return maze[gy][gx] === 1;
}

// перевірка перемоги
function checkWin(){
  const gx = Math.round(parseInt(player.style.left,10)/CELL);
  const gy = Math.round(parseInt(player.style.top ,10)/CELL);
  if (gx === end.x && gy === end.y) msg.innerText = 'Ви перемогли!';
}