const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// PROMPT: Draw a white paddle (10px wide, 100px high) at the left side of the canvas for the player
const playerPaddle = {
    x: 10,
    y: canvas.height / 2 - 50,
    width: 10,
    height: 100,
    speed: 5
};

// PROMPT: Add a second paddle for the computer player on the right side of the canvas
const computerPaddle = {
    x: canvas.width - 20,
    y: canvas.height / 2 - 50,
    width: 10,
    height: 100,
    speed: 4
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

// PROMPT: movable up/down with arrow keys for player paddle
const keys = {
    ArrowUp: false,
    ArrowDown: false
};

document.addEventListener('keydown', (e) => {
    // PROMPT: movable up/down with arrow keys for player paddle
    if (e.key in keys) {
        keys[e.key] = true;
    }
});

document.addEventListener('keyup', (e) => {
    // PROMPT: movable up/down with arrow keys for player paddle
    if (e.key in keys) {
        keys[e.key] = false;
    }
});

function movePlayerPaddle() {
    // PROMPT: movable up/down with arrow keys for player paddle
    if (keys.ArrowUp && playerPaddle.y > 0) {
        playerPaddle.y -= playerPaddle.speed;
    }
    if (keys.ArrowDown && playerPaddle.y < canvas.height - playerPaddle.height) {
        playerPaddle.y += playerPaddle.speed;
    }
}

function moveComputerPaddle() {
    // PROMPT: Add AI player to move the computer paddle automatically
    if (computerPaddle.y + computerPaddle.height / 2 < ball.y && computerPaddle.y < canvas.height - computerPaddle.height) {
        computerPaddle.y += computerPaddle.speed;
    }
    if (computerPaddle.y + computerPaddle.height / 2 > ball.y && computerPaddle.y > 0) {
        computerPaddle.y -= computerPaddle.speed;
    }
}

function moveBall() {
    // PROMPT: moving diagonally with constant speed
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    // PROMPT: Bounce the ball off the top and bottom walls
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.speedY = -ball.speedY;
    }

    // PROMPT: Increment player score if ball misses computer paddle (hits right wall)
    if (ball.x + ball.radius > canvas.width) {
        playerScore++;
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.speedX = -ball.speedX;
    }

    // PROMPT: Increment computer score if ball misses player paddle (hits left wall)
    if (ball.x - ball.radius < 0) {
        computerScore++;
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.speedX = -ball.speedX;
    }

    // PROMPT: Detect player paddle collision to bounce the ball back
    if (ball.x - ball.radius < playerPaddle.x + playerPaddle.width &&
        ball.y > playerPaddle.y && 
        ball.y < playerPaddle.y + playerPaddle.height) {
        ball.speedX = -ball.speedX;
    }

    // PROMPT: Detect computer paddle collision to bounce the ball back
    if (ball.x + ball.radius > computerPaddle.x &&
        ball.y > computerPaddle.y && 
        ball.y < computerPaddle.y + computerPaddle.height) {
        ball.speedX = -ball.speedX;
    }
}

function draw() {
    // PROMPT: Use <canvas width="800" height="400" id="pongCanvas">
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // PROMPT: Draw a white paddle for the player (10px wide, 100px high)
    ctx.fillStyle = 'white';
    ctx.fillRect(playerPaddle.x, playerPaddle.y, playerPaddle.width, playerPaddle.height);

    // PROMPT: Draw a white paddle for the computer (10px wide, 100px high)
    ctx.fillStyle = 'white';
    ctx.fillRect(computerPaddle.x, computerPaddle.y, computerPaddle.width, computerPaddle.height);

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
    movePlayerPaddle();
    moveComputerPaddle();
    moveBall();
    draw();
    requestAnimationFrame(gameLoop);
}

// PROMPT: Use requestAnimationFrame for smooth animation
gameLoop();