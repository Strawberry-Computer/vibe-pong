const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// PROMPT: Draw a white paddle (10px wide, 100px high) at the left side of the canvas
const paddle = {
    x: 0,
    y: canvas.height / 2 - 50,
    width: 10,
    height: 100,
    speed: 7,
    dy: 0
};

// PROMPT: Draw a white ball (10px radius) starting at canvas center
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    dx: 5,
    dy: 5
};

// Track key states for movement
const keys = {
    ArrowUp: false,
    ArrowDown: false
};

document.addEventListener('keydown', (e) => {
    // PROMPT: movable up/down with arrow keys
    if (e.code in keys) keys[e.code] = true;
});

document.addEventListener('keyup', (e) => {
    if (e.code in keys) keys[e.code] = false;
});

function resetBall() {
    // PROMPT: reset to center if it hits the bottom
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = 5 * (Math.random() > 0.5 ? 1 : -1); // Random horizontal direction
    ball.dy = 5; // Always start by moving down
}

function update() {
    // Move paddle
    if (keys.ArrowUp && paddle.y > 0) {
        paddle.y -= paddle.speed;
    }
    if (keys.ArrowDown && paddle.y < canvas.height - paddle.height) {
        paddle.y += paddle.speed;
    }

    // Move ball
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Bounce off top wall
    if (ball.y - ball.radius <= 0) {
        ball.dy = -ball.dy;
    }

    // PROMPT: reset to center if it hits the bottom
    if (ball.y + ball.radius >= canvas.height) {
        resetBall();
    }

    // Bounce off right wall
    if (ball.x + ball.radius >= canvas.width) {
        ball.dx = -ball.dx;
    }

    // Bounce off paddle
    // PROMPT: Detect paddle collision to bounce the ball back up
    if (
        ball.x - ball.radius <= paddle.x + paddle.width &&
        ball.y >= paddle.y &&
        ball.y <= paddle.y + paddle.height
    ) {
        ball.dx = -ball.dx;
    }
}

function draw() {
    // Clear canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw paddle
    ctx.fillStyle = '#fff';
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);

    // Draw ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();