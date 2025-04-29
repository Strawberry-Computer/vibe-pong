// PROMPT: JS: Use Canvas API to: Draw a white paddle... 
const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// Paddle configuration
const paddle = {
    width: 100,
    height: 10,
    x: canvas.width / 2 - 50,
    y: canvas.height - 20,
    speed: 5
};

// Ball configuration
const ball = {
    radius: 10,
    x: canvas.width / 2,
    y: canvas.height / 2,
    speed: 3,
    dx: 3,
    dy: -3
};

// Movement tracking
let rightPressed = false;
let leftPressed = false;

// Event listeners for keyboard input
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') rightPressed = true;
    if (e.key === 'ArrowLeft') leftPressed = true;
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowRight') rightPressed = false;
    if (e.key === 'ArrowLeft') leftPressed = false;
});

// Collision detection between ball and paddle
function collisionDetection() {
    if (ball.y + ball.radius > paddle.y &&
        ball.x + ball.radius > paddle.x &&
        ball.x - ball.radius < paddle.x + paddle.width) {
        ball.dy = -ball.dy;
    }
}

// Game loop
function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw paddle
    ctx.fillStyle = 'white';
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);

    // Draw ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();

    // Move paddle
    if (rightPressed && paddle.x + paddle.width < canvas.width) {
        paddle.x += paddle.speed;
    }
    if (leftPressed && paddle.x > 0) {
        paddle.x -= paddle.speed;
    }

    // Move ball
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Wall collision (top, left, right)
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.dx = -ball.dx;
    }
    if (ball.y - ball.radius < 0) {
        ball.dy = -ball.dy;
    }

    // Paddle collision
    collisionDetection();

    // Reset ball if it misses
    if (ball.y + ball.radius > canvas.height) {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.dy = -ball.dy;
    }

    requestAnimationFrame(draw);
}

// Start game
draw();