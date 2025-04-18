// Get canvas and context
const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// Initialize score
let score = 0;
const scoreDisplay = document.getElementById('score');

// Game objects
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speedX: 4,
    speedY: 4
};

const playerPaddle = {
    width: 100,
    height: 10,
    x: canvas.width / 2 - 50,
    y: canvas.height - 20,
    speed: 8,
    isMovingLeft: false,
    isMovingRight: false
};

const aiPaddle = {
    width: 100,
    height: 10,
    x: canvas.width / 2 - 50,
    y: 20, // Position at the top
    speed: 4,  // AI paddle speed (slightly slower than player for balance)
    difficulty: 0.7 // Value between 0 and 1 that determines AI responsiveness
};

// Handle keyboard controls
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        playerPaddle.isMovingLeft = true;
    } else if (e.key === 'ArrowRight') {
        playerPaddle.isMovingRight = true;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft') {
        playerPaddle.isMovingLeft = false;
    } else if (e.key === 'ArrowRight') {
        playerPaddle.isMovingRight = false;
    }
});

// Function to reset the ball to the center with random x direction
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speedY = Math.random() > 0.5 ? Math.abs(ball.speedY) : -Math.abs(ball.speedY); // Random Y direction
    ball.speedX = Math.random() > 0.5 ? Math.abs(ball.speedX) : -Math.abs(ball.speedX); // Random X direction
}

// Draw functions
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();
}

function drawPlayerPaddle() {
    ctx.beginPath();
    ctx.rect(playerPaddle.x, playerPaddle.y, playerPaddle.width, playerPaddle.height);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();
}

function drawAIPaddle() {
    ctx.beginPath();
    ctx.rect(aiPaddle.x, aiPaddle.y, aiPaddle.width, aiPaddle.height);
    ctx.fillStyle = 'red'; // Different color for AI paddle
    ctx.fill();
    ctx.closePath();
}

// Update score display
function updateScoreDisplay() {
    scoreDisplay.textContent = `Score: ${score}`;
}

// Move the AI paddle
function moveAIPaddle() {
    // Calculate the target position (where the AI wants to move)
    const targetX = ball.x - (aiPaddle.width / 2);
    
    // Only move if there's a significant difference between current and target position
    if (Math.abs(targetX - aiPaddle.x) > 5) {
        // Add some imperfection to the AI based on difficulty
        if (Math.random() < aiPaddle.difficulty) {
            // Move towards the ball
            if (targetX < aiPaddle.x) {
                aiPaddle.x = Math.max(0, aiPaddle.x - aiPaddle.speed);
            } else {
                aiPaddle.x = Math.min(canvas.width - aiPaddle.width, aiPaddle.x + aiPaddle.speed);
            }
        }
    }
}

function update() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw objects
    drawBall();
    drawPlayerPaddle();
    drawAIPaddle();
    
    // Move player paddle
    if (playerPaddle.isMovingLeft) {
        playerPaddle.x = Math.max(0, playerPaddle.x - playerPaddle.speed);
    }
    
    if (playerPaddle.isMovingRight) {
        playerPaddle.x = Math.min(canvas.width - playerPaddle.width, playerPaddle.x + playerPaddle.speed);
    }
    
    // Move AI paddle
    moveAIPaddle();
    
    // Ball collision with walls
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.speedX = -ball.speedX;
    }
    
    // Ball collision with AI paddle (top)
    if (
        ball.y - ball.radius < aiPaddle.y + aiPaddle.height &&
        ball.y + ball.radius > aiPaddle.y &&
        ball.x > aiPaddle.x &&
        ball.x < aiPaddle.x + aiPaddle.width
    ) {
        if (ball.speedY < 0) { // Only if the ball is moving upward
            ball.speedY = -ball.speedY;
        }
    }
    
    // Ball collision with player paddle (bottom)
    if (
        ball.y + ball.radius > playerPaddle.y &&
        ball.y - ball.radius < playerPaddle.y + playerPaddle.height &&
        ball.x > playerPaddle.x &&
        ball.x < playerPaddle.x + playerPaddle.width
    ) {
        if (ball.speedY > 0) { // Only if the ball is moving downward
            ball.speedY = -ball.speedY;
            score++; // Increment score when ball hits player's paddle
            updateScoreDisplay(); // Update the score display
        }
    }
    
    // Ball reaches bottom - reset ball and deduct score if not zero
    if (ball.y + ball.radius > canvas.height) {
        resetBall();
        if (score > 0) {
            score--;
            updateScoreDisplay();
        }
    }
    
    // Ball reaches top - reset ball but keep score
    if (ball.y - ball.radius < 0) {
        resetBall();
    }
    
    // Move the ball
    ball.x += ball.speedX;
    ball.y += ball.speedY;
    
    // Continue animation
    requestAnimationFrame(update);
}

// Initialize score display
updateScoreDisplay();

// Start the game
update();