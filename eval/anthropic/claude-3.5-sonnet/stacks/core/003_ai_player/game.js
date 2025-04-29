const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// PROMPT: Enhance the Pong game by having the computer player move the paddle automatically
const aiPaddle = {
    width: 100,
    height: 10,
    x: canvas.width / 2 - 50,
    y: 20
};

const playerPaddle = {
    width: 100,
    height: 10,
    x: canvas.width / 2 - 50,
    y: canvas.height - 20
};

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    dx: 4,
    dy: -4
};

let score = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && playerPaddle.x > 0) {
        playerPaddle.x -= 20;
    }
    if (e.key === 'ArrowRight' && playerPaddle.x < canvas.width - playerPaddle.width) {
        playerPaddle.x += 20;
    }
});

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = 4 * (Math.random() > 0.5 ? 1 : -1);
    ball.dy = -4;
}

function updateScore() {
    document.getElementById('score').textContent = `Score: ${score}`;
}

// PROMPT: Make the computer player move the paddle automatically
function updateAIPaddle() {
    const paddleCenter = aiPaddle.x + aiPaddle.width / 2;
    const ballCenter = ball.x;
    const moveSpeed = 5;
    
    if (paddleCenter < ballCenter && aiPaddle.x < canvas.width - aiPaddle.width) {
        aiPaddle.x += moveSpeed;
    }
    if (paddleCenter > ballCenter && aiPaddle.x > 0) {
        aiPaddle.x -= moveSpeed;
    }
}

function detectCollisions() {
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.dx = -ball.dx;
    }

    // PROMPT: Add collision detection for AI paddle
    if (ball.y - ball.radius < aiPaddle.y + aiPaddle.height && 
        ball.x > aiPaddle.x && 
        ball.x < aiPaddle.x + aiPaddle.width) {
        ball.dy = -ball.dy;
    }

    if (ball.y + ball.radius > canvas.height) {
        resetBall();
    }

    if (ball.y + ball.radius > playerPaddle.y && 
        ball.x > playerPaddle.x && 
        ball.x < playerPaddle.x + playerPaddle.width) {
        ball.dy = -ball.dy;
        score += 1;
        updateScore();
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = 'white';
    ctx.fillRect(playerPaddle.x, playerPaddle.y, playerPaddle.width, playerPaddle.height);
    ctx.fillRect(aiPaddle.x, aiPaddle.y, aiPaddle.width, aiPaddle.height);
    
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();

    updateAIPaddle();
    
    ball.x += ball.dx;
    ball.y += ball.dy;

    detectCollisions();

    requestAnimationFrame(draw);
}

draw();