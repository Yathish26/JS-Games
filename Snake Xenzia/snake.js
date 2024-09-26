const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const playGameBtn = document.getElementById('playGameBtn');
const playAgainBtn = document.getElementById('playAgainBtn');

// Define the size of the grid and the snake
const gridSize = 20;  // Each square in the grid is 20x20 pixels
const rows = canvas.height / gridSize;
const columns = canvas.width / gridSize;

// Initial snake state and food
let snake, dx, dy, food, score, gameOver;

// Function to reset the game
function resetGame() {
    snake = [
        { x: 5, y: 5 },
        { x: 4, y: 5 },
        { x: 3, y: 5 },
    ];
    dx = 1;
    dy = 0;
    food = { x: Math.floor(Math.random() * columns), y: Math.floor(Math.random() * rows) };
    score = 0;
    gameOver = false;

    // Hide the play again button
    playAgainBtn.style.display = 'none';
    
    // Start the game loop
    gameLoop();
}

// Draw the snake on the canvas
function drawSnake() {
    ctx.fillStyle = 'green';
    snake.forEach(part => {
        ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize, gridSize);
    });
}

// Draw the food on the canvas
function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

// Move the snake
function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };

    // Check for collisions with walls or self
    if (head.x < 0 || head.x >= columns || head.y < 0 || head.y >= rows || snake.some(part => part.x === head.x && part.y === head.y)) {
        gameOver = true;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        food = { x: Math.floor(Math.random() * columns), y: Math.floor(Math.random() * rows) };
    } else {
        snake.pop();
    }
}

// Draw the game state
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFood();
    drawSnake();

    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 20);

    if (gameOver) {
        ctx.fillStyle = 'white';
        ctx.font = '40px Arial';
        ctx.fillText('Game Over', canvas.width / 4, canvas.height / 2);

        // Show the "Play Again" button
        playAgainBtn.style.display = 'block';
    }
}

// Handle snake movement
function changeDirection(event) {
    const keyPressed = event.key;
    if (keyPressed === 'ArrowUp' && dy === 0) {
        dx = 0;
        dy = -1;
    }
    if (keyPressed === 'ArrowDown' && dy === 0) {
        dx = 0;
        dy = 1;
    }
    if (keyPressed === 'ArrowLeft' && dx === 0) {
        dx = -1;
        dy = 0;
    }
    if (keyPressed === 'ArrowRight' && dx === 0) {
        dx = 1;
        dy = 0;
    }
}

// Main game loop
function gameLoop() {
    if (!gameOver) {
        moveSnake();
        drawGame();
        setTimeout(gameLoop, 100); // Control game speed
    }
}

// Start the game when "Play Game" button is clicked
playGameBtn.addEventListener('click', () => {
    // Hide the "Play Game" button
    playGameBtn.style.display = 'none';

    // Show the canvas
    canvas.style.display = 'block';

    // Reset and start the game
    resetGame();
});

// Listen for direction changes
document.addEventListener('keydown', changeDirection);

// Listen for "Play Again" button click
playAgainBtn.addEventListener('click', resetGame);
