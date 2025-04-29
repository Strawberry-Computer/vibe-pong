const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');

// PROMPT: Initialize a score variable starting at 0
let score = 0;

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    dx: 4 * (Math.random() > 0.5 ? 1 : -1),
    dy: 4
};

const paddle = {
    width: 100,
    height: 15,
    x: canvas.width / 2 - 50
};

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.fillStyle = '#fff';
    ctx.fillRect(paddle.x, canvas.height - paddle.height, paddle.width, paddle.height);
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawBall();
    drawPaddle();
    
    ball.x += ball.dx;
    ball.y += ball.dy;
    
    // Wall collision (left/right)
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.dx = -ball.dx;
    }
    
    // Wall collision (top)
    if (ball.y - ball.radius < 0) {
        ball.dy = -ball.dy;
    }
    
    // Paddle collision
    if (ball.y + ball.radius > canvas.height - paddle.height && 
        ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
        ball.dy = -ball.dy;
        // PROMPT: Increment the score when the ball hits the paddle
        score++;
        // PROMPT: Update the score display in the DOM each frame
        scoreDisplay.textContent = `Score: ${score}`;
    }
    
    // Bottom collision (miss)
    if (ball.y + ball.radius > canvas.height) {
        // PROMPT: Reset the ball to the center (with random x-direction) when it misses the paddle
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.dx = 4 * (Math.random() > 0.5 ? 1 : -1);
        ball.dy = 4;
    }
    
    requestAnimationFrame(update);
}

canvas.addEventListener('mousemove', (e) => {
    const relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddle.x = relativeX - paddle.width / 2;
    }
});

update();