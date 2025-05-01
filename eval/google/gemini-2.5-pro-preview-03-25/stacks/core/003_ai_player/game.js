// PROMPT: Use `<canvas width="800" height="400" id="pongCanvas">`
const canvas = document.getElementById('pongCanvas');
const context = canvas.getContext('2d');

// PROMPT: Draw a white paddle (10px wide, 100px high) at the left side of the canvas
// PROMPT: Add the computer player which moves the paddle automatically. Make sure that at this point there are 2 paddles: one for the user and one for the computer.
const paddleWidth = 10;
const paddleHeight = 100;
let playerPaddleY = (canvas.height - paddleHeight) / 2;
const playerPaddleX = 10; // Position player paddle slightly from the left edge
let playerPaddleSpeed = 0;
const playerPaddleMaxSpeed = 5;

// PROMPT: Add the computer player which moves the paddle automatically. Make sure that at this point there are 2 paddles: one for the user and one for the computer.
let aiPaddleY = (canvas.height - paddleHeight) / 2;
const aiPaddleX = canvas.width - paddleWidth - 10; // Position AI paddle slightly from the right edge
const aiPaddleSpeed = 3; // Adjust AI speed for difficulty

// PROMPT: Draw a white ball (10px radius) starting at canvas center
const ballRadius = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;

// PROMPT: moving diagonally with constant speed.
let ballSpeedX = 4;
let ballSpeedY = 4;

// PROMPT: Enhance the Pong game by adding score display
let playerScore = 0;
// PROMPT: Add the computer player which moves the paddle automatically.
let aiScore = 0;


// PROMPT: movable up/down with arrow keys.
document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

function keyDownHandler(e) {
    if (e.key === 'ArrowUp') {
        playerPaddleSpeed = -playerPaddleMaxSpeed;
    } else if (e.key === 'ArrowDown') {
        playerPaddleSpeed = playerPaddleMaxSpeed;
    }
}

function keyUpHandler(e) {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        playerPaddleSpeed = 0;
    }
}

function movePlayerPaddle() {
    playerPaddleY += playerPaddleSpeed;

    // Keep player paddle within canvas bounds
    if (playerPaddleY < 0) {
        playerPaddleY = 0;
    } else if (playerPaddleY + paddleHeight > canvas.height) {
        playerPaddleY = canvas.height - paddleHeight;
    }
}

// PROMPT: Add the computer player which moves the paddle automatically.
function moveAiPaddle() {
    // Simple AI: try to center the paddle with the ball's Y position
    const paddleCenterY = aiPaddleY + paddleHeight / 2;
    if (paddleCenterY < ballY - 20) { // Add some threshold to prevent jittering
        aiPaddleY += aiPaddleSpeed;
    } else if (paddleCenterY > ballY + 20) {
        aiPaddleY -= aiPaddleSpeed;
    }

    // Keep AI paddle within canvas bounds
    if (aiPaddleY < 0) {
        aiPaddleY = 0;
    } else if (aiPaddleY + paddleHeight > canvas.height) {
        aiPaddleY = canvas.height - paddleHeight;
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

     // Ball passes right paddle (Player Scores)
     // PROMPT: Add the computer player which moves the paddle automatically.
     if (ballX + ballRadius > canvas.width) {
        // PROMPT: Enhance the Pong game by adding score display (Player scores when ball hits right wall) -> Now when ball passes AI paddle
        playerScore++;
        resetBall(); // Reset ball after player scores
    }

    // PROMPT: reset to center if it hits the bottom (misses paddle). -> Reset if ball hits left wall (misses player paddle)
    if (ballX - ballRadius < 0) {
        // PROMPT: Enhance the Pong game by adding score display (Opponent scores when ball hits left wall) -> AI scores when ball passes player paddle
        aiScore++; // AI scores
        resetBall();
    }

    // PROMPT: Detect paddle collision to bounce the ball back up.
    // Collision with left (player) paddle
    if (ballX - ballRadius < playerPaddleX + paddleWidth && // Ball's left edge hasn't passed paddle's right edge
        ballX + ballRadius > playerPaddleX &&             // Ball's right edge is past paddle's left edge
        ballY + ballRadius > playerPaddleY &&                 // Ball's bottom edge is below paddle's top edge
        ballY - ballRadius < playerPaddleY + paddleHeight) {  // Ball's top edge is above paddle's bottom edge
            // Check if the ball is actually moving towards the paddle to prevent sticking or double hits
            if (ballSpeedX < 0) {
                ballX = playerPaddleX + paddleWidth + ballRadius; // Move ball slightly out of paddle
                ballSpeedX = -ballSpeedX; // Bounce horizontally

                // Optional: Adjust vertical speed based on hit location on paddle
                let deltaY = ballY - (playerPaddleY + paddleHeight / 2);
                ballSpeedY = deltaY * 0.35; // Adjust this factor for more/less angle influence
            }
    }

    // PROMPT: Add the computer player which moves the paddle automatically.
    // Collision with right (AI) paddle
    if (ballX + ballRadius > aiPaddleX && // Ball's right edge hasn't passed paddle's left edge
        ballX - ballRadius < aiPaddleX + paddleWidth && // Ball's left edge is before paddle's right edge
        ballY + ballRadius > aiPaddleY &&                 // Ball's bottom edge is below paddle's top edge
        ballY - ballRadius < aiPaddleY + paddleHeight) {  // Ball's top edge is above paddle's bottom edge
             // Check if the ball is actually moving towards the paddle to prevent sticking or double hits
            if (ballSpeedX > 0) {
                ballX = aiPaddleX - ballRadius; // Move ball slightly out of paddle
                ballSpeedX = -ballSpeedX; // Bounce horizontally

                // Optional: Adjust vertical speed based on hit location on paddle
                let deltaY = ballY - (aiPaddleY + paddleHeight / 2);
                ballSpeedY = deltaY * 0.35; // Adjust this factor for more/less angle influence
            }
    }
}

// PROMPT: Add the computer player which moves the paddle automatically. Make sure that at this point there are 2 paddles: one for the user and one for the computer.
function drawPlayerPaddle() {
    // PROMPT: Draw a white paddle (10px wide, 100px high)
    context.fillStyle = 'white';
    context.fillRect(playerPaddleX, playerPaddleY, paddleWidth, paddleHeight);
}

// PROMPT: Add the computer player which moves the paddle automatically. Make sure that at this point there are 2 paddles: one for the user and one for the computer.
function drawAiPaddle() {
    context.fillStyle = 'white';
    context.fillRect(aiPaddleX, aiPaddleY, paddleWidth, paddleHeight);
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
    // Draw AI score (right side)
    // PROMPT: Add the computer player which moves the paddle automatically.
    context.fillText(aiScore.toString(), 3 * canvas.width / 4, 50);
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

    // PROMPT: Add the computer player which moves the paddle automatically. Make sure that at this point there are 2 paddles: one for the user and one for the computer.
    drawPlayerPaddle();
    drawAiPaddle();
    drawBall();

    // PROMPT: Enhance the Pong game by adding score display
    drawScore();
}

function gameLoop() {
    movePlayerPaddle();
    // PROMPT: Add the computer player which moves the paddle automatically.
    moveAiPaddle();
    moveBall();
    draw();

    // PROMPT: Use requestAnimationFrame for smooth animation.
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();