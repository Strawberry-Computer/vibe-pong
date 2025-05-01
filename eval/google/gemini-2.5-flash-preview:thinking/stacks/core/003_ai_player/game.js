// PROMPT: Get the canvas element and its 2D rendering context.
const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// PROMPT: Add AI Player to Pong
// Make sure that at this point there are 2 paddles: one for the user and one for the computer.

// Paddle properties
const paddleWidth = 10;
const paddleHeight = 100;
const paddleSpeed = 5;

// PROMPT: - Draw a white paddle (10px wide, 100px high) at the left side of the canvas
// Player Paddle (left)
const playerPaddleX = 0;
let playerPaddleY = (canvas.height - paddleHeight) / 2;
let playerPaddleDy = 0; // Delta Y for paddle movement

// AI Paddle (right)
const aiPaddleX = canvas.width - paddleWidth;
let aiPaddleY = (canvas.height - paddleHeight) / 2;
const aiPaddleSpeed = 3; // AI movement speed

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
let aiScore = 0; // Score for the AI

// Function to draw score
function drawScore() {
    // PROMPT: Add Scoring
    ctx.font = "20px Arial";
    ctx.fillStyle = "#FFF";
    ctx.fillText("Player: " + playerScore, 15, 25); // Position player score on left
    ctx.fillText("AI: " + aiScore, canvas.width - 80, 25); // Position AI score on right
}

// Function to reset ball
function resetBall() {
    // PROMPT: reset to center if it hits the bottom (misses paddle).
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    // Randomize direction slightly
    ballDx = (Math.random() > 0.5 ? 1 : -1) * ballSpeed;
    ballDy = (Math.random() > 0.5 ? 1 : -1) * ballSpeed;
     // Prevent purely horizontal movement
     if (Math.abs(ballDy) < 1) ballDy = (Math.random() > 0.5 ? 1 : -1) * ballSpeed;
}


// PROMPT: Use requestAnimationFrame for smooth animation.
function gameLoop() {
    // PROMPT: Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Paddles
    ctx.fillStyle = '#FFF'; // White color
    // PROMPT: - Draw a white paddle (10px wide, 100px high) at the left side of the canvas
    // Player Paddle
    ctx.fillRect(playerPaddleX, playerPaddleY, paddleWidth, paddleHeight);
    // PROMPT: Add AI Player to Pong
    // Make sure that at this point there are 2 paddles: one for the user and one for the computer.
    // AI Paddle
    ctx.fillRect(aiPaddleX, aiPaddleY, paddleWidth, paddleHeight);


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

    // PROMPT: movable up/down with arrow keys.
    // Update player paddle position
    playerPaddleY += playerPaddleDy;
    // PROMPT: ensuring it stays within canvas bounds.
    if (playerPaddleY < 0) {
        playerPaddleY = 0;
    } else if (playerPaddleY + paddleHeight > canvas.height) {
        playerPaddleY = canvas.height - paddleHeight;
    }

    // Update AI paddle position (simple AI)
    // PROMPT: Add AI Player to Pong
    // Make sure that at this point there are 2 paddles: one for the user and one for the computer.
    const aiCenter = aiPaddleY + paddleHeight / 2;
    if (aiCenter < ballY - 10) { // Add a small buffer
        aiPaddleY += aiPaddleSpeed;
    } else if (aiCenter > ballY + 10) { // Add a small buffer
        aiPaddleY -= aiPaddleSpeed;
    }
    // Ensure AI paddle stays within bounds
    if (aiPaddleY < 0) {
        aiPaddleY = 0;
    } else if (aiPaddleY + paddleHeight > canvas.height) {
        aiPaddleY = canvas.height - paddleHeight;
    }


    // PROMPT: Bounce the ball off the top and side walls;
    // Top/Bottom wall collision
    if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
        ballDy *= -1; // Reverse vertical direction
    }

    // Side wall collision (scoring)
    // PROMPT: reset to center if it hits the bottom (misses paddle).
    // Adjusted logic for two players
    if (ballX - ballRadius < 0) { // Ball goes off left (player) side
        aiScore++; // AI scores
        resetBall(); // Reset ball for the next round
    } else if (ballX + ballRadius > canvas.width) { // Ball goes off right (AI) side
        playerScore++; // Player scores
        resetBall(); // Reset ball for the next round
    }

    // PROMPT: Detect paddle collision to bounce the ball back up.
    // Check player paddle collision (left side)
    if (ballX - ballRadius <= playerPaddleX + paddleWidth &&
        ballY + ballRadius >= playerPaddleY &&
        ballY - ballRadius <= playerPaddleY + paddleHeight) {
        // Collision with player paddle
        ballDx = Math.abs(ballDx); // Ensure it moves right
        // Optional: Adjust ballDy based on where on the paddle it hit
        // let hitPos = (ballY - (playerPaddleY + paddleHeight/2)) / (paddleHeight/2); // -1 to 1 value
        // ballDy = hitPos * ballSpeed; // Angle increases further from center
    }

     // Check AI paddle collision (right side)
    // PROMPT: Add AI Player to Pong
    // Make sure that at this point there are 2 paddles: one for the user and one for the computer.
    if (ballX + ballRadius >= aiPaddleX &&
        ballY + ballRadius >= aiPaddleY &&
        ballY - ballRadius <= aiPaddleY + paddleHeight) {
         // Collision with AI paddle
         ballDx = -Math.abs(ballDx); // Ensure it moves left
         // Optional: Adjust ballDy based on where on the paddle it hit
         // let hitPos = (ballY - (aiPaddleY + paddleHeight/2)) / (paddleHeight/2); // -1 to 1 value
         // ballDy = hitPos * ballSpeed; // Angle increases further from center
    }

    // PROMPT: Use requestAnimationFrame for smooth animation.
    requestAnimationFrame(gameLoop);
}

// Event listeners for paddle movement
// PROMPT: detectable up/down with arrow keys.
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') {
        playerPaddleDy = -paddleSpeed; // Move up
    } else if (event.key === 'ArrowDown') {
        playerPaddleDy = paddleSpeed; // Move down
    }
});

document.addEventListener('keyup', (event) => {
    // Stop paddle movement when key is released
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        playerPaddleDy = 0;
    }
});


// Start the game loop
// PROMPT: Use requestAnimationFrame for smooth animation.
gameLoop();