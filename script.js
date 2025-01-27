const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 600;
canvas.height = 400;

let timer = 15;
let score = 0;
let level = 1;
let selectedOptions = { character: '', dress: '', shoes: '', hair: '' };
let interval;

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
  selectedOptions = { character: '', dress: '', shoes: '', hair: '' };
  document.getElementById('timer').innerText = `Time: ${timer}s`;
  document.getElementById('score').innerText = `Score: ${score}`;
}

// Start a Level
function startLevel(currentLevel) {
  level = currentLevel;
  timer = 15;

  if (level === 1) {
    renderCharacterSelection();
  } else if (level === 2) {
    renderDressSelection();
  } else if (level === 3) {
    renderShoeSelection();
  } else if (level === 4) {
    renderHairSelection();
  }

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
  if (level < 4) {
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
  clearCanvas();
  ctx.font = '20px Arial';
  ctx.fillText('Select Your Character', 200, 50);

  const characters = ['Character 1', 'Character 2', 'Character 3'];
  characters.forEach((char, i) => {
    ctx.fillStyle = '#007bff';
    ctx.fillRect(100, 100 + i * 80, 400, 50);
    ctx.fillStyle = '#fff';
    ctx.fillText(char, 250, 130 + i * 80);

    canvas.addEventListener('click', (e) => {
      if (e.offsetY > 100 + i * 80 && e.offsetY < 150 + i * 80) {
        selectedOptions.character = char;
      }
    });
  });
}

// Render Dress Selection
function renderDressSelection() {
  clearCanvas();
  ctx.font = '20px Arial';
  ctx.fillText('Select a Dress', 230, 50);

  const dresses = ['Red Dress', 'Blue Dress', 'Green Dress'];
  dresses.forEach((dress, i) => {
    ctx.fillStyle = '#ff5733';
    ctx.fillRect(100, 100 + i * 80, 400, 50);
    ctx.fillStyle = '#fff';
    ctx.fillText(dress, 250, 130 + i * 80);

    canvas.addEventListener('click', (e) => {
      if (e.offsetY > 100 + i * 80 && e.offsetY < 150 + i * 80) {
        selectedOptions.dress = dress;
      }
    });
  });
}

// Render Shoe Selection
function renderShoeSelection() {
  clearCanvas();
  ctx.font = '20px Arial';
  ctx.fillText('Select Shoes', 230, 50);

  const shoes = ['Red Shoes', 'Black Shoes', 'White Shoes'];
  shoes.forEach((shoe, i) => {
    ctx.fillStyle = '#42a5f5';
    ctx.fillRect(100, 100 + i * 80, 400, 50);
    ctx.fillStyle = '#fff';
    ctx.fillText(shoe, 250, 130 + i * 80);

    canvas.addEventListener('click', (e) => {
      if (e.offsetY > 100 + i * 80 && e.offsetY < 150 + i * 80) {
        selectedOptions.shoes = shoe;
      }
    });
  });
}

// Render Hair Selection
function renderHairSelection() {
  clearCanvas();
  ctx.font = '20px Arial';
  ctx.fillText('Select a Hairstyle', 200, 50);

  const hairstyles = ['Blonde Hair', 'Brown Hair', 'Black Hair'];
  hairstyles.forEach((hair, i) => {
    ctx.fillStyle = '#d1a359';
    ctx.fillRect(100, 100 + i * 80, 400, 50);
    ctx.fillStyle = '#fff';
    ctx.fillText(hair, 250, 130 + i * 80);

    canvas.addEventListener('click', (e) => {
      if (e.offsetY > 100 + i * 80 && e.offsetY < 150 + i * 80) {
        selectedOptions.hair = hair;
      }
    });
  });
}

// Clear Canvas
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Show Ad
function showAd(callback) {
  window.open('https://example.com', '_blank'); // Replace with an actual ad link
  setTimeout(callback, 10000);
}

// Show Final Results
function showFinalResults() {
  clearCanvas();
  ctx.font = '20px Arial';
  ctx.fillText('Your Final Selection', 200, 50);
  ctx.fillText(`Character: ${selectedOptions.character}`, 50, 100);
  ctx.fillText(`Dress: ${selectedOptions.dress}`, 50, 150);
  ctx.fillText(`Shoes: ${selectedOptions.shoes}`, 50, 200);
  ctx.fillText(`Hair: ${selectedOptions.hair}`, 50, 250);
  ctx.fillText(`Score: ${score}`, 50, 300);
}

// Calculate Score
function calculateScore() {
  score = Math.floor(Math.random() * 101); // Example scoring
  document.getElementById('score').innerText = `Score: ${score}`;
}
