// PROMPT: Generate a simple Pong game using HTML, CSS, and JavaScript

// PROMPT: Use <canvas width="800" height="400" id="pongCanvas">
const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// PROMPT: Enhance the Pong game by adding score display
const scoreBoard = document.getElementById('scoreBoard');
let score = 0;

// PROMPT: Draw a white paddle (10px wide, 100px high) at the left side of the canvas, movable up/down with arrow keys.
const paddle = {
    x: 0,
    y: canvas.height / 2 - 50,
    width: 10,
    height: 100,
    speed: 6,
    moveUp: false,
    moveDown: false
};

// PROMPT: Draw a white ball (10px radius) starting at canvas center, moving diagonally with constant speed.
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speedX: 4,
    speedY: -4
};

// PROMPT: Bounce the ball off the top and side walls; reset to center if it hits the bottom (misses paddle).
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speedX = 4 * (Math.random() > 0.5 ? 1 : -1);
    ball.speedY = -4;
}

// PROMPT: Draw paddle and ball
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Paddle
    ctx.fillStyle = 'white';
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);

    // Ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();

    // PROMPT: Enhance the Pong game by adding score display
    ctx.font = '32px monospace';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText(`Score: ${score}`, canvas.width / 2, 40);
}

// PROMPT: Draw a white paddle ... movable up/down with arrow keys.
function updatePaddle() {
    if (paddle.moveUp) {
        paddle.y -= paddle.speed;
    } else if (paddle.moveDown) {
        paddle.y += paddle.speed;
    }
    if (paddle.y < 0) paddle.y = 0;
    if (paddle.y + paddle.height > canvas.height) paddle.y = canvas.height - paddle.height;
}

// PROMPT: Bounce the ball off the top and side walls; reset to center if it hits the bottom (misses paddle).
// PROMPT: Detect paddle collision to bounce the ball back up.
// PROMPT: Enhance the Pong game by adding score display
function updateBall() {
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    // Top wall
    if (ball.y - ball.radius < 0) {
        ball.y = ball.radius;
        ball.speedY *= -1;
    }
    // Left wall (bounce)
    if (ball.x - ball.radius < 0) {
        ball.x = ball.radius;
        ball.speedX *= -1;
    }
    // Right wall (bounce)
    if (ball.x + ball.radius > canvas.width) {
        ball.x = canvas.width - ball.radius;
        ball.speedX *= -1;
    }
    // Bottom wall: check for paddle/miss
    if (ball.y + ball.radius > canvas.height) {
        // Check paddle collision
        if (
            ball.x > paddle.x &&
            ball.x < paddle.x + paddle.width &&
            ball.y + ball.radius >= paddle.y &&
            ball.y - ball.radius <= paddle.y + paddle.height
        ) {
            ball.y = canvas.height - ball.radius;
            ball.speedY *= -1;
            // PROMPT: Enhance the Pong game by adding score display
            score++;
            updateScoreDisplay();
        } else {
            // PROMPT: Enhance the Pong game by adding score display
            score = 0;
            updateScoreDisplay();
            resetBall();
        }
    }
}

// PROMPT: Enhance the Pong game by adding score display
function updateScoreDisplay() {
    if (scoreBoard) {
        scoreBoard.textContent = `Score: ${score}`;
    }
}

// PROMPT: Use requestAnimationFrame for smooth animation.
function gameLoop() {
    updatePaddle();
    updateBall();
    draw();
    requestAnimationFrame(gameLoop);
}

// PROMPT: Movable up/down with arrow keys.
window.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowUp') {
        paddle.moveUp = true;
    }
    if (e.key === 'ArrowDown') {
        paddle.moveDown = true;
    }
});

window.addEventListener('keyup', function(e) {
    if (e.key === 'ArrowUp') {
        paddle.moveUp = false;
    }
    if (e.key === 'ArrowDown') {
        paddle.moveDown = false;
    }
});

// PROMPT: Enhance the Pong game by adding score display
updateScoreDisplay();

gameLoop();