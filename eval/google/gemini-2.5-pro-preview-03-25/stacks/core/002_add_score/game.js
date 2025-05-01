// PROMPT: Use `<canvas width="800" height="400" id="pongCanvas">`
const canvas = document.getElementById('pongCanvas');
const context = canvas.getContext('2d');

// PROMPT: Draw a white paddle (10px wide, 100px high) at the left side of the canvas
const paddleWidth = 10;
const paddleHeight = 100;
let paddleY = (canvas.height - paddleHeight) / 2;
const paddleX = 10; // Position paddle slightly from the left edge
let paddleSpeed = 0;
const paddleMaxSpeed = 5;

// PROMPT: Draw a white ball (10px radius) starting at canvas center
const ballRadius = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;

// PROMPT: moving diagonally with constant speed.
let ballSpeedX = 4;
let ballSpeedY = 4;

// PROMPT: Enhance the Pong game by adding score display
let playerScore = 0;
// For simplicity, we'll treat missing the left paddle as the opponent scoring
let opponentScore = 0;


// PROMPT: movable up/down with arrow keys.
document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

function keyDownHandler(e) {
    if (e.key === 'ArrowUp') {
        paddleSpeed = -paddleMaxSpeed;
    } else if (e.key === 'ArrowDown') {
        paddleSpeed = paddleMaxSpeed;
    }
}

function keyUpHandler(e) {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        paddleSpeed = 0;
    }
}

function movePaddle() {
    paddleY += paddleSpeed;

    // Keep paddle within canvas bounds
    if (paddleY < 0) {
        paddleY = 0;
    } else if (paddleY + paddleHeight > canvas.height) {
        paddleY = canvas.height - paddleHeight;
    }
}

// PROMPT: reset to center if it hits the bottom (misses paddle).
// Based on standard Pong interpretation and other prompts, reset occurs if ball passes the left edge (paddle side)
function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    // Reverse horizontal direction for variety
    ballSpeedX = -ballSpeedX;
    // Randomize vertical direction slightly
    ballSpeedY = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 2 + 3); // Speed between 3 and 5
}

function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // PROMPT: Bounce the ball off the top and side walls;
    // Bounce off top wall
    if (ballY - ballRadius < 0) {
        ballY = ballRadius; // Prevent sticking
        ballSpeedY = -ballSpeedY;
    }
    // Bounce off bottom wall
    if (ballY + ballRadius > canvas.height) {
       ballY = canvas.height - ballRadius; // Prevent sticking
       ballSpeedY = -ballSpeedY;
    }
     // Bounce off right "side" wall
     if (ballX + ballRadius > canvas.width) {
        // PROMPT: Enhance the Pong game by adding score display (Player scores when ball hits right wall)
        playerScore++;
        resetBall(); // Reset ball after player scores
        // ballX = canvas.width - ballRadius; // Prevent sticking (handled by reset now)
        // ballSpeedX = -ballSpeedX; // Bounce horizontally (handled by reset now)
    }

    // PROMPT: reset to center if it hits the bottom (misses paddle).
    // Reset if ball hits the left wall (paddle side miss interpreted from context)
    if (ballX - ballRadius < 0) {
        // PROMPT: Enhance the Pong game by adding score display (Opponent scores when ball hits left wall)
        opponentScore++;
        resetBall();
    }

    // PROMPT: Detect paddle collision to bounce the ball back up.
    // Collision with left paddle
    if (ballX - ballRadius < paddleX + paddleWidth && // Ball's left edge is past paddle's left edge
        ballX + ballRadius > paddleX &&             // Ball's right edge hasn't passed paddle's left edge (redundant with below?)
        ballX - ballRadius < paddleX + paddleWidth && // Ball's left edge hasn't passed paddle's right edge
        ballY + ballRadius > paddleY &&                 // Ball's bottom edge is below paddle's top edge
        ballY - ballRadius < paddleY + paddleHeight) {  // Ball's top edge is above paddle's bottom edge
            // Check if the ball is actually moving towards the paddle to prevent sticking
            if (ballSpeedX < 0) {
                ballX = paddleX + paddleWidth + ballRadius; // Move ball slightly out of paddle
                ballSpeedX = -ballSpeedX; // Bounce horizontally

                // Optional: Adjust vertical speed based on hit location on paddle
                let deltaY = ballY - (paddleY + paddleHeight / 2);
                ballSpeedY = deltaY * 0.35; // Adjust this factor for more/less angle influence
            }
    }
}

function drawPaddle() {
    // PROMPT: Draw a white paddle (10px wide, 100px high)
    context.fillStyle = 'white';
    context.fillRect(paddleX, paddleY, paddleWidth, paddleHeight);
}

function drawBall() {
    // PROMPT: Draw a white ball (10px radius)
    context.fillStyle = 'white';
    context.beginPath();
    context.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    context.fill();
}

// PROMPT: Enhance the Pong game by adding score display
function drawScore() {
    context.fillStyle = 'white';
    context.font = '32px Arial';
    // Draw player score (left side)
    context.fillText(playerScore.toString(), canvas.width / 4, 50);
    // Draw opponent score (right side)
    context.fillText(opponentScore.toString(), 3 * canvas.width / 4, 50);
}

// PROMPT: Enhance the Pong game by adding score display (Draw dashed center line for visual separation)
function drawCenterLine() {
    context.strokeStyle = 'white';
    context.lineWidth = 2;
    context.setLineDash([10, 10]); // Dashed line pattern
    context.beginPath();
    context.moveTo(canvas.width / 2, 0);
    context.lineTo(canvas.width / 2, canvas.height);
    context.stroke();
    context.setLineDash([]); // Reset line dash pattern
}


function draw() {
    // Clear canvas
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // PROMPT: Enhance the Pong game by adding score display (Draw dashed center line)
    drawCenterLine();

    drawPaddle();
    drawBall();

    // PROMPT: Enhance the Pong game by adding score display
    drawScore();
}

function gameLoop() {
    movePaddle();
    moveBall();
    draw();

    // PROMPT: Use requestAnimationFrame for smooth animation.
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();