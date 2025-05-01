// PROMPT: canvas setup and game elements
const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// PROMPT: white paddle (10px wide, 100px high) at left side
const paddleWidth = 10;
const paddleHeight = 100;
let paddleY = canvas.height / 2 - paddleHeight / 2;

// PROMPT: white ball (10px radius) starting at center
const ballRadius = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;

// PROMPT: Draw elements
function draw() {
    // Clear canvas
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw paddle
    ctx.fillStyle = 'white';
    ctx.fillRect(0, paddleY, paddleWidth, paddleHeight);

    // Draw ball
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fill();

    // PROMPT: Detect paddle collision
    if (ballX - ballRadius <= paddleWidth && 
        ballY >= paddleY && ballY <= paddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    // PROMPT: Bounce off walls
    if (ballY - ballRadius <= 0 || ballY + ballRadius >= canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    // Reset if missed paddle
    if (ballX + ballRadius >= canvas.width) {
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
    }

    // Move ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;
}

// PROMPT: Use requestAnimationFrame for smooth animation
function gameLoop() {
    draw();
    requestAnimationFrame(gameLoop);
}

// PROMPT: movable up/down with arrow keys
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' && paddleY > 0) {
        paddleY -= 20;
    } else if (e.key === 'ArrowDown' && paddleY < canvas.height - paddleHeight) {
        paddleY += 20;
    }
});

// Start game
gameLoop();