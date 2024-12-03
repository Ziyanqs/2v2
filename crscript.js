// Game Variables
let player1Score = 0;
let player2Score = 0;

const gameArea = document.getElementById('game-area');
const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');
const ball = document.getElementById('ball');
const player1Scoreboard = document.getElementById('player1-score');
const player2Scoreboard = document.getElementById('player2-score');

// Paddle Movement Controls
let player1Y = 250; // Initial position for player 1
let player2Y = 250; // Initial position for player 2
const paddleSpeed = 10;
const paddleHeight = 100;
const gameAreaHeight = gameArea.offsetHeight;

// Ball Movement Variables
let ballX = gameArea.offsetWidth / 2 - 10; // Center ball horizontally
let ballY = gameArea.offsetHeight / 2 - 10; // Center ball vertically
let ballSpeedX = 5;
let ballSpeedY = 5;
const ballSize = 20;

// Key Controls
let keysPressed = {};

// Detect keydown and keyup events for player movement
window.addEventListener('keydown', (e) => {
    keysPressed[e.key] = true;
});
window.addEventListener('keyup', (e) => {
    keysPressed[e.key] = false;
});

// Game Loop
function gameLoop() {
    movePaddles();
    moveBall();
    checkCollisions();
    requestAnimationFrame(gameLoop);
}

// Move Paddles based on keypresses
function movePaddles() {
    // Player 1 Controls (W and S)
    if (keysPressed['w'] && player1Y > 0) {
        player1Y -= paddleSpeed;
    }
    if (keysPressed['s'] && player1Y < gameAreaHeight - paddleHeight) {
        player1Y += paddleSpeed;
    }
    player1.style.top = player1Y + 'px';

    // Player 2 Controls (Arrow Up and Arrow Down)
    if (keysPressed['ArrowUp'] && player2Y > 0) {
        player2Y -= paddleSpeed;
    }
    if (keysPressed['ArrowDown'] && player2Y < gameAreaHeight - paddleHeight) {
        player2Y += paddleSpeed;
    }
    player2.style.top = player2Y + 'px';
}

// Move the ball and check for wall collisions
function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball hits top or bottom wall
    if (ballY <= 0 || ballY >= gameAreaHeight - ballSize) {
        ballSpeedY = -ballSpeedY;
    }

    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';

    // Ball goes out of bounds (score point)
    if (ballX <= 0) {
        player2Score++;
        updateScore();
        resetBall();
    } else if (ballX >= gameArea.offsetWidth - ballSize) {
        player1Score++;
        updateScore();
        resetBall();
    }
}

// Check for collisions between the ball and paddles
function checkCollisions() {
    const ballRect = ball.getBoundingClientRect();
    const player1Rect = player1.getBoundingClientRect();
    const player2Rect = player2.getBoundingClientRect();

    // Ball hits Player 1's paddle
    if (ballRect.left <= player1Rect.right && 
        ballRect.top >= player1Rect.top && 
        ballRect.bottom <= player1Rect.bottom) {
        ballSpeedX = -ballSpeedX;
    }

    // Ball hits Player 2's paddle
    if (ballRect.right >= player2Rect.left && 
        ballRect.top >= player2Rect.top && 
        ballRect.bottom <= player2Rect.bottom) {
        ballSpeedX = -ballSpeedX;
    }
}

// Reset ball position after scoring
function resetBall() {
    ballX = gameArea.offsetWidth / 2 - ballSize / 2; // Center the ball
    ballY = gameArea.offsetHeight / 2 - ballSize / 2; // Center the ball
    ballSpeedX = -ballSpeedX;  // Reverse ball direction
}

// Update the score on the screen
function updateScore() {
    player1Scoreboard.textContent = player1Score;
    player2Scoreboard.textContent = player2Score;
}

// Start the game loop
gameLoop();
