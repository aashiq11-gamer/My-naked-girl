const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 600;
canvas.height = 400;

let timer = 15;
let score = 0;
let level = 1;
let selectedOptions = { character: '', dress: '', shoes: '' };
let interval;

// Character and asset images
const assets = {
  characters: ['character1.png', 'character2.png', 'character3.png'],
  dresses: ['dress1.png', 'dress2.png', 'dress3.png'],
  shoes: ['shoes1.png', 'shoes2.png', 'shoes3.png'],
  environments: {
    room: 'room.png',
    closet: 'closet.png',
    garden: 'garden.png'
  }
};

// Start Game
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
  drawAnimatedCharacters();
}

// Render Dress Selection
function renderDressSelection() {
  drawEnvironment(assets.environments.closet);
  drawAnimatedOptions(assets.dresses, 'dress');
}

// Render Shoe Selection
function renderShoeSelection() {
  drawEnvironment(assets.environments.garden);
  drawAnimatedOptions(assets.shoes, 'shoes');
}

// Draw Environment
function drawEnvironment(imageSrc) {
  const img = new Image();
  img.src = imageSrc;
  img.onload = () => {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };
}

// Draw Animated Characters
function drawAnimatedCharacters() {
  assets.characters.forEach((character, index) => {
    const img = new Image();
    img.src = character;
    img.onload = () => {
      ctx.drawImage(img, 100 + index * 150, 150, 100, 200);
      ctx.fillStyle = '#fff';
      ctx.font = '16px Arial';
      ctx.fillText(`Character ${index + 1}`, 120 + index * 150, 370);
    };
  });

  canvas.addEventListener('click', (e) => {
    const x = e.offsetX;
    if (x >= 100 && x <= 200) selectedOptions.character = 'Character 1';
    if (x >= 250 && x <= 350) selectedOptions.character = 'Character 2';
    if (x >= 400 && x <= 500) selectedOptions.character = 'Character 3';
  });
}

// Draw Animated Options (Dresses or Shoes)
function drawAnimatedOptions(items, type) {
  items.forEach((item, index) => {
    const img = new Image();
    img.src = item;
    img.onload = () => {
      ctx.drawImage(img, 100 + index * 150, 150, 100, 100);
      ctx.fillStyle = '#fff';
      ctx.font = '16px Arial';
      ctx.fillText(`${type} ${index + 1}`, 120 + index * 150, 270);
    };
  });

  canvas.addEventListener('click', (e) => {
    const x = e.offsetX;
    if (x >= 100 && x <= 200) selectedOptions[type] = `${type} 1`;
    if (x >= 250 && x <= 350) selectedOptions[type] = `${type} 2`;
    if (x >= 400 && x <= 500) selectedOptions[type] = `${type} 3`;
  });
}

// Show Ad
function showAd(callback) {
  window.open('https://example.com', '_blank'); // Replace with actual ad link
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
  score = Math.floor(Math.random() * 101); // Example scoring
  document.getElementById('score').innerText = `Score: ${score}`;
}
