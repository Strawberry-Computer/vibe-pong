const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('scoreDisplay');

// PROMPT: Add scoring system
let playerScore = 0;
let computerScore = 0;

const paddleWidth = 10;
const paddleHeight = 100;
let paddleY = canvas.height / 2 - paddleHeight / 2;

const ballRadius = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;

function draw() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw paddle
    ctx.fillStyle = 'white';
    ctx.fillRect(0, paddleY, paddleWidth, paddleHeight);

    // Draw ball
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fill();

    // PROMPT: Update score display
    scoreDisplay.textContent = `Player: ${playerScore} | Computer: ${computerScore}`;

    if (ballX - ballRadius <= paddleWidth && 
        ballY >= paddleY && ballY <= paddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
        // PROMPT: Increment player score when hitting the ball
        playerScore++;
    }

    if (ballY - ballRadius <= 0 || ballY + ballRadius >= canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    if (ballX + ballRadius >= canvas.width) {
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        // PROMPT: Increment computer score when missing the ball
        computerScore++;
    }

    ballX += ballSpeedX;
    ballY += ballSpeedY;
}

function gameLoop() {
    draw();
    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' && paddleY > 0) {
        paddleY -= 20;
    } else if (e.key === 'ArrowDown' && paddleY < canvas.height - paddleHeight) {
        paddleY += 20;
    }
});

gameLoop();