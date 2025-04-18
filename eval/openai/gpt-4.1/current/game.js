const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');
const scoreDiv = document.getElementById('score');

// Paddle properties
const paddleWidth = 100;
const paddleHeight = 10;

// User paddle
const userPaddleY = canvas.height - paddleHeight - 10;
let userPaddleX = (canvas.width - paddleWidth) / 2;
const paddleSpeed = 7;

// AI paddle
const aiPaddleY = 10;
let aiPaddleX = (canvas.width - paddleWidth) / 2;
const aiMaxSpeed = 6; // AI paddle maximum speed

// Ball properties
const ballRadius = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 4;
let ballSpeedY = -4;

// Controls
let leftPressed = false;
let rightPressed = false;

// Score variable
let score = 0;

// Keyboard events
document.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowLeft') {
        leftPressed = true;
    } else if (e.code === 'ArrowRight') {
        rightPressed = true;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.code === 'ArrowLeft') {
        leftPressed = false;
    } else if (e.code === 'ArrowRight') {
        rightPressed = false;
    }
});

// Draw user's paddle
function drawUserPaddle() {
    ctx.fillStyle = "#fff";
    ctx.fillRect(userPaddleX, userPaddleY, paddleWidth, paddleHeight);
}

// Draw AI's paddle
function drawAIPaddle() {
    ctx.fillStyle = "#fff";
    ctx.fillRect(aiPaddleX, aiPaddleY, paddleWidth, paddleHeight);
}

// Draw ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
}

// Update score display in DOM
function updateScoreDisplay() {
    scoreDiv.textContent = `Score: ${score}`;
}

// Simple AI movement to follow the ball
function moveAIPaddle() {
    // Only move when ball is moving towards the AI (upwards)
    // AI reacts to ballX only, tries to keep center under the ball
    let aiCenter = aiPaddleX + paddleWidth / 2;
    // Predict future ball position can be simple: just follow when in zone
    if (ballX < aiCenter - 8) {
        aiPaddleX -= aiMaxSpeed;
    } else if (ballX > aiCenter + 8) {
        aiPaddleX += aiMaxSpeed;
    }
    // Bound AI paddle within the canvas
    if (aiPaddleX < 0) aiPaddleX = 0;
    if (aiPaddleX + paddleWidth > canvas.width) aiPaddleX = canvas.width - paddleWidth;
}

// Update game state
function update() {
    // Move user paddle
    if (leftPressed && !rightPressed) {
        userPaddleX -= paddleSpeed;
    } else if (rightPressed && !leftPressed) {
        userPaddleX += paddleSpeed;
    }
    // Bound user paddle
    if (userPaddleX < 0) userPaddleX = 0;
    if (userPaddleX + paddleWidth > canvas.width) userPaddleX = canvas.width - paddleWidth;

    // Move AI paddle (AI player)
    moveAIPaddle();

    // Move ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision with side walls
    if (ballX - ballRadius < 0) {
        ballX = ballRadius;
        ballSpeedX = -ballSpeedX;
    } else if (ballX + ballRadius > canvas.width) {
        ballX = canvas.width - ballRadius;
        ballSpeedX = -ballSpeedX;
    }

    // Ball collision with AI paddle (top)
    if (
        ballY - ballRadius <= aiPaddleY + paddleHeight &&
        ballY - ballRadius >= aiPaddleY &&
        ballX >= aiPaddleX &&
        ballX <= aiPaddleX + paddleWidth &&
        ballSpeedY < 0
    ) {
        ballY = aiPaddleY + paddleHeight + ballRadius; // Place below the AI paddle
        ballSpeedY = -ballSpeedY;
        // Ball touched AI paddle, no score here
    }

    // Ball collision with user paddle (bottom)
    if (
        ballY + ballRadius >= userPaddleY &&
        ballY + ballRadius <= userPaddleY + paddleHeight &&
        ballX >= userPaddleX &&
        ballX <= userPaddleX + paddleWidth &&
        ballSpeedY > 0
    ) {
        ballY = userPaddleY - ballRadius; // Place above the user paddle
        ballSpeedY = -ballSpeedY;
        // Increment score when hitting user paddle
        score++;
    }

    // Ball collision with top wall (missed by AI): reset ball
    if (ballY - ballRadius < 0) {
        resetBall();
    }

    // Ball falls below user paddle (miss): reset ball
    if (ballY - ballRadius > canvas.height) {
        resetBall();
    }

    // Update score display every frame
    updateScoreDisplay();
}

// Reset ball to center (with random x-direction), do not reset score
function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = 4 * (Math.random() > 0.5 ? 1 : -1);
    ballSpeedY = (Math.random() > 0.5 ? 1 : -1) * 4;
}

// Render everything
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawUserPaddle();
    drawAIPaddle();
    drawBall();
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

// Initialize score display and start game loop
updateScoreDisplay();
loop();