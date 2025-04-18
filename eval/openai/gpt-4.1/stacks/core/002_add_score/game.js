const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');
const scoreDiv = document.getElementById('score');

// Paddle properties
const paddleWidth = 100;
const paddleHeight = 10;
const paddleY = canvas.height - paddleHeight - 10;
let paddleX = (canvas.width - paddleWidth) / 2;
const paddleSpeed = 7;

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

// Draw paddle
function drawPaddle() {
    ctx.fillStyle = "#fff";
    ctx.fillRect(paddleX, paddleY, paddleWidth, paddleHeight);
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

// Update game state
function update() {
    // Move paddle
    if (leftPressed && !rightPressed) {
        paddleX -= paddleSpeed;
    } else if (rightPressed && !leftPressed) {
        paddleX += paddleSpeed;
    }
    // Bound paddle within canvas
    if (paddleX < 0) paddleX = 0;
    if (paddleX + paddleWidth > canvas.width) paddleX = canvas.width - paddleWidth;
    
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

    // Ball collision with top wall
    if (ballY - ballRadius < 0) {
        ballY = ballRadius;
        ballSpeedY = -ballSpeedY;
    }

    // Ball collision with paddle
    if (
        ballY + ballRadius >= paddleY &&
        ballY + ballRadius <= paddleY + paddleHeight &&
        ballX >= paddleX &&
        ballX <= paddleX + paddleWidth
    ) {
        ballY = paddleY - ballRadius;
        ballSpeedY = -ballSpeedY;
        // Increment score when hitting paddle
        score++;
    }

    // Ball falls below paddle (miss)
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
    ballSpeedY = -4;
}

// Render everything
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle();
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