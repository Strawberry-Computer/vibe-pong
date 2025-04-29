let canvas = document.getElementById('pongCanvas');  <!-- PROMPT: Basic structure with a canvas element -->
let ctx = canvas.getContext('2d');

let paddleWidth = 100, paddleHeight = 10;
let paddleX = (canvas.width - paddleWidth) / 2;
let ballRadius = 10;
let x = canvas.width / 2, y = canvas.height - 30;  <!-- PROMPT: Draw a white ball starting at canvas center -->
let dx = 2, dy = -2;

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);  <!-- PROMPT: Draw a white paddle at the bottom -->
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.closePath();
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);  <!-- PROMPT: Draw a white ball -->
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();

    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;  <!-- PROMPT: bounce the ball off the side walls -->
    }
    if(y + dy < ballRadius) {
        dy = -dy;  <!-- PROMPT: bounce the ball off the top wall -->
    }
    else if(y + dy > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;  <!-- PROMPT: detect paddle collision to bounce the ball back up -->
        }
        else {
            x = canvas.width / 2;
            y = canvas.height / 2;  <!-- PROMPT: reset ball to center if it hits the bottom -->
        }
    }

    x += dx;
    y += dy;

    requestAnimationFrame(draw);  <!-- PROMPT: Use requestAnimationFrame for smooth animation -->
}

draw();