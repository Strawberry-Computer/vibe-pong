const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');

// Initialize score
let score = 0;

// Game objects
const playerPaddle = {
    width: 100,
    height: 10,
    x: 350,
    y: 380
};

const aiPaddle = {
    width: 100,
    height: 10,
    x: 350,
    y: 20,
    speed: 5
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
    ctx.fillStyle = 'red';
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

// AI movement
function moveAI() {
    const paddleCenter = aiPaddle.x + aiPaddle.width / 2;
    const ballCenter = ball.x;
    
    if (paddleCenter < ballCenter - 10) {
        aiPaddle.x += aiPaddle.speed;
    } else if (paddleCenter > ballCenter + 10) {
        aiPaddle.x -= aiPaddle.speed;
    }

    // Keep AI paddle within canvas bounds
    if (aiPaddle.x < 0) aiPaddle.x = 0;
    if (aiPaddle.x + aiPaddle.width > canvas.width) {
        aiPaddle.x = canvas.width - aiPaddle.width;
    }
}

// Collision detection
function detectCollisions() {
    // Ball hits side walls
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.speedX = -ball.speedX;
    }
    
    // Ball hits AI paddle
    if (ball.y - ball.radius < aiPaddle.y + aiPaddle.height && 
        ball.x > aiPaddle.x && 
        ball.x < aiPaddle.x + aiPaddle.width) {
        ball.speedY = -ball.speedY;
    }
    
    // Ball hits player paddle
    if (ball.y + ball.radius > playerPaddle.y && 
        ball.x > playerPaddle.x && 
        ball.x < playerPaddle.x + playerPaddle.width) {
        ball.speedY = -ball.speedY;
        score++; // Increment score when ball hits player paddle
        updateScore();
    }
    
    // Ball hits bottom or top (miss)
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
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
    
    // Move player paddle
    if (rightPressed && playerPaddle.x < canvas.width - playerPaddle.width) {
        playerPaddle.x += 7;
    } else if (leftPressed && playerPaddle.x > 0) {
        playerPaddle.x -= 7;
    }
    
    // Move AI paddle
    moveAI();
    
    // Move ball
    ball.x += ball.speedX;
    ball.y += ball.speedY;
    
    // Check collisions
    detectCollisions();
    
    // Draw everything
    drawPaddles();
    drawBall();
    
    // Continue animation
    requestAnimationFrame(update);
}

// Start the game
updateScore(); // Initialize score display
update();