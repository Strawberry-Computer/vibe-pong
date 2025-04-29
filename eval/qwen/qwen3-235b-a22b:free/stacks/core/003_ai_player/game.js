const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

const userPaddle = {
    width: 100,
    height: 10,
    x: (canvas.width - 100) / 2,
    y: canvas.height - 10,
    speed: 5
};

const computerPaddle = {
    width: 100,
    height: 10,
    x: (canvas.width - 100) / 2,
    y: 0,
    speed: 3
};

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    dx: 2,
    dy: 2
};

let leftPressed = false;
let rightPressed = false;
let score = 0;

const scoreElement = document.getElementById('score');

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') leftPressed = true;
    if (e.key === 'ArrowRight') rightPressed = true;
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft') leftPressed = false;
    if (e.key === 'ArrowRight') rightPressed = false;
});

function checkCollision(paddle) {
    if (
        ball.y + ball.radius >= paddle.y &&
        ball.y - ball.radius <= paddle.y + paddle.height &&
        ball.x >= paddle.x &&
        ball.x <= paddle.x + paddle.width
    ) {
        ball.dy = -ball.dy;
        if (paddle === userPaddle) {
            score++;
        }
    }
}

function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Move user paddle
    if (leftPressed) userPaddle.x -= userPaddle.speed;
    if (rightPressed) userPaddle.x += userPaddle.speed;

    // Keep user paddle in bounds
    if (userPaddle.x < 0) userPaddle.x = 0;
    if (userPaddle.x + userPaddle.width > canvas.width) userPaddle.x = canvas.width - userPaddle.width;

    // Move ball
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Check collisions with paddles
    checkCollision(userPaddle);
    checkCollision(computerPaddle);

    // Wall collisions (left, right, top)
    if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
        ball.dx = -ball.dx;
    }
    if (ball.y - ball.radius < 0) {
        ball.dy = -ball.dy;
    }

    // Bottom miss
    if (ball.y + ball.radius > canvas.height) {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.dx = 2 * (Math.random() > 0.5 ? 1 : -1);
        ball.dy = -2;
    }

    // Move computer paddle towards ball
    if (computerPaddle.x + computerPaddle.width / 2 < ball.x) {
        computerPaddle.x += computerPaddle.speed;
    } else {
        computerPaddle.x -= computerPaddle.speed;
    }

    // Keep computer paddle in bounds
    if (computerPaddle.x < 0) {
        computerPaddle.x = 0;
    }
    if (computerPaddle.x + computerPaddle.width > canvas.width) {
        computerPaddle.x = canvas.width - computerPaddle.width;
    }

    // Update score display
    scoreElement.innerText = 'Score: ' + score;

    // Draw paddles
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(userPaddle.x, userPaddle.y, userPaddle.width, userPaddle.height);
    ctx.fillRect(computerPaddle.x, computerPaddle.y, computerPaddle.width, computerPaddle.height);

    // Draw ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();

    requestAnimationFrame(draw);
}

draw();