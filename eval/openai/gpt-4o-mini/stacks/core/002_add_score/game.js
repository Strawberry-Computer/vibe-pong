const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');

const paddleWidth = 100;
const paddleHeight = 10;
const ballRadius = 10;

let paddleX = (canvas.width - paddleWidth) / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 4;
let ballSpeedY = -4;
const paddleSpeed = 20;

let score = 0;

function drawPaddle() {
    ctx.fillStyle = 'white';
    ctx.fillRect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
}

function drawBall() {
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
}

function updateScore() {
    scoreDisplay.textContent = `Score: ${score}`;
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawPaddle();
    drawBall();
    
    // Ball movement
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    
    // Bounce off walls
    if (ballY + ballRadius > canvas.height) {
        // Reset ball to the center without resetting score
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        ballSpeedX = 4 * (Math.random() < 0.5 ? 1 : -1);
        ballSpeedY = -4;
    }
    
    if (ballY - ballRadius < 0) {
        ballSpeedY = -ballSpeedY;
    }
    
    if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0) {
        ballSpeedX = -ballSpeedX;
    }
    
    // Paddle collision
    if (ballY + ballRadius >= canvas.height - paddleHeight && ballX >= paddleX && ballX <= paddleX + paddleWidth) {
        ballSpeedY = -ballSpeedY;
        score++;
        updateScore();
    }
    
    requestAnimationFrame(update);
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && paddleX > 0) {
        paddleX -= paddleSpeed;
    } else if (event.key === 'ArrowRight' && paddleX < canvas.width - paddleWidth) {
        paddleX += paddleSpeed;
    }
});

update();