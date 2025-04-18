const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// Paddle properties
const paddleHeight = 100;
const paddleWidth = 10;
let leftPaddleY = canvas.height / 2 - paddleHeight / 2;
let rightPaddleY = canvas.height / 2 - paddleHeight / 2;
const paddleSpeed = 5;

// Ball properties
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballRadius = 10;
let ballSpeedX = 3;
let ballSpeedY = 3;

// Score
let score = 0;
const scoreDisplay = document.getElementById('score');

// Player input
let upPressed = false;
let downPressed = false;

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key == "Up" || e.key == "ArrowUp") {
        upPressed = true;
    }
    else if (e.key == "Down" || e.key == "ArrowDown") {
        downPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Up" || e.key == "ArrowUp") {
        upPressed = false;
    }
    else if (e.key == "Down" || e.key == "ArrowDown") {
        downPressed = false;
    }
}

// Game logic
function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw paddles
    ctx.fillStyle = 'black';
    ctx.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);
    ctx.fillRect(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight);

    // Draw ball
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();

    // Move paddles
    if (upPressed) {
        leftPaddleY -= paddleSpeed;
        if (leftPaddleY < 0) {
            leftPaddleY = 0;
        }
    }
    else if (downPressed) {
        leftPaddleY += paddleSpeed;
        if (leftPaddleY > canvas.height - paddleHeight) {
            leftPaddleY = canvas.height - paddleHeight;
        }
    }

    // Basic AI for the right paddle
    if (rightPaddleY + paddleHeight / 2 < ballY) {
        rightPaddleY += paddleSpeed;
    } else if (rightPaddleY + paddleHeight / 2 > ballY) {
        rightPaddleY -= paddleSpeed;
    }

     // Keep right paddle within bounds
     if (rightPaddleY < 0) {
        rightPaddleY = 0;
    }
    if (rightPaddleY > canvas.height - paddleHeight) {
        rightPaddleY = canvas.height - paddleHeight;
    }
    

    // Move ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Bounce off top and bottom walls
    if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
        ballSpeedY = -ballSpeedY;
    }

    // Bounce off paddles
    if (ballX - ballRadius < paddleWidth && ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
                // Increment the score when the ball hits the paddle
        score++;
        // Update the score display in the DOM
        scoreDisplay.textContent = `Score: ${score}`;
    }
    if (ballX + ballRadius > canvas.width - paddleWidth && ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
                // Increment the score when the ball hits the paddle
        score++;
        // Update the score display in the DOM
        scoreDisplay.textContent = `Score: ${score}`;
    }

    // If ball misses the paddle
    if (ballX - ballRadius < 0) {
      // Reset the ball to the center with random x direction
      ballX = canvas.width / 2;
      ballY = canvas.height / 2;
      ballSpeedX = Math.random() > 0.5 ? 3 : -3;
    }

    //If the right player misses the ball
    if (ballX + ballRadius > canvas.width) {
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        ballSpeedX = Math.random() > 0.5 ? 3 : -3;

    }

    requestAnimationFrame(draw);
}

draw();