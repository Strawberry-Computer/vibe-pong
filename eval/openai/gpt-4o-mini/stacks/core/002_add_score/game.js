const canvas = document.getElementById("pongCanvas"); // PROMPT: Access the canvas element
const context = canvas.getContext("2d");

let paddleHeight = 100; // PROMPT: Paddle height
let paddleWidth = 10; // PROMPT: Paddle width
let paddleY = canvas.height / 2 - paddleHeight / 2; // PROMPT: Initial paddle Y position
const paddleSpeed = 5; // PROMPT: Paddle movement speed

let ballRadius = 10; // PROMPT: Ball radius
let ballX = canvas.width / 2; // PROMPT: Initial ball X position
let ballY = canvas.height / 2; // PROMPT: Initial ball Y position
let ballSpeedX = 3; // PROMPT: Ball horizontal speed
let ballSpeedY = 3; // PROMPT: Ball vertical speed

let player1Score = 0; // PROMPT: Initialize Player 1 score
let player2Score = 0; // PROMPT: Initialize Player 2 score

// Draw the paddle
function drawPaddle() { // PROMPT: Draw the paddle
    context.fillStyle = "white";
    context.fillRect(0, paddleY, paddleWidth, paddleHeight);
}

// Draw the ball
function drawBall() { // PROMPT: Draw the ball
    context.beginPath();
    context.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    context.fillStyle = "white";
    context.fill();
    context.closePath();
}

// Draw the score
function drawScore() { // PROMPT: Draw the score on the canvas
    context.fillStyle = "white";
    context.font = "20px Arial";
    context.fillText("Player 1: " + player1Score, 20, 30);
    context.fillText("Player 2: " + player2Score, canvas.width - 120, 30);
}

// Update game state
function update() { // PROMPT: Update game state
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision with top and bottom walls
    if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
        ballSpeedY = -ballSpeedY; // PROMPT: Bounce off top and bottom walls
    }

    // Ball collision with paddle
    if (ballX - ballRadius < paddleWidth && ballY > paddleY && ballY < paddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX; // PROMPT: Bounce off the paddle
    }

    // Ball missed the paddle
    if (ballX + ballRadius < 0) {
        player2Score++; // PROMPT: Increment Player 2 score
        resetBall(); // PROMPT: Reset the ball to the center
    }

    // Ball missed on the other side
    if (ballX - ballRadius > canvas.width) {
        player1Score++; // PROMPT: Increment Player 1 score
        resetBall(); // PROMPT: Reset the ball to the center
    }
}

// Reset ball to center
function resetBall() { // PROMPT: Reset ball function
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = 3;
    ballSpeedY = 3;
}

// Handle paddle movement
document.addEventListener("keydown", function(event) { // PROMPT: Paddle movement with arrow keys
    if (event.key === "ArrowUp" && paddleY > 0) {
        paddleY -= paddleSpeed;
    } else if (event.key === "ArrowDown" && paddleY < canvas.height - paddleHeight) {
        paddleY += paddleSpeed;
    }
});

// Main game loop
function gameLoop() { // PROMPT: RequestAnimationFrame for smooth animation
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle();
    drawBall();
    drawScore(); // PROMPT: Draw the score
    update();
    requestAnimationFrame(gameLoop); // PROMPT: Smooth animation
}

// Start the game
gameLoop(); // PROMPT: Start game loop