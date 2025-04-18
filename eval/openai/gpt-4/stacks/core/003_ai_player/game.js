let canvas = document.getElementById('pongCanvas');
let ctx = canvas.getContext('2d');

// Paddle parameters
let paddleWidth = 100;
let paddleHeight = 10;
let playerPaddleX = (canvas.width/2 - paddleWidth)/2;
let aiPaddleX = (canvas.width/2 - paddleWidth)/2 + canvas.width/2;

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

// AI movement
function aiMovement() {
    let paddleMiddle = aiPaddleX + (paddleWidth/2);
    if(paddleMiddle - x < -75) {
        if(aiPaddleX + paddleWidth < canvas.width){
            aiPaddleX += 2;
        }
    } else if(paddleMiddle - x > 75){
        if(aiPaddleX > 0){
            aiPaddleX -= 2;
        }
    }
}

// Animation
function draw() {

    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // draw player's paddle
    ctx.beginPath();
    ctx.rect(playerPaddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();

    // draw AI's paddle
    ctx.beginPath();
    ctx.rect(aiPaddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();

    // draw ball
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();

    // ball and wall collision detection
    if (x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }

    // ball and paddle collision detection
    if(y + dy > canvas.height-ballRadius) {
        if (x > playerPaddleX && x < playerPaddleX + paddleWidth) {
            dy = -dy;
            score++;
            scoreDisplay.textContent = "Score: " + score;
        } else if (x > aiPaddleX && x < aiPaddleX + paddleWidth) {
            dy = -dy;
        } else {
            x = canvas.width/2;
            y = canvas.height-30;
            dy = -dy;
        }
    }

    // paddle movement
    if (rightPressed && playerPaddleX < canvas.width-paddleWidth) {
        playerPaddleX += 7;
    } else if (leftPressed && playerPaddleX >0) {
        playerPaddleX -= 7;
    }

    // AI paddle movement
    aiMovement();

    // ball movement
    x += dx;
    y += dy;

    // animate
    requestAnimationFrame(draw);

}

// start game
draw();