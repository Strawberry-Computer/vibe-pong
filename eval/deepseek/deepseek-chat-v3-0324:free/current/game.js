const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('scoreDisplay');

let playerScore = 0;
let computerScore = 0;

const paddleWidth = 10;
const paddleHeight = 100;
const paddleOffset = 10;

// PROMPT: Add 2 paddles - one for user and one for computer
let playerPaddleY = canvas.height / 2 - paddleHeight / 2;
let computerPaddleY = canvas.height / 2 - paddleHeight / 2;

const ballRadius = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;

const computerPaddleSpeed = 5;

function draw() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw player paddle
    ctx.fillStyle = 'white';
    ctx.fillRect(paddleOffset, playerPaddleY, paddleWidth, paddleHeight);

    // PROMPT: Draw computer paddle
    ctx.fillRect(
        canvas.width - paddleWidth - paddleOffset, 
        computerPaddleY, 
        paddleWidth, 
        paddleHeight
    );

    // Draw ball
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fill();

    scoreDisplay.textContent = `Player: ${playerScore} | Computer: ${computerScore}`;

    // Player paddle collision
    if (ballX - ballRadius <= paddleWidth + paddleOffset && 
        ballY >= playerPaddleY && ballY <= playerPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
        playerScore++;
    }

    // Computer paddle collision
    if (ballX + ballRadius >= canvas.width - paddleWidth - paddleOffset &&
        ballY >= computerPaddleY && ballY <= computerPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
        computerScore++;
    }

    if (ballY - ballRadius <= 0 || ballY + ballRadius >= canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    // PROMPT: Update scoring for both players
    if (ballX + ballRadius >= canvas.width) {
        resetBall();
        playerScore++;
    } else if (ballX - ballRadius <= 0) {
        resetBall();
        computerScore++;
    }

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // PROMPT: Move computer paddle automatically
    if (computerPaddleY + paddleHeight/2 < ballY && 
        computerPaddleY < canvas.height - paddleHeight) {
        computerPaddleY += computerPaddleSpeed;
    } else if (computerPaddleY + paddleHeight/2 > ballY && 
        computerPaddleY > 0) {
        computerPaddleY -= computerPaddleSpeed;
    }
}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
}

function gameLoop() {
    draw();
    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' && playerPaddleY > 0) {
        playerPaddleY -= 20;
    } else if (e.key === 'ArrowDown' && playerPaddleY < canvas.height - paddleHeight) {
        playerPaddleY += 20;
    }
});

gameLoop();