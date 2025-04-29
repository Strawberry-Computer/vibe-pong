// PROMPT: Draw a white paddle (100px wide, 10px high) at the bottom, movable left/right with arrow keys
const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

const paddle = {
    width: 100,
    height: 10,
    x: canvas.width / 2 - 50,
    y: canvas.height - 20
};

// PROMPT: Draw a white ball (10px radius) starting at canvas center, moving diagonally with constant speed
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    dx: 4,
    dy: -4
};

// PROMPT: movable left/right with arrow keys
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && paddle.x > 0) {
        paddle.x -= 20;
    }
    if (e.key === 'ArrowRight' && paddle.x < canvas.width - paddle.width) {
        paddle.x += 20;
    }
});

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = 4;
    ball.dy = -4;
}

function detectCollisions() {
    // PROMPT: Bounce the ball off the top and side walls
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.dx = -ball.dx;
    }
    if (ball.y - ball.radius < 0) {
        ball.dy = -ball.dy;
    }

    // PROMPT: reset to center if it hits the bottom (misses paddle)
    if (ball.y + ball.radius > canvas.height) {
        resetBall();
    }

    // PROMPT: Detect paddle collision to bounce the ball back up
    if (ball.y + ball.radius > paddle.y && 
        ball.x > paddle.x && 
        ball.x < paddle.x + paddle.width) {
        ball.dy = -ball.dy;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = 'white';
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();

    ball.x += ball.dx;
    ball.y += ball.dy;

    detectCollisions();

    // PROMPT: Use requestAnimationFrame for smooth animation
    requestAnimationFrame(draw);
}

draw();