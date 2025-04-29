// PROMPT: JS: Add scoring to Pong with score variable, increment on paddle hit, update display, don't reset on miss.

const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// PROMPT: JS: Add a score variable starting at 0.
let score = 0;
const scoreDiv = document.getElementById('score');

const paddleWidth = 100;
const paddleHeight = 10;
let paddleX = (canvas.width - paddleWidth) / 2;
const paddleY = canvas.height - paddleHeight - 10;
const paddleSpeed = 7;
let rightPressed = false;
let leftPressed = false;

// PROMPT: Enhance the Pong game by having the computer player move the paddle automatically.
// PROMPT: Make sure that at this point there are 2 paddles: one for the user and one for the computer.
let aiPaddleX = (canvas.width - paddleWidth) / 2;
const aiPaddleY = 10;
const aiPaddleSpeed = 6;

const ballRadius = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 4;
let ballSpeedY = -4;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // PROMPT: Draw the user paddle.
    ctx.fillStyle = '#fff';
    ctx.fillRect(paddleX, paddleY, paddleWidth, paddleHeight);

    // PROMPT: Draw the AI paddle.
    ctx.fillStyle = '#fff';
    ctx.fillRect(aiPaddleX, aiPaddleY, paddleWidth, paddleHeight);

    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.closePath();

    if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0) {
        ballSpeedX = -ballSpeedX;
    }

    // PROMPT: Ball bounces off top wall.
    if (ballY - ballRadius < 0) {
        ballSpeedY = -ballSpeedY;
    }

    // PROMPT: Ball bounces off user paddle and increments score on hit.
    if (
        ballY + ballRadius >= paddleY &&
        ballY + ballRadius <= paddleY + paddleHeight &&
        ballX >= paddleX &&
        ballX <= paddleX + paddleWidth
    ) {
        ballSpeedY = -ballSpeedY;
        ballY = paddleY - ballRadius;
        score += 1;
    }
    // PROMPT: Reset ball to center with random x-direction on miss, don't reset score.
    else if (ballY + ballRadius > canvas.height) {
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        ballSpeedX = 4 * (Math.random() < 0.5 ? 1 : -1);
        ballSpeedY = -4;
    }

    // PROMPT: Ball bounces off AI paddle (top paddle), no scoring.
    if (
        ballY - ballRadius <= aiPaddleY + paddleHeight &&
        ballY - ballRadius >= aiPaddleY &&
        ballX >= aiPaddleX &&
        ballX <= aiPaddleX + paddleWidth
    ) {
        ballSpeedY = -ballSpeedY;
        ballY = aiPaddleY + paddleHeight + ballRadius;
    }

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // PROMPT: User paddle movement using arrow keys.
    if (rightPressed && paddleX + paddleWidth < canvas.width) {
        paddleX += paddleSpeed;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= paddleSpeed;
    }

    // PROMPT: AI paddle movement to follow the ball automagically.
    if (aiPaddleX + paddleWidth / 2 < ballX - 10) {
        aiPaddleX += aiPaddleSpeed;
    } else if (aiPaddleX + paddleWidth / 2 > ballX + 10) {
        aiPaddleX -= aiPaddleSpeed;
    }
    // Keep AI paddle within bounds.
    if (aiPaddleX < 0) aiPaddleX = 0;
    if (aiPaddleX + paddleWidth > canvas.width) aiPaddleX = canvas.width - paddleWidth;

    // PROMPT: Update the score display in the DOM each frame.
    scoreDiv.textContent = "Score: " + score;

    requestAnimationFrame(draw);
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight') {
        rightPressed = true;
    }
    if (e.key === 'ArrowLeft') {
        leftPressed = true;
    }
});

document.addEventListener('keyup', function(e) {
    if (e.key === 'ArrowRight') {
        rightPressed = false;
    }
    if (e.key === 'ArrowLeft') {
        leftPressed = false;
    }
});

draw();