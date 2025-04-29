// PROMPT: Draw a white paddle (100px wide, 10px high) at the bottom, movable left/right with arrow keys.
const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

const paddle = {
    width: 100,
    height: 10,
    x: canvas.width / 2 - 50,
    y: canvas.height - 20,
    speed: 8,
    dx: 0
};

// PROMPT: Draw a white ball (10px radius) starting at canvas center, moving diagonally with constant speed.
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speed: 5,
    dx: 4,
    dy: -4
};

// PROMPT: Initialize a score variable starting at 0.
let score = 0;

// PROMPT: Movable left/right with arrow keys
function keyDown(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        paddle.dx = paddle.speed;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        paddle.dx = -paddle.speed;
    }
}

function keyUp(e) {
    if (
        e.key === 'Right' ||
        e.key === 'ArrowRight' ||
        e.key === 'Left' ||
        e.key === 'ArrowLeft'
    ) {
        paddle.dx = 0;
    }
}

// PROMPT: Draw a white paddle
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();
}

// PROMPT: Draw a white ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();
}

// PROMPT: Detect paddle collision to bounce the ball back up
// PROMPT: Increment the score when the ball hits the paddle.
function ballPaddleCollision() {
    if (
        ball.y + ball.radius > paddle.y &&
        ball.y + ball.radius < paddle.y + paddle.height &&
        ball.x > paddle.x &&
        ball.x < paddle.x + paddle.width
    ) {
        ball.dy = -ball.dy;
        // Increment score when ball hits paddle
        score++;
        // Update the score display
        updateScoreDisplay();
    }
}

// PROMPT: Bounce the ball off the top and side walls; reset to center if it hits the bottom
// PROMPT: Reset the ball to the center (with random x-direction) when it misses the paddle (hits bottom), without resetting the score.
function ballWallCollision() {
    // Left and right walls
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.dx = -ball.dx;
    }
    
    // Top wall
    if (ball.y - ball.radius < 0) {
        ball.dy = -ball.dy;
    }
    
    // Bottom wall (miss)
    if (ball.y + ball.radius > canvas.height) {
        // Reset ball to center
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        // Reverse y direction
        ball.dy = -ball.speed;
        // Randomize x direction
        ball.dx = Math.random() > 0.5 ? ball.speed : -ball.speed;
    }
}

function movePaddle() {
    paddle.x += paddle.dx;
    
    // Wall detection for paddle
    if (paddle.x < 0) {
        paddle.x = 0;
    } else if (paddle.x + paddle.width > canvas.width) {
        paddle.x = canvas.width - paddle.width;
    }
}

function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// PROMPT: Update the score display in the DOM each frame.
function updateScoreDisplay() {
    document.getElementById('score').textContent = `Score: ${score}`;
}

// PROMPT: Use requestAnimationFrame for smooth animation
function update() {
    clearCanvas();
    
    drawPaddle();
    drawBall();
    
    movePaddle();
    moveBall();
    
    ballWallCollision();
    ballPaddleCollision();
    
    requestAnimationFrame(update);
}

// Event listeners
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

// PROMPT: Initialize a score variable starting at 0.
// Initialize score display
updateScoreDisplay();

// Start the game
update();