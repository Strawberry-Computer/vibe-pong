const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

const paddle = {
    width: 100,
    height: 10,
    x: canvas.width / 2 - 50,
    y: canvas.height - 20
};

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    dx: 4,
    dy: -4
};

// PROMPT: Initialize a score variable starting at 0
let score = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && paddle.x > 0) {
        paddle.x -= 20;
    }
    if (e.key === 'ArrowRight' && paddle.x < canvas.width - paddle.width) {
        paddle.x += 20;
    }
});

// PROMPT: Reset the ball to the center (with random x-direction) when it misses the paddle
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = 4 * (Math.random() > 0.5 ? 1 : -1);
    ball.dy = -4;
}

// PROMPT: Update the score display in the DOM each frame
function updateScore() {
    document.getElementById('score').textContent = `Score: ${score}`;
}

function detectCollisions() {
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.dx = -ball.dx;
    }
    if (ball.y - ball.radius < 0) {
        ball.dy = -ball.dy;
    }

    if (ball.y + ball.radius > canvas.height) {
        resetBall();
    }

    // PROMPT: Increment the score when the ball hits the paddle
    if (ball.y + ball.radius > paddle.y && 
        ball.x > paddle.x && 
        ball.x < paddle.x + paddle.width) {
        ball.dy = -ball.dy;
        score += 1;
        updateScore();
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

    requestAnimationFrame(draw);
}

draw();