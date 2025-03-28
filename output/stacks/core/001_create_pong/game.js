// Get the canvas and its context
const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// Game elements
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speedX: 4,
    speedY: 4,
    color: 'white'
};

const paddle = {
    width: 100,
    height: 10,
    x: canvas.width / 2 - 50, // Center the paddle
    y: canvas.height - 20,    // Position near bottom
    speed: 8,
    color: 'white'
};

// Keyboard controls
const keys = {
    right: false,
    left: false
};

// Event Listeners for keyboard
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight') {
        keys.right = true;
    } else if (event.key === 'ArrowLeft') {
        keys.left = true;
    }
});

document.addEventListener('keyup', function(event) {
    if (event.key === 'ArrowRight') {
        keys.right = false;
    } else if (event.key === 'ArrowLeft') {
        keys.left = false;
    }
});

// Game functions
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

function movePaddle() {
    if (keys.right && paddle.x + paddle.width < canvas.width) {
        paddle.x += paddle.speed;
    } else if (keys.left && paddle.x > 0) {
        paddle.x -= paddle.speed;
    }
}

function moveBall() {
    // Ball movement
    ball.x += ball.speedX;
    ball.y += ball.speedY;
    
    // Ball collision with side walls
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.speedX = -ball.speedX;
    }
    
    // Ball collision with top
    if (ball.y - ball.radius < 0) {
        ball.speedY = -ball.speedY;
    }
    
    // Ball collision with paddle
    if (
        ball.y + ball.radius > paddle.y &&
        ball.x > paddle.x &&
        ball.x < paddle.x + paddle.width
    ) {
        ball.speedY = -ball.speedY;
    }
    
    // Ball hits bottom - reset
    if (ball.y + ball.radius > canvas.height) {
        resetBall();
    }
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speedY = -4; // Ensure the ball goes upward after reset
}

function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw game elements
    drawBall();
    drawPaddle();
    
    // Move game elements
    movePaddle();
    moveBall();
    
    // Continue animation
    requestAnimationFrame(draw);
}

// Start the game
draw();