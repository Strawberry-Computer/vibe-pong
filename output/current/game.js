// Get canvas and context
const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// Score tracking
let score = 0;
const scoreElement = document.getElementById('score');

// Game objects
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    dx: 4,
    dy: 4,
    color: 'white'
};

const userPaddle = {
    width: 100,
    height: 10,
    x: canvas.width / 2 - 50, // Center the paddle
    y: canvas.height - 20, // Position from bottom
    speed: 8,
    color: 'white'
};

const computerPaddle = {
    width: 100,
    height: 10,
    x: canvas.width / 2 - 50, // Center the paddle
    y: 20, // Position from top
    speed: 5, // Slightly slower than player for fairness
    color: 'red'
};

// Keyboard controls
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

// Update score display
function updateScoreDisplay() {
    scoreElement.textContent = `Score: ${score}`;
}

// Draw functions
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
}

function drawUserPaddle() {
    ctx.beginPath();
    ctx.rect(userPaddle.x, userPaddle.y, userPaddle.width, userPaddle.height);
    ctx.fillStyle = userPaddle.color;
    ctx.fill();
    ctx.closePath();
}

function drawComputerPaddle() {
    ctx.beginPath();
    ctx.rect(computerPaddle.x, computerPaddle.y, computerPaddle.width, computerPaddle.height);
    ctx.fillStyle = computerPaddle.color;
    ctx.fill();
    ctx.closePath();
}

// Reset ball to center
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    // Randomize direction slightly
    ball.dx = (Math.random() > 0.5 ? 1 : -1) * 4;
    ball.dy = (Math.random() > 0.5 ? 1 : -1) * 4;
}

// Computer AI to move paddle
function moveComputerPaddle() {
    // Simple AI: Move toward the ball's x position
    const paddleCenter = computerPaddle.x + computerPaddle.width / 2;
    
    // Add a little "reaction time" by not always following the ball perfectly
    if (Math.abs(paddleCenter - ball.x) > 20) {
        if (paddleCenter < ball.x) {
            // Move right
            computerPaddle.x += computerPaddle.speed;
            // Don't go off screen
            if (computerPaddle.x + computerPaddle.width > canvas.width) {
                computerPaddle.x = canvas.width - computerPaddle.width;
            }
        } else {
            // Move left
            computerPaddle.x -= computerPaddle.speed;
            // Don't go off screen
            if (computerPaddle.x < 0) {
                computerPaddle.x = 0;
            }
        }
    }
}

// Update game state
function update() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw objects
    drawBall();
    drawUserPaddle();
    drawComputerPaddle();
    
    // Move user paddle
    if (rightPressed && userPaddle.x < canvas.width - userPaddle.width) {
        userPaddle.x += userPaddle.speed;
    } else if (leftPressed && userPaddle.x > 0) {
        userPaddle.x -= userPaddle.speed;
    }
    
    // Move computer paddle with AI
    moveComputerPaddle();
    
    // Ball collision with walls
    if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
        ball.dx = -ball.dx;
    }
    
    // Ball collision with user paddle
    if (
        ball.y + ball.dy > userPaddle.y - ball.radius &&
        ball.y + ball.dy < userPaddle.y + userPaddle.height &&
        ball.x > userPaddle.x &&
        ball.x < userPaddle.x + userPaddle.width
    ) {
        ball.dy = -ball.dy;
        // Increment score
        score++;
        // Update score display
        updateScoreDisplay();
    }
    
    // Ball collision with computer paddle
    if (
        ball.y + ball.dy < computerPaddle.y + computerPaddle.height + ball.radius &&
        ball.y + ball.dy > computerPaddle.y &&
        ball.x > computerPaddle.x &&
        ball.x < computerPaddle.x + computerPaddle.width
    ) {
        ball.dy = -ball.dy;
    }
    
    // Ball hits bottom (missed by user)
    if (ball.y + ball.dy > canvas.height - ball.radius) {
        // Reset ball to center, lose a point if score > 0
        if (score > 0) {
            score--;
        }
        updateScoreDisplay();
        resetBall();
    }
    
    // Ball hits top (missed by computer)
    if (ball.y + ball.dy < ball.radius) {
        // Reset ball to center, add a point
        score++;
        updateScoreDisplay();
        resetBall();
    }
    
    // Update ball position
    ball.x += ball.dx;
    ball.y += ball.dy;
    
    // Continue animation
    requestAnimationFrame(update);
}

// Start the game
updateScoreDisplay();
resetBall();
update();