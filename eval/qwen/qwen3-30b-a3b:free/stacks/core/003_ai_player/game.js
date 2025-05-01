// PROMPT: Use <canvas width="800" height="400" id="pongCanvas">
const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// PROMPT: Add score display
let playerScore = 0;
let computerScore = 0;

// PROMPT: Draw a white paddle (10px wide, 100px high) at the left side of the canvas, movable up/down with arrow keys
const paddle = {
    x: 10,
    y: canvas.height / 2 - 50,
    width: 10,
    height: 100,
    color: 'white'
};

// PROMPT: Draw a white paddle... movable up/down with arrow keys
const computerPaddle = {
    x: canvas.width - 20,
    y: canvas.height / 2 - 50,
    width: 10,
    height: 100,
    color: 'white'
};

// PROMPT: Draw a white ball (10px radius) starting at canvas center, moving diagonally with constant speed
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speed: 3,
    dx: 3,
    dy: -3,
    color: 'white'
};

// PROMPT: Use requestAnimationFrame for smooth animation
let gameLoop;

// PROMPT: Detect paddle collision to bounce the ball back up
function detectCollision(rect1, rect2) {
    return !(
        rect1.x + rect1.width < rect2.x ||
        rect2.x + rect2.width < rect1.x ||
        rect1.y + rect1.height < rect2.y ||
        rect2.y + rect2.height < rect1.y
    );
}

// PROMPT: Bounce the ball off the top and side walls; reset to center if it hits the bottom (misses paddle)
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = -ball.dx;
    ball.dy = -ball.dy;
}

// PROMPT: Draw a white paddle... movable up/down with arrow keys
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
        paddle.y -= 20;
    } else if (e.key === 'ArrowDown') {
        paddle.y += 20;
    }
    // Limit paddle movement to canvas
    paddle.y = Math.max(0, Math.min(canvas.height - paddle.height, paddle.y));
});

function update() {
    // Move ball
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Move computer paddle
    computerPaddle.y += (ball.y - computerPaddle.y - computerPaddle.height / 2) * 0.1;
    computerPaddle.y = Math.max(0, Math.min(canvas.height - computerPaddle.height, computerPaddle.y));

    // Bounce off top and bottom walls
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.dy = -ball.dy;
    }

    // Check collisions with paddles
    if (detectCollision(paddle, ball)) {
        ball.dx = Math.abs(ball.dx);
    } else if (detectCollision(computerPaddle, ball)) {
        ball.dx = -Math.abs(ball.dx);
    }

    // Update scores when ball goes past paddles
    if (ball.x - ball.radius < 0) {
        computerScore++;
        resetBall();
    } else if (ball.x + ball.radius > canvas.width) {
        playerScore++;
        resetBall();
    }

    // Draw everything
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // PROMPT: Draw score display
    ctx.fillStyle = 'white';
    ctx.font = '24px Arial';
    ctx.fillText(playerScore, canvas.width - 50, 30);
    ctx.fillText(computerScore, 50, 30);
    
    // Draw paddles
    ctx.fillStyle = paddle.color;
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    
    ctx.fillStyle = computerPaddle.color;
    ctx.fillRect(computerPaddle.x, computerPaddle.y, computerPaddle.width, computerPaddle.height);
    
    // Draw ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();

    gameLoop = requestAnimationFrame(update);
}

update();