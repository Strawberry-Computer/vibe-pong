// PROMPT: Generate a simple Pong game using HTML, CSS, and JavaScript

// PROMPT: Use <canvas width="800" height="400" id="pongCanvas">
const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// PROMPT: Enhance the Pong game by adding score display
const scoreBoard = document.getElementById('scoreBoard');
let score = 0;

// PROMPT: Draw a white paddle (10px wide, 100px high) at the left side of the canvas, movable up/down with arrow keys.
// PROMPT: Add the computer player which moves the paddle automatically.
// PROMPT: At this point there are 2 paddles: one for the user and one for the computer.
const userPaddle = {
    x: 0,
    y: canvas.height / 2 - 50,
    width: 10,
    height: 100,
    speed: 6,
    moveUp: false,
    moveDown: false
};
// PROMPT: Add the computer player which moves the paddle automatically.
const aiPaddle = {
    x: canvas.width - 10,
    y: canvas.height / 2 - 50,
    width: 10,
    height: 100,
    speed: 5
};

// PROMPT: Draw a white ball (10px radius) starting at canvas center, moving diagonally with constant speed.
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speedX: 4,
    speedY: -4
};

// PROMPT: Bounce the ball off the top and side walls; reset to center if it hits the bottom (misses paddle).
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speedX = 4 * (Math.random() > 0.5 ? 1 : -1);
    ball.speedY = -4 * (Math.random() > 0.5 ? 1 : -1);
}

// PROMPT: Draw paddle and ball
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // User Paddle
    ctx.fillStyle = 'white';
    ctx.fillRect(userPaddle.x, userPaddle.y, userPaddle.width, userPaddle.height);

    // PROMPT: Draw AI/computer paddle
    ctx.fillStyle = 'white';
    ctx.fillRect(aiPaddle.x, aiPaddle.y, aiPaddle.width, aiPaddle.height);

    // Ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();

    // PROMPT: Enhance the Pong game by adding score display
    ctx.font = '32px monospace';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText(`Score: ${score}`, canvas.width / 2, 40);
}

// PROMPT: Draw a white paddle ... movable up/down with arrow keys.
function updateUserPaddle() {
    if (userPaddle.moveUp) {
        userPaddle.y -= userPaddle.speed;
    } else if (userPaddle.moveDown) {
        userPaddle.y += userPaddle.speed;
    }
    if (userPaddle.y < 0) userPaddle.y = 0;
    if (userPaddle.y + userPaddle.height > canvas.height) userPaddle.y = canvas.height - userPaddle.height;
}

// PROMPT: Add the computer player which moves the paddle automatically.
function updateAIPaddle() {
    // Simple AI: move paddle center toward the ball's y position
    const paddleCenter = aiPaddle.y + aiPaddle.height / 2;
    if (paddleCenter < ball.y - 10) {
        aiPaddle.y += aiPaddle.speed;
    } else if (paddleCenter > ball.y + 10) {
        aiPaddle.y -= aiPaddle.speed;
    }
    if (aiPaddle.y < 0) aiPaddle.y = 0;
    if (aiPaddle.y + aiPaddle.height > canvas.height) aiPaddle.y = canvas.height - aiPaddle.height;
}

// PROMPT: Bounce the ball off the top and side walls; reset to center if it hits the bottom (misses paddle).
// PROMPT: Detect paddle collision to bounce the ball back up.
// PROMPT: Enhance the Pong game by adding score display
function updateBall() {
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    // Top wall
    if (ball.y - ball.radius < 0) {
        ball.y = ball.radius;
        ball.speedY *= -1;
    }
    // Bottom wall
    if (ball.y + ball.radius > canvas.height) {
        ball.y = canvas.height - ball.radius;
        ball.speedY *= -1;
    }
    // Left wall: reset if ball goes past user paddle
    if (ball.x - ball.radius < 0) {
        // PROMPT: Enhance the Pong game by adding score display
        score = 0;
        updateScoreDisplay();
        resetBall();
        return;
    }
    // Right wall: reset if ball goes past ai paddle
    if (ball.x + ball.radius > canvas.width) {
        // PROMPT: Enhance the Pong game by adding score display
        score++;
        updateScoreDisplay();
        resetBall();
        return;
    }

    // PROMPT: Detect userPaddle collision to bounce the ball back
    if (
        ball.x - ball.radius <= userPaddle.x + userPaddle.width &&
        ball.x - ball.radius >= userPaddle.x &&
        ball.y + ball.radius >= userPaddle.y &&
        ball.y - ball.radius <= userPaddle.y + userPaddle.height
    ) {
        ball.x = userPaddle.x + userPaddle.width + ball.radius;
        ball.speedX *= -1;
    }

    // PROMPT: Detect aiPaddle collision to bounce the ball back
    if (
        ball.x + ball.radius >= aiPaddle.x &&
        ball.x + ball.radius <= aiPaddle.x + aiPaddle.width &&
        ball.y + ball.radius >= aiPaddle.y &&
        ball.y - ball.radius <= aiPaddle.y + aiPaddle.height
    ) {
        ball.x = aiPaddle.x - ball.radius;
        ball.speedX *= -1;
    }
}

// PROMPT: Enhance the Pong game by adding score display
function updateScoreDisplay() {
    if (scoreBoard) {
        scoreBoard.textContent = `Score: ${score}`;
    }
}

// PROMPT: Use requestAnimationFrame for smooth animation.
function gameLoop() {
    updateUserPaddle();
    updateAIPaddle();
    updateBall();
    draw();
    requestAnimationFrame(gameLoop);
}

// PROMPT: Movable up/down with arrow keys.
window.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowUp') {
        userPaddle.moveUp = true;
    }
    if (e.key === 'ArrowDown') {
        userPaddle.moveDown = true;
    }
});

window.addEventListener('keyup', function(e) {
    if (e.key === 'ArrowUp') {
        userPaddle.moveUp = false;
    }
    if (e.key === 'ArrowDown') {
        userPaddle.moveDown = false;
    }
});

// PROMPT: Enhance the Pong game by adding score display
updateScoreDisplay();

gameLoop();