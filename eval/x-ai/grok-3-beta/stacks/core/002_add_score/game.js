const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// PROMPT: Draw a white paddle (10px wide, 100px high) at the left side of the canvas
const paddle = {
    x: 10,
    y: canvas.height / 2 - 50,
    width: 10,
    height: 100,
    speed: 5
};

// PROMPT: Draw a white ball (10px radius) starting at canvas center
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speedX: 5,
    speedY: 5
};

// PROMPT: Add scoring to Pong game
let playerScore = 0;
let computerScore = 0;

// PROMPT: movable up/down with arrow keys
const keys = {
    ArrowUp: false,
    ArrowDown: false
};

document.addEventListener('keydown', (e) => {
    // PROMPT: movable up/down with arrow keys
    if (e.key in keys) {
        keys[e.key] = true;
    }
});

document.addEventListener('keyup', (e) => {
    // PROMPT: movable up/down with arrow keys
    if (e.key in keys) {
        keys[e.key] = false;
    }
});

function movePaddle() {
    // PROMPT: movable up/down with arrow keys
    if (keys.ArrowUp && paddle.y > 0) {
        paddle.y -= paddle.speed;
    }
    if (keys.ArrowDown && paddle.y < canvas.height - paddle.height) {
        paddle.y += paddle.speed;
    }
}

function moveBall() {
    // PROMPT: moving diagonally with constant speed
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    // PROMPT: Bounce the ball off the top and side walls
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.speedY = -ball.speedY;
    }
    if (ball.x + ball.radius > canvas.width) {
        // PROMPT: Add scoring to Pong game - increment player score when ball hits right wall
        playerScore++;
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.speedX = -ball.speedX;
    }

    // PROMPT: reset to center if it hits the bottom (misses paddle)
    if (ball.x - ball.radius < 0) {
        // PROMPT: Add scoring to Pong game - increment computer score when ball misses paddle
        computerScore++;
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
    }

    // PROMPT: Detect paddle collision to bounce the ball back up
    if (ball.x - ball.radius < paddle.x + paddle.width &&
        ball.y > paddle.y && 
        ball.y < paddle.y + paddle.height) {
        ball.speedX = -ball.speedX;
    }
}

function draw() {
    // PROMPT: Use <canvas width="800" height="400" id="pongCanvas">
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // PROMPT: Draw a white paddle (10px wide, 100px high)
    ctx.fillStyle = 'white';
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);

    // PROMPT: Draw a white ball (10px radius)
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();

    // PROMPT: Add scoring to Pong game - display scores on canvas
    ctx.font = '32px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText(`Player: ${playerScore}`, 50, 50);
    ctx.fillText(`Computer: ${computerScore}`, canvas.width - 200, 50);
}

function gameLoop() {
    // PROMPT: Use requestAnimationFrame for smooth animation
    movePaddle();
    moveBall();
    draw();
    requestAnimationFrame(gameLoop);
}

// PROMPT: Use requestAnimationFrame for smooth animation
gameLoop();