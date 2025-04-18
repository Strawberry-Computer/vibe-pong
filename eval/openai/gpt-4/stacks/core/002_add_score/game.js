let canvas = document.getElementById('pongCanvas');
let ctx = canvas.getContext('2d');

// Paddle parameters
let paddleWidth = 100;
let paddleHeight = 10;
let paddleX = (canvas.width - paddleWidth) / 2;

// Ball parameters
let x = canvas.width/2;
let y = canvas.height-30;
let dx = 2;
let dy = -2;
let ballRadius = 10;

// Key press events
let rightPressed = false;
let leftPressed = false;

// Score
let score = 0;
let scoreDisplay = document.getElementById('score');

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

// Animation
function draw() {

    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw paddle
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.closePath();

    // draw ball
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.closePath();

    // ball and wall collision detection
    if (x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height-paddleHeight) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
            score++;
            scoreDisplay.textContent = "Score: " + score;
        } else {
            x = canvas.width/2;
            y = canvas.height-30;
            dy = -dy;
        }
    }

    // paddle movement
    if (rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    // ball movement
    x += dx;
    y += dy;

    // animate
    requestAnimationFrame(draw);

}

// start game
draw();