// PROMPT: Get the canvas element and its 2D rendering context.
const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// PROMPT: - Draw a white paddle (10px wide, 100px high) at the left side of the canvas
const paddleWidth = 10;
const paddleHeight = 100;
const paddleX = 0; // Position at the left side
let paddleY = (canvas.height - paddleHeight) / 2; // Start centered vertically
const paddleSpeed = 5; // Speed in pixels per frame
let paddleDy = 0; // Delta Y for paddle movement

// PROMPT: - Draw a white ball (10px radius)
const ballRadius = 10;
// PROMPT: starting at canvas center
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
// PROMPT: moving diagonally with constant speed.
let ballSpeed = 5;
let ballDx = ballSpeed; // Delta x for ball movement
let ballDy = ballSpeed; // Delta y for ball movement

// Add scoring variables
let playerScore = 0;

// Function to draw score
function drawScore() {
    // PROMPT: Add Scoring
    ctx.font = "20px Arial";
    ctx.fillStyle = "#FFF";
    ctx.fillText("Score: " + playerScore, 15, 25); // Position the score
}

// PROMPT: Use requestAnimationFrame for smooth animation.
function gameLoop() {
    // PROMPT: Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // PROMPT: Draw the paddle
    ctx.fillStyle = '#FFF'; // White color
    ctx.fillRect(paddleX, paddleY, paddleWidth, paddleHeight);

    // PROMPT: Draw the ball
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#FFF'; // White color
    ctx.fill();
    ctx.closePath();

    // Add Scoring
    drawScore();

    // Update ball position
    ballX += ballDx;
    ballY += ballDy;

    // Update paddle position
    // PROMPT: movable up/down with arrow keys.
    paddleY += paddleDy;
    // PROMPT: ensuring it stays within canvas bounds.
    if (paddleY < 0) {
        paddleY = 0;
    } else if (paddleY + paddleHeight > canvas.height) {
        paddleY = canvas.height - paddleHeight;
    }

    // PROMPT: Bounce the ball off the top and side walls;
    // Top/Bottom wall collision
    if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
        ballDy *= -1; // Reverse vertical direction
    }

    // Right wall collision (miss) - Add Scoring
    // PROMPT: reset to center if it hits the bottom (misses paddle).
    // Adjusted to right wall for Pong logic
    if (ballX + ballRadius > canvas.width) {
        playerScore++; // Increment player score when ball goes past right edge
        ballX = canvas.width / 2; // PROMPT: reset to center
        ballY = canvas.height / 2; // PROMPT: reset to center
        ballDx *= -1; // Reverse horizontal direction for the next round start
         // Optionally, randomize ballDx and ballDy slightly here to make it unpredictable
    }

    // PROMPT: Detect paddle collision to bounce the ball back up.
    // Check if ball is near paddle's x position AND within paddle's y range
    if (ballX - ballRadius <= paddleX + paddleWidth &&
        ballY + ballRadius >= paddleY &&
        ballY - ballRadius <= paddleY + paddleHeight) {
        // Collision detected
        ballDx *= -1; // Reverse horizontal direction
         // Optional: Adjust ballDy slightly based on where on the paddle it hit
    }


    // PROMPT: Use requestAnimationFrame for smooth animation.
    requestAnimationFrame(gameLoop);
}

// Event listeners for paddle movement
// PROMPT: detectable up/down with arrow keys.
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') {
        paddleDy = -paddleSpeed; // Move up
    } else if (event.key === 'ArrowDown') {
        paddleDy = paddleSpeed; // Move down
    }
});

document.addEventListener('keyup', (event) => {
    // Stop paddle movement when key is released
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        paddleDy = 0;
    }
});


// Start the game loop
// PROMPT: Use requestAnimationFrame for smooth animation.
gameLoop();