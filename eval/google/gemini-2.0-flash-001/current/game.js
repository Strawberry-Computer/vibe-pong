const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// Ball properties
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;
const ballSize = 10;

// Paddle properties
const paddleWidth = 10;
const paddleHeight = 100;
let playerPaddleY = canvas.height / 2 - paddleHeight / 2;
let opponentPaddleY = canvas.height / 2 - paddleHeight / 2;
const paddleSpeed = 7;

// Scores
let playerScore = 0;
let opponentScore = 0;

// Input
let upPressed = false;
let downPressed = false;

// Event listeners for input
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key == "Up" || e.key == "ArrowUp") {
        upPressed = true;
    }
    else if (e.key == "Down" || e.key == "ArrowDown") {
        downPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Up" || e.key == "ArrowUp") {
        upPressed = false;
    }
    else if (e.key == "Down" || e.key == "ArrowDown") {
        downPressed = false;
    }
}

// Update game logic
function update() {
    // Move paddles
    if (upPressed) {
        playerPaddleY -= paddleSpeed;
        if (playerPaddleY < 0) {
            playerPaddleY = 0;
        }
    }
    else if (downPressed) {
        playerPaddleY += paddleSpeed;
        if (playerPaddleY + paddleHeight > canvas.height) {
            playerPaddleY = canvas.height - paddleHeight;
        }
    }

    // PROMPT: Add AI Player to Pong
    // Basic opponent AI
    if (ballY < opponentPaddleY + paddleHeight / 2) {
        opponentPaddleY -= paddleSpeed;
        if (opponentPaddleY < 0) {
            opponentPaddleY = 0;
        }
    } else if (ballY > opponentPaddleY + paddleHeight / 2) {
        opponentPaddleY += paddleSpeed;
        if (opponentPaddleY + paddleHeight > canvas.height) {
            opponentPaddleY = canvas.height - paddleHeight;
        }
    }

    // Move ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision with top and bottom walls
    if (ballY + ballSize > canvas.height || ballY - ballSize < 0) {
        ballSpeedY = -ballSpeedY;
    }

    // Ball collision with paddles
    if (ballX - ballSize < paddleWidth && ballY > playerPaddleY && ballY < playerPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }
    if (ballX + ballSize > canvas.width - paddleWidth && ballY > opponentPaddleY && ballY < opponentPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    // Ball out of bounds
    if (ballX < 0) {
        opponentScore++;
        resetBall();
    } else if (ballX > canvas.width) {
        playerScore++;
        resetBall();
    }
}

// Reset ball position and direction
function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
    ballSpeedY = 5;
}

// Draw everything
function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw ball
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
    ctx.fill();

    // Draw paddles
    ctx.fillRect(0, playerPaddleY, paddleWidth, paddleHeight);
    ctx.fillRect(canvas.width - paddleWidth, opponentPaddleY, paddleWidth, paddleHeight);

    // PROMPT: Add AI Player to Pong
    // PROMPT: Add Scoring to Pong
    // Draw scores
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Player: ' + playerScore, canvas.width / 4, 30);
    ctx.fillText('Opponent: ' + opponentScore, canvas.width * 3 / 4, 30);
}

// Game loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Start the game
gameLoop();