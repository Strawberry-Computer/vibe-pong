const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');

// Game elements
const paddleWidth = 100;
const paddleHeight = 10;
const ballRadius = 10;

let playerPaddleX = (canvas.width - paddleWidth) / 2;
let computerPaddleX = (canvas.width - paddleWidth) / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 4;
let ballSpeedY = 4;
let score = 0;

// Key states
let rightPressed = false;
let leftPressed = false;

// Event listeners
document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

function keyDownHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = false;
    }
}

function drawPaddle(x, y) {
    ctx.beginPath();
    ctx.rect(x, y, paddleWidth, paddleHeight);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();
}

function updateScore() {
    scoreDisplay.textContent = `Score: ${score}`;
}

function computerAI() {
    // Simple AI to follow the ball
    const computerPaddleCenter = computerPaddleX + paddleWidth / 2;
    if (computerPaddleCenter < ballX - 10) {
        computerPaddleX += 5;
    } else if (computerPaddleCenter > ballX + 10) {
        computerPaddleX -= 5;
    }

    // Keep paddle in bounds
    if (computerPaddleX < 0) {
        computerPaddleX = 0;
    } else if (computerPaddleX > canvas.width - paddleWidth) {
        computerPaddleX = canvas.width - paddleWidth;
    }
}

function update() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw elements
    drawPaddle(playerPaddleX, canvas.height - paddleHeight); // Player paddle
    drawPaddle(computerPaddleX, 0); // Computer paddle (top)
    drawBall();
    
    // Move player paddle
    if (rightPressed && playerPaddleX < canvas.width - paddleWidth) {
        playerPaddleX += 7;
    } else if (leftPressed && playerPaddleX > 0) {
        playerPaddleX -= 7;
    }
    
    // Computer AI movement
    computerAI();
    
    // Move ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    
    // Wall collision (left, right)
    if (ballX - ballRadius < 0 || ballX + ballRadius > canvas.width) {
        ballSpeedX = -ballSpeedX;
    }
    
    // Paddle collision (player)
    if (
        ballY + ballRadius > canvas.height - paddleHeight &&
        ballX > playerPaddleX &&
        ballX < playerPaddleX + paddleWidth
    ) {
        ballSpeedY = -ballSpeedY;
        score++;
        updateScore();
    }
    
    // Paddle collision (computer)
    if (
        ballY - ballRadius < paddleHeight &&
        ballX > computerPaddleX &&
        ballX < computerPaddleX + paddleWidth
    ) {
        ballSpeedY = -ballSpeedY;
    }
    
    // Bottom wall (player miss)
    if (ballY + ballRadius > canvas.height) {
        // Reset ball
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        ballSpeedX = Math.random() > 0.5 ? 4 : -4;
        ballSpeedY = 4;
    }
    
    // Top wall (computer miss)
    if (ballY - ballRadius < 0) {
        // Reset ball
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        ballSpeedX = Math.random() > 0.5 ? 4 : -4;
        ballSpeedY = -4;
    }
    
    requestAnimationFrame(update);
}

// Initialize score display
updateScore();

// Start the game
update();