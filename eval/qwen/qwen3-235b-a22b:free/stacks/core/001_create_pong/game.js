// PROMPT: Use Canvas API to draw a white paddle at the bottom, movable with arrow keys
const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

const paddleWidth = 100;
const paddleHeight = 10;
let paddleX = (canvas.width - paddleWidth) / 2;

const ballRadius = 10;
let ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    dx: 2,
    dy: -2
};

let keys = { left: false, right: false };

document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') keys.left = true;
    if (e.key === 'ArrowRight') keys.right = true;
});

document.addEventListener('keyup', function(e) {
    if (e.key === 'ArrowLeft') keys.left = false;
    if (e.key === 'ArrowRight') keys.right = false;
});

function update() {
    // PROMPT: Move paddle left/right with arrow keys
    if (keys.left) paddleX -= 5;
    if (keys.right) paddleX += 5;
    // Keep paddle within canvas bounds
    if (paddleX < 0) paddleX = 0;
    if (paddleX + paddleWidth > canvas.width) paddleX = canvas.width - paddleWidth;

    // PROMPT: Ball moves diagonally with constant speed
    ball.x += ball.dx;
    ball.y += ball.dy;

    // PROMPT: Bounce off top and side walls
    if (ball.x - ballRadius < 0 || ball.x + ballRadius > canvas.width) {
        ball.dx = -ball.dx;
    }
    if (ball.y - ballRadius < 0) {
        ball.dy = -ball.dy;
    }

    // PROMPT: Detect paddle collision to bounce
    if (ball.y + ballRadius >= canvas.height - paddleHeight) {
        if (ball.x >= paddleX && ball.x <= paddleX + paddleWidth) {
            ball.dy = -ball.dy;
        }
    }

    // PROMPT: Reset ball if it hits bottom (misses paddle)
    if (ball.y + ballRadius > canvas.height) {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.dx = 2;
        ball.dy = -2;
    }

    // Clear canvas and redraw
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.fillRect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();

    requestAnimationFrame(update);
}

update();