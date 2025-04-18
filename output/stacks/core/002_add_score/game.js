// Get canvas and context
const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// Score tracking
let score = 0;
const scoreElement = document.getElementById('score');

// Game objects
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    dx: 4,
    dy: -4,
    color: 'white'
};

const paddle = {
    width: 100,
    height: 10,
    x: canvas.width / 2 - 50, // Center the paddle
    y: canvas.height - 20, // Position from bottom
    speed: 8,
    color: 'white'
};

// Keyboard controls
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

// Update score display
function updateScoreDisplay() {
    scoreElement.textContent = `Score: ${score}`;
}

// Draw functions
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.fillStyle = paddle.color;
    ctx.fill();
    ctx.closePath();
}

// Reset ball to center
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    // Randomize direction slightly
    ball.dx = (Math.random() > 0.5 ? 1 : -1) * 4;
    ball.dy = -4;
}

// Update game state
function update() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw objects
    drawBall();
    drawPaddle();
    
    // Move paddle
    if (rightPressed && paddle.x < canvas.width - paddle.width) {
        paddle.x += paddle.speed;
    } else if (leftPressed && paddle.x > 0) {
        paddle.x -= paddle.speed;
    }
    
    // Ball collision with walls
    if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
        ball.dx = -ball.dx;
    }
    
    // Ball collision with top
    if (ball.y + ball.dy < ball.radius) {
        ball.dy = -ball.dy;
    }
    
    // Ball collision with paddle
    if (
        ball.y + ball.dy > paddle.y - ball.radius &&
        ball.y + ball.dy < paddle.y + paddle.height &&
        ball.x > paddle.x &&
        ball.x < paddle.x + paddle.width
    ) {
        ball.dy = -ball.dy;
        // Increment score
        score++;
        // Update score display
        updateScoreDisplay();
    }
    
    // Ball hits bottom (missed paddle)
    if (ball.y + ball.dy > canvas.height - ball.radius) {
        // Reset ball to center without resetting the score
        resetBall();
    }
    
    // Update ball position
    ball.x += ball.dx;
    ball.y += ball.dy;
    
    // Update score display each frame
    updateScoreDisplay();
    
    // Continue animation
    requestAnimationFrame(update);
}

// Start the game
updateScoreDisplay();
update();