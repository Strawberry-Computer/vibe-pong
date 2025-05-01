// PROMPT: Draw a white paddle (10px wide, 100px high) at the left side of the canvas, movable up/down with arrow keys
const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

const paddle = {
    x: 20,
    y: canvas.height / 2 - 50,
    width: 10,
    height: 100,
    speed: 5
};

// PROMPT: Draw a white ball (10px radius) starting at canvas center, moving diagonally with constant speed
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    dx: 4,
    dy: -4
};

// PROMPT: movable up/down with arrow keys
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowUp' && paddle.y > 0) {
        paddle.y -= paddle.speed;
    }
    if (e.key === 'ArrowDown' && paddle.y < canvas.height - paddle.height) {
        paddle.y += paddle.speed;
    }
});

function update() {
    // PROMPT: Bounce the ball off the top and side walls
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy *= -1;
    }
    if (ball.x + ball.radius > canvas.width) {
        ball.dx *= -1;
    }

    // PROMPT: Detect paddle collision to bounce the ball back up
    if (ball.x - ball.radius < paddle.x + paddle.width &&
        ball.y > paddle.y &&
        ball.y < paddle.y + paddle.height) {
        ball.dx *= -1;
    }

    // PROMPT: reset to center if it hits the bottom (misses paddle)
    if (ball.x - ball.radius < 0) {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
    }

    ball.x += ball.dx;
    ball.y += ball.dy;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = 'white';
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
}

// PROMPT: Use requestAnimationFrame for smooth animation
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();