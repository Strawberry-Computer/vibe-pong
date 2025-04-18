const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');

// Game state
let score = 0;

// Paddle properties
const paddleHeight = 10;
const paddleWidth = 100;
let paddleX = (canvas.width - paddleWidth) / 2;

// Ball properties
const ballRadius = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let dx = 4;
let dy = -4;

// Key controls
let rightPressed = false;
let leftPressed = false;

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

function keyDownHandler(e) {
    if(e.key === 'Right' || e.key === 'ArrowRight') rightPressed = true;
    if(e.key === 'Left' || e.key === 'ArrowLeft') leftPressed = true;
}

function keyUpHandler(e) {
    if(e.key === 'Right' || e.key === 'ArrowRight') rightPressed = false;
    if(e.key === 'Left' || e.key === 'ArrowLeft') leftPressed = false;
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();
}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    dx = Math.random() < 0.5 ? 4 : -4;
    dy = -4;
}

function collisionDetection() {
    // Wall collisions
    if(ballX + dx > canvas.width - ballRadius || ballX + dx < ballRadius) dx = -dx;
    if(ballY + dy < ballRadius) dy = -dy;
    
    // Paddle collision
    if(ballY + dy > canvas.height - ballRadius - paddleHeight) {
        if(ballX > paddleX && ballX < paddleX + paddleWidth) {
            dy = -dy;
            score++;
        } else {
            resetBall();
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update paddle position
    if(rightPressed && paddleX < canvas.width - paddleWidth) paddleX += 7;
    if(leftPressed && paddleX > 0) paddleX -= 7;
    
    collisionDetection();
    ballX += dx;
    ballY += dy;
    
    drawPaddle();
    drawBall();
    
    // Update score display
    scoreElement.textContent = `Score: ${score}`;
    
    requestAnimationFrame(draw);
}

draw();