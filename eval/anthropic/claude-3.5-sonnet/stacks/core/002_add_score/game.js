const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

const paddle = {
    x: 20,
    y: canvas.height / 2 - 50,
    width: 10,
    height: 100,
    speed: 5
};

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    dx: 4,
    dy: -4
};

// PROMPT: Add score tracking
const score = {
    player: 0,
    computer: 0
};

document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowUp' && paddle.y > 0) {
        paddle.y -= paddle.speed;
    }
    if (e.key === 'ArrowDown' && paddle.y < canvas.height - paddle.height) {
        paddle.y += paddle.speed;
    }
});

function update() {
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy *= -1;
    }
    if (ball.x + ball.radius > canvas.width) {
        ball.dx *= -1;
        // PROMPT: Add point when ball hits right wall
        score.player += 1;
    }

    if (ball.x - ball.radius < paddle.x + paddle.width &&
        ball.y > paddle.y &&
        ball.y < paddle.y + paddle.height) {
        ball.dx *= -1;
    }

    // PROMPT: Add point for computer when ball hits left wall
    if (ball.x - ball.radius < 0) {
        score.computer += 1;
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
    }

    ball.x += ball.dx;
    ball.y += ball.dy;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // PROMPT: Draw score display
    ctx.font = '48px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText(score.player, canvas.width/4, 50);
    ctx.fillText(score.computer, 3*canvas.width/4, 50);
    
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();

    // PROMPT: Draw center line
    ctx.setLineDash([5, 15]);
    ctx.beginPath();
    ctx.moveTo(canvas.width/2, 0);
    ctx.lineTo(canvas.width/2, canvas.height);
    ctx.strokeStyle = 'white';
    ctx.stroke();
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();