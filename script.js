const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Responsive canvas size
canvas.width = window.innerWidth * 0.9;
canvas.height = window.innerHeight * 0.5;

let timer = 15;
let score = 0;
let level = 1;
let selectedOptions = { character: '', dress: '', shoes: '' };
let interval;

// Asset paths
const assets = {
  characters: ['assets/character1.png', 'assets/character2.png', 'assets/character3.png'],
  dresses: ['assets/dress1.png', 'assets/dress2.png', 'assets/dress3.png'],
  shoes: ['assets/shoes1.png', 'assets/shoes2.png', 'assets/shoes3.png'],
  environments: {
    room: 'assets/room.png',
    closet: 'assets/closet.png',
    garden: 'assets/garden.png'
  }
};

// Start Game Button
document.getElementById('startGame').addEventListener('click', () => {
  resetGame();
  startLevel(1);
});

// Reset Game
function resetGame() {
  timer = 15;
  score = 0;
  level = 1;
  selectedOptions = { character: '', dress: '', shoes: '' };
  document.getElementById('timer').innerText = `Time: ${timer}s`;
  document.getElementById('score').innerText = `Score: ${score}`;
}

// Start Level
function startLevel(currentLevel) {
  level = currentLevel;
  timer = 15;

  if (level === 1) renderCharacterSelection();
  else if (level === 2) renderDressSelection();
  else if (level === 3) renderShoeSelection();

  interval = setInterval(() => {
    timer--;
    document.getElementById('timer').innerText = `Time: ${timer}s`;
    if (timer <= 0) {
      clearInterval(interval);
      endLevel();
    }
  }, 1000);
}

// End Level
function endLevel() {
  if (level < 3) {
    showAd(() => {
      startLevel(level + 1);
    });
  } else {
    calculateScore();
    showFinalResults();
  }
}

// Render Character Selection
function renderCharacterSelection() {
  drawEnvironment(assets.environments.room);
  drawOptions(assets.characters, 'character');
}

// Render Dress Selection
function renderDressSelection() {
  drawEnvironment(assets.environments.closet);
  drawOptions(assets.dresses, 'dress');
}

// Render Shoe Selection
function renderShoeSelection() {
  drawEnvironment(assets.environments.garden);
  drawOptions(assets.shoes, 'shoes');
}

// Draw Environment
function drawEnvironment(imageSrc) {
  const img = new Image();
  img.src = imageSrc;
  img.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };
}

// Draw Options
function drawOptions(items, type) {
  items.forEach((item, index) => {
    const img = new Image();
    img.src = item;
    img.onload = () => {
      const scaledWidth = canvas.width / 5;
      const scaledHeight = scaledWidth * (img.height / img.width);
      ctx.drawImage(img, 100 + index * (scaledWidth + 20), 150, scaledWidth, scaledHeight);
    };
  });

  canvas.addEventListener('click', (e) => {
    const x = e.offsetX;
    selectedOptions[type] = x <= canvas.width / 2 ? items[0] : items[1];
  });
}

// Show Ad
function showAd(callback) {
  window.open('https://example.com', '_blank'); // Replace with your ad link
  setTimeout(callback, 10000);
}

// Show Final Results
function showFinalResults() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = '20px Arial';
  ctx.fillText('Your Final Selections', 200, 50);
  ctx.fillText(`Character: ${selectedOptions.character}`, 50, 100);
  ctx.fillText(`Dress: ${selectedOptions.dress}`, 50, 150);
  ctx.fillText(`Shoes: ${selectedOptions.shoes}`, 50, 200);
  ctx.fillText(`Score: ${score}`, 50, 250);
}

// Calculate Score
function calculateScore() {
  score = Math.floor(Math.random() * 101);
  document.getElementById('score').innerText = `Score: ${score}`;
}
