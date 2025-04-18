const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');

// Initialize score
let score = 0;

// Game objects
const paddle = {
    width: 100,
    height: 10,
    x: 350,
    y: 380
};

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speedX: 4,
    speedY: -4
};

// Input handling
let rightPressed = false;
let leftPressed = false;

document.addEventListener('keydown', (e) => {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = true;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = false;
    }
});

// Drawing functions
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
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

// Update score display
function updateScore() {
    scoreDisplay.textContent = `Score: ${score}`;
}

// Collision detection
function detectCollisions() {
    // Ball hits side walls
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.speedX = -ball.speedX;
    }
    
    // Ball hits top
    if (ball.y - ball.radius < 0) {
        ball.speedY = -ball.speedY;
    }
    
    // Ball hits paddle
    if (ball.y + ball.radius > paddle.y && 
        ball.x > paddle.x && 
        ball.x < paddle.x + paddle.width) {
        ball.speedY = -ball.speedY;
        score++; // Increment score when ball hits paddle
        updateScore();
    }
    
    // Ball hits bottom (miss)
    if (ball.y + ball.radius > canvas.height) {
        resetBall();
    }
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    // Random x direction
    ball.speedX = 4 * (Math.random() < 0.5 ? -1 : 1);
    ball.speedY = -4;
}

// Game loop
function update() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Move paddle
    if (rightPressed && paddle.x < canvas.width - paddle.width) {
        paddle.x += 7;
    } else if (leftPressed && paddle.x > 0) {
        paddle.x -= 7;
    }
    
    // Move ball
    ball.x += ball.speedX;
    ball.y += ball.speedY;
    
    // Check collisions
    detectCollisions();
    
    // Draw everything
    drawPaddle();
    drawBall();
    
    // Continue animation
    requestAnimationFrame(update);
}

// Start the game
updateScore(); // Initialize score display
update();