const canvas = document.getElementById('pongCanvas'); // PROMPT: JS: Use Canvas API to draw the game elements.
const ctx = canvas.getContext('2d');

let paddleWidth = 100; // PROMPT: JS: Draw a white paddle (100px wide, 10px high).
let paddleHeight = 10;
let paddleX = (canvas.width - paddleWidth) / 2;
let aiPaddleX = (canvas.width - paddleWidth) / 2; // PROMPT: JS: Add AI paddle variable.
let ballRadius = 10; // PROMPT: JS: Draw a white ball (10px radius).
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballDX = 2; // PROMPT: JS: Moving diagonally with constant speed.
let ballDY = -2;
let score = 0; // PROMPT: JS: Initialize a score variable starting at 0.

function drawPaddle(x) { // PROMPT: JS: Draw a white paddle.
    ctx.fillStyle = "white";
    ctx.fillRect(x, canvas.height - paddleHeight, paddleWidth, paddleHeight);
}

function drawBall() { // PROMPT: JS: Draw a white ball.
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

function updateScore() { // PROMPT: JS: Update the score display in the DOM each frame.
    document.getElementById('score').innerText = `Score: ${score}`;
}

function detectCollision() { // PROMPT: JS: Detect paddle collision to bounce the ball back up.
    if (ballY + ballDY + ballRadius > canvas.height - paddleHeight && ballX > paddleX && ballX < paddleX + paddleWidth) {
        ballDY = -ballDY;
        score++; // PROMPT: JS: Increment the score when the ball hits the paddle.
    } else if (ballY + ballDY + ballRadius > canvas.height) { // PROMPT: JS: Reset to center if it hits the bottom.
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        ballDX = 2; // Reset ball direction
        ballDY = -2;
    }
}

function moveAIPaddle() { // PROMPT: JS: Move AI paddle automatically.
    if (ballX < aiPaddleX) {
        aiPaddleX -= 4; // Move AI paddle left
    } else if (ballX > aiPaddleX + paddleWidth) {
        aiPaddleX += 4; // Move AI paddle right
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    drawBall(); // Draw ball
    drawPaddle(paddleX); // Draw user paddle
    drawPaddle(aiPaddleX); // Draw AI paddle
    detectCollision(); // Check for collisions
    updateScore(); // PROMPT: JS: Update the score display in the DOM each frame.

    // Bounce ball off top and side walls 
    if (ballX + ballDX + ballRadius > canvas.width || ballX + ballDX - ballRadius < 0) {
        ballDX = -ballDX;
    }
    if (ballY + ballDY - ballRadius < 0) {
        ballDY = -ballDY;
    }

    ballX += ballDX; // Update ball position
    ballY += ballDY; // Update ball position

    moveAIPaddle(); // Update AI paddle position

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