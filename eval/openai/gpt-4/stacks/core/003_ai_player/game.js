// PROMPT: Basic structure with a canvas element (id="pongCanvas", 800x400px)
let canvas = document.getElementById('pongCanvas');
let ctx = canvas.getContext('2d');

// PROMPT: Initialize a score variable starting at 0
let scoreDom = document.getElementById('score');

let paddleWidth = 100, paddleHeight = 10;
let paddleX = (canvas.width - paddleWidth) / 2;
let ballRadius = 10;

// PROMPT: Draw a white ball starting at canvas center
let x = canvas.width / 2, y = canvas.height - 30;
let dx = 2, dy = -2;

// PROMPT: Initialize a score variable starting at 0
let score = 0;

// draw a white paddle at the bottom
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight); 
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.closePath();
}

// draw a white ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);  
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();

    // bounce the ball off the side walls
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;  
    }
    // bounce the ball off the top wall
    if(y + dy < ballRadius) {
        dy = -dy;  
    }
    else if(y + dy > canvas.height-ballRadius) {
      
        if(x > paddleX && x < paddleX + paddleWidth) {
            // detect paddle collision to bounce the ball back up
            dy = -dy;  

            // Increment the score when the ball hits the paddle.
            score++;

            // Update the score display in the DOM each frame.
            scoreDom.innerHTML = 'Score: ' + score;
        }
        else {
            // reset ball to center if it hits the bottom
            x = canvas.width / 2;
            y = canvas.height / 2;

            // Reset the ball to the center (with random x-direction) when it misses the paddle (hits bottom), without resetting the score.
            dx = (Math.random() * 2 - 1) * 2;            
        }
    }

    x += dx;
    y += dy;

    // Use requestAnimationFrame for smooth animation
    requestAnimationFrame(draw);  
}

draw();