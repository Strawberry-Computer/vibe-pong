const canvas = document.getElementById('pongCanvas'); // PROMPT: JS: Use Canvas API to draw the game elements.
const ctx = canvas.getContext('2d');

let paddleWidth = 100; // PROMPT: JS: Draw a white paddle (100px wide, 10px high).
let paddleHeight = 10;
let paddleX = (canvas.width - paddleWidth) / 2;
let ballRadius = 10; // PROMPT: JS: Draw a white ball (10px radius).
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballDX = 2; // PROMPT: JS: Moving diagonally with constant speed.
let ballDY = -2;

function drawPaddle() { // PROMPT: JS: Draw a white paddle.
    ctx.fillStyle = "white";
    ctx.fillRect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
}

function drawBall() { // PROMPT: JS: Draw a white ball.
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

function detectCollision() { // PROMPT: JS: Detect paddle collision to bounce the ball back up.
    if (ballY + ballDY + ballRadius > canvas.height - paddleHeight && ballX > paddleX && ballX < paddleX + paddleWidth) {
        ballDY = -ballDY;
    } else if (ballY + ballDY + ballRadius > canvas.height) { // PROMPT: JS: Reset to center if it hits the bottom.
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        ballDX = 2; // Reset ball direction
        ballDY = -2;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    drawBall(); // Draw ball
    drawPaddle(); // Draw paddle
    detectCollision(); // Check for collisions
    
    // Bounce ball off top and side walls 
    if (ballX + ballDX + ballRadius > canvas.width || ballX + ballDX - ballRadius < 0) {
        ballDX = -ballDX;
    }
    if (ballY + ballDY - ballRadius < 0) {
        ballDY = -ballDY;
    }

    ballX += ballDX; // Update ball position
    ballY += ballDY; // Update ball position

    requestAnimationFrame(draw); // PROMPT: JS: Use requestAnimationFrame for smooth animation.
}

function movePaddle(event) {
    if (event.key === "ArrowLeft" && paddleX > 0) { // PROMPT: JS: Movable left/right with arrow keys.
        paddleX -= 20;
    } else if (event.key === "ArrowRight" && paddleX < canvas.width - paddleWidth) {
        paddleX += 20;
    }
}

document.addEventListener("keydown", movePaddle); // Listen for key events
draw(); // Start the game loop