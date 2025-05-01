// PROMPT: Use <canvas width="800" height="400" id="pongCanvas"> */
const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// PROMPT: Draw a white paddle (10px wide, 100px high) at the left side of the canvas, movable up/down with arrow keys.
const paddle = {
    x: 10,
    y: canvas.height / 2 - 50,
    width: 10,
    height: 100,
    color: 'white',
    dy: 0
};

// PROMPT: Draw a white ball (10px radius) starting at canvas center, moving diagonally with constant speed.
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    color: 'white',
    dx: 5,
    dy: 5
};

// PROMPT: Detect paddle collision to bounce the ball back up.
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.fillStyle = paddle.color;
    ctx.fill();
    ctx.closePath();
}

// PROMPT: Draw a white ball (10px radius) starting at canvas center, moving diagonally with constant speed.
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
}

// PROMPT: Bounce the ball off the top and side walls; reset to center if it hits the bottom (misses paddle).
function updateBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy = -ball.dy;
    }

    if (ball.x + ball.radius > canvas.width) {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.dx = -ball.dx;
    }

    if (ball.x - ball.radius < paddle.x + paddle.width &&
        ball.y > paddle.y &&
        ball.y < paddle.y + paddle.height) {
        ball.dx = -ball.dx;
    }
}

// PROMPT: Use requestAnimationFrame for smooth animation.
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle();
    drawBall();
    updateBall();
    requestAnimationFrame(animate);
}

// PROMPT: Movable up/down with arrow keys.
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowUp') {
        paddle.dy = -7;
    } else if (event.key === 'ArrowDown') {
        paddle.dy = 7;
    }
});

document.addEventListener('keyup', function(event) {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        paddle.dy = 0;
    }
});

animate();

// PROMPT: Add score display
let playerScore = 0;

function drawScore() {
    ctx.font = '20px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText(`Score: ${playerScore}`, 10, 30);
}

function updateBallWithScore() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy = -ball.dy;
    }

    if (ball.x + ball.radius > canvas.width) {
        playerScore++;
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.dx = -ball.dx;
    }

    if (ball.x - ball.radius < paddle.x + paddle.width &&
        ball.y > paddle.y &&
        ball.y < paddle.y + paddle.height) {
        ball.dx = -ball.dx;
    }
}

function animateWithScore() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle();
    drawBall();
    updateBallWithScore();
    drawScore();
    requestAnimationFrame(animateWithScore);
}

animateWithScore();