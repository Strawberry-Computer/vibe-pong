const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

let score = 0;

const paddle = {
    x: 0,
    y: canvas.height / 2 - 50,
    width: 10,
    height: 100,
    speed: 7,
    dy: 0
};

// PROMPT: Add the computer player which moves the paddle automatically
const computerPaddle = {
    x: canvas.width - 10,
    y: canvas.height / 2 - 50,
    width: 10,
    height: 100,
    speed: 7
};

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
    if (e.code in keys) keys[e.code] = true;
});

document.addEventListener('keyup', (e) => {
    if (e.code in keys) keys[e.code] = false;
});

function resetBall() {
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

    // reset to center if it hits the bottom
    if (ball.y + ball.radius >= canvas.height) {
        resetBall();
    }

    // Detect paddle collision to bounce the ball back up
    // Increment score when paddle hits the ball
    if (
        ball.x - ball.radius <= paddle.x + paddle.width &&
        ball.y <= paddle.y + paddle.height &&
        ball.y >= paddle.y
    ) {
        ball.dx = -ball.dx;
        score += 1;
    }

    // PROMPT: Add the computer player which moves the paddle automatically
    // Move computer paddle toward ball
    const computerCenter = computerPaddle.y + computerPaddle.height / 2;
    if (computerCenter < ball.y) {
        computerPaddle.y += computerPaddle.speed;
        // Check if moving beyond bottom
        if (computerPaddle.y + computerPaddle.height > canvas.height) {
            computerPaddle.y = canvas.height - computerPaddle.height;
        }
    } else if (computerCenter > ball.y) {
        computerPaddle.y -= computerPaddle.speed;
        // Check if moving beyond top
        if (computerPaddle.y < 0) {
            computerPaddle.y = 0;
        }
    }

    // Detect computer paddle collision to bounce the ball back
    if (
        ball.x + ball.radius >= computerPaddle.x &&
        ball.y <= computerPaddle.y + computerPaddle.height &&
        ball.y >= computerPaddle.y
    ) {
        ball.dx = -ball.dx;
    }
}

function draw() {
    // Clear canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw paddles
    ctx.fillStyle = '#fff';
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.fillRect(computerPaddle.x, computerPaddle.y, computerPaddle.width, computerPaddle.height);

    // Draw ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();

    // Draw the score on the canvas
    ctx.fillStyle = '#fff';
    ctx.font = '24px Arial';
    ctx.fillText(`Score: ${score}`, 20, 30);
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();