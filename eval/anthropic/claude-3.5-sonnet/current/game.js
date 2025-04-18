const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');

// Score tracking
let score = 0;

// Game objects
const playerPaddle = {
    width: 100,
    height: 10,
    x: 350,
    y: canvas.height - 20,
    speed: 8,
    dx: 0
};

const aiPaddle = {
    width: 100,
    height: 10,
    x: 350,
    y: 20, // Position at top of screen
    speed: 5 // Slightly slower than player for fairness
};

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speed: 4,
    dx: 4,
    dy: -4
};

// Controls
let rightPressed = false;
let leftPressed = false;

// Event listeners
document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

function keyDownHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = false;
    }
}

// Drawing functions
function drawPaddles() {
    // Draw player paddle
    ctx.beginPath();
    ctx.rect(playerPaddle.x, playerPaddle.y, playerPaddle.width, playerPaddle.height);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();

    // Draw AI paddle
    ctx.beginPath();
    ctx.rect(aiPaddle.x, aiPaddle.y, aiPaddle.width, aiPaddle.height);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();
}

// Game logic
function movePlayerPaddle() {
    if (rightPressed && playerPaddle.x < canvas.width - playerPaddle.width) {
        playerPaddle.x += playerPaddle.speed;
    } else if (leftPressed && playerPaddle.x > 0) {
        playerPaddle.x -= playerPaddle.speed;
    }
}

function moveAIPaddle() {
    // Simple AI: Follow the ball with slight delay
    const paddleCenter = aiPaddle.x + aiPaddle.width / 2;
    const ballCenter = ball.x;
    
    if (paddleCenter < ballCenter - 10 && aiPaddle.x < canvas.width - aiPaddle.width) {
        aiPaddle.x += aiPaddle.speed;
    } else if (paddleCenter > ballCenter + 10 && aiPaddle.x > 0) {
        aiPaddle.x -= aiPaddle.speed;
    }
}

function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Wall collision detection
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.dx = -ball.dx;
    }

    // AI Paddle collision
    if (ball.y - ball.radius < aiPaddle.y + aiPaddle.height &&
        ball.x > aiPaddle.x &&
        ball.x < aiPaddle.x + aiPaddle.width) {
        ball.dy = -ball.dy;
    }

    // Player Paddle collision
    if (ball.y + ball.radius > playerPaddle.y &&
        ball.x > playerPaddle.x &&
        ball.x < playerPaddle.x + playerPaddle.width) {
        ball.dy = -ball.dy;
        score += 1;
        updateScore();
    }

    // Ball reset if it goes below player paddle
    if (ball.y + ball.radius > canvas.height) {
        resetBall();
        score = Math.max(0, score - 2); // Penalty for missing
        updateScore();
    }

    // Ball reset if it goes above AI paddle
    if (ball.y - ball.radius < 0) {
        resetBall();
    }
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    // Randomize horizontal direction
    ball.dx = (Math.random() < 0.5 ? 1 : -1) * ball.speed;
    ball.dy = (Math.random() < 0.5 ? 1 : -1) * ball.speed;
}

function updateScore() {
    scoreDisplay.textContent = `Score: ${score}`;
}

// Game loop
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawPaddles();
    drawBall();
    
    movePlayerPaddle();
    moveAIPaddle();
    moveBall();
    
    requestAnimationFrame(update);
}

// Start the game
update();