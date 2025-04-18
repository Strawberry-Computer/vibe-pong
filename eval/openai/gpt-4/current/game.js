var canvas = document.getElementById("pongCanvas");
var ctx = canvas.getContext("2d");

var paddleWidth = 100;
var paddleHeight = 10;
var playerPaddleX = (canvas.width - paddleWidth) / 2;
var aiPaddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;

var ballRadius = 10;
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;

var score = 0;
var scoreDisplay = document.getElementById("score");

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

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(playerPaddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.rect(aiPaddleX, 0, paddleWidth, paddleHeight); //draw ai paddle
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.closePath();
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle();
    drawBall();
    x += dx;
    y += dy;

    // ai paddle motion
    if (x < aiPaddleX) {
        aiPaddleX -= 4;
    }
    if (x > aiPaddleX + paddleWidth) {
        aiPaddleX += 4;
    }

    if (y + dy < ballRadius) {
        if (x > aiPaddleX && x < aiPaddleX + paddleWidth) {
            dy = -dy;
        } else {
            x = canvas.width / 2;
            y = canvas.height - 30;
            dx = dx > 0 ? 2 : -2;  // reset ball x-direction
        }
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > playerPaddleX && x < playerPaddleX + paddleWidth) {
            dy = -dy;
            score++;
            scoreDisplay.innerHTML = "Score: " + score;
        } else {
            x = canvas.width / 2;
            y = canvas.height - 30;
            dx = dx > 0 ? 2 : -2;  // reset ball x-direction
        }
    }

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }

    if (rightPressed && playerPaddleX < canvas.width - paddleWidth) {
        playerPaddleX += 7;
    } else if (leftPressed && playerPaddleX > 0) {
        playerPaddleX -= 7;
    }
    requestAnimationFrame(draw);
}

draw();