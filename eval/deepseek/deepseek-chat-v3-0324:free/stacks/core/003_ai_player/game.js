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

// PROMPT: Make sure there are 2 paddles: one for the user and one for the computer
const userPaddle = {
    width: 100,
    height: 15,
    x: canvas.width / 2 - 50,
    y: canvas.height - 15
};

const computerPaddle = {
    width: 100,
    height: 15,
    x: canvas.width / 2 - 50,
    y: 0
};

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.closePath();
}

function drawPaddle(paddle) {
    ctx.fillStyle = '#fff';
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

// PROMPT: Enhance the Pong game by having the computer player move the paddle automatically
function moveComputerPaddle() {
    // Simple AI: computer paddle follows the ball's x position
    const computerPaddleCenter = computerPaddle.x + computerPaddle.width / 2;
    if (computerPaddleCenter < ball.x - 10) {
        computerPaddle.x += 5;
    } else if (computerPaddleCenter > ball.x + 10) {
        computerPaddle.x -= 5;
    }
    
    // Keep paddle within canvas bounds
    if (computerPaddle.x < 0) {
        computerPaddle.x = 0;
    } else if (computerPaddle.x + computerPaddle.width > canvas.width) {
        computerPaddle.x = canvas.width - computerPaddle.width;
    }
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawBall();
    drawPaddle(userPaddle);
    drawPaddle(computerPaddle);
    
    ball.x += ball.dx;
    ball.y += ball.dy;
    
    // Wall collision (left/right)
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.dx = -ball.dx;
    }
    
    // Paddle collision (user paddle)
    if (ball.y + ball.radius > userPaddle.y && 
        ball.x > userPaddle.x && ball.x < userPaddle.x + userPaddle.width) {
        ball.dy = -ball.dy;
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
    }
    
    // Paddle collision (computer paddle)
    if (ball.y - ball.radius < computerPaddle.y + computerPaddle.height && 
        ball.x > computerPaddle.x && ball.x < computerPaddle.x + computerPaddle.width) {
        ball.dy = -ball.dy;
    }
    
    // Bottom collision (miss)
    if (ball.y + ball.radius > canvas.height) {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.dx = 4 * (Math.random() > 0.5 ? 1 : -1);
        ball.dy = 4;
    }
    
    // Top collision (computer miss)
    if (ball.y - ball.radius < 0) {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.dx = 4 * (Math.random() > 0.5 ? 1 : -1);
        ball.dy = 4;
    }
    
    moveComputerPaddle();
    requestAnimationFrame(update);
}

canvas.addEventListener('mousemove', (e) => {
    const relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        userPaddle.x = relativeX - userPaddle.width / 2;
    }
});

update();