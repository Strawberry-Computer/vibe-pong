const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');
// PROMPT: Use Canvas API to draw elements

const paddleWidth = 100;
const paddleHeight = 10;
const playerPaddleX = (canvas.width - paddleWidth) / 2;
let playerPaddleSpeed = 7;
let playerPaddleDirection = 0;
// PROMPT: Draw a white paddle (100px wide, 10px high) at the bottom, movable left/right

const aiPaddleX = (canvas.width - paddleWidth) / 2;
let aiPaddleSpeed = 5;
// PROMPT: Add AI player paddle at the top of the canvas

const ballRadius = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = -5;
// PROMPT: Draw a white ball (10px radius) starting at canvas center, moving diagonally with constant speed

let playerScore = 0;
let aiScore = 0;
// PROMPT: Initialize score variables for both player and AI

function drawPlayerPaddle() {
    ctx.fillStyle = 'white';
    ctx.fillRect(playerPaddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    // PROMPT: Draw a white paddle at the bottom for the player
}

function drawAiPaddle() {
    ctx.fillStyle = 'white';
    ctx.fillRect(aiPaddleX, 0, paddleWidth, paddleHeight);
    // PROMPT: Draw a white paddle at the top for the AI
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();
    // PROMPT: Draw a white ball
}

function updatePlayerPaddle() {
    if (playerPaddleDirection === -1 && playerPaddleX > 0) {
        playerPaddleX -= playerPaddleSpeed;
    }
    if (playerPaddleDirection === 1 && playerPaddleX < canvas.width - paddleWidth) {
        playerPaddleX += playerPaddleSpeed;
    }
    // PROMPT: Movable left/right with arrow keys for player paddle
}

function updateAiPaddle() {
    if (ballY < canvas.height / 2 && ballSpeedY < 0) {
        if (ballX < aiPaddleX + paddleWidth / 2 && aiPaddleX > 0) {
            aiPaddleX -= aiPaddleSpeed;
        }
        if (ballX > aiPaddleX + paddleWidth / 2 && aiPaddleX < canvas.width - paddleWidth) {
            aiPaddleX += aiPaddleSpeed;
        }
    }
    // PROMPT: Add AI logic to move the top paddle towards the ball's x position when the ball is in the upper half and moving upwards
}

function updateBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    // PROMPT: Ball moving diagonally with constant speed

    if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0) {
        ballSpeedX = -ballSpeedX;
    }
    // PROMPT: Bounce the ball off the side walls

    if (ballY + ballRadius > canvas.height) {
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        ballSpeedX = 5 * (Math.random() > 0.5 ? 1 : -1);
        ballSpeedY = -5;
        aiScore++;
        // PROMPT: Reset the ball to the center and increment AI score when it misses the player paddle (hits bottom)
    }

    if (ballY - ballRadius < 0) {
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        ballSpeedX = 5 * (Math.random() > 0.5 ? 1 : -1);
        ballSpeedY = 5;
        playerScore++;
        // PROMPT: Reset the ball to the center and increment player score when it misses the AI paddle (hits top)
    }

    if (ballY + ballRadius > canvas.height - paddleHeight && 
        ballX > playerPaddleX && ballX < playerPaddleX + paddleWidth) {
        ballSpeedY = -ballSpeedY;
        // PROMPT: Detect player paddle collision to bounce the ball back up
    }

    if (ballY - ballRadius < paddleHeight && 
        ballX > aiPaddleX && ballX < aiPaddleX + paddleWidth) {
        ballSpeedY = -ballSpeedY;
        // PROMPT: Detect AI paddle collision to bounce the ball back down
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayerPaddle();
    drawAiPaddle();
    drawBall();
    updatePlayerPaddle();
    updateAiPaddle();
    updateBall();
    document.getElementById('score').textContent = `Player: ${playerScore} | AI: ${aiScore}`;
    // PROMPT: Update the score display in the DOM each frame for both player and AI
    requestAnimationFrame(draw);
    // PROMPT: Use requestAnimationFrame for smooth animation
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        playerPaddleDirection = -1;
    } else if (e.key === 'ArrowRight') {
        playerPaddleDirection = 1;
    }
});
// PROMPT: Movable left/right with arrow keys for player paddle

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        playerPaddleDirection = 0;
    }
});
// PROMPT: Movable left/right with arrow keys for player paddle

draw();
// PROMPT: Start the animation loop