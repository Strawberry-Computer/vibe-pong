document.addEventListener('DOMContentLoaded', () => {
    // PROMPT: Use `<canvas width="800" height="400" id="pongCanvas">`
    const canvas = document.getElementById('pongCanvas');
    const ctx = canvas.getContext('2d');
    
    // PROMPT: Draw a white paddle (10px wide, 100px high) at the left side of the canvas
    const paddle = {
        x: 20,
        y: canvas.height / 2 - 50,
        width: 10,
        height: 100,
        speed: 8
    };
    
    // PROMPT: Draw a white ball (10px radius) starting at canvas center
    const ball = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: 10,
        // PROMPT: moving diagonally with constant speed
        speedX: 5,
        speedY: 5
    };
    
    // PROMPT: paddle movable up/down with arrow keys
    const keys = {
        ArrowUp: false,
        ArrowDown: false
    };
    
    document.addEventListener('keydown', (e) => {
        if (e.key in keys) {
            keys[e.key] = true;
        }
    });
    
    document.addEventListener('keyup', (e) => {
        if (e.key in keys) {
            keys[e.key] = false;
        }
    });
    
    function movePaddle() {
        if (keys.ArrowUp && paddle.y > 0) {
            paddle.y -= paddle.speed;
        }
        if (keys.ArrowDown && paddle.y + paddle.height < canvas.height) {
            paddle.y += paddle.speed;
        }
    }
    
    function moveBall() {
        ball.x += ball.speedX;
        ball.y += ball.speedY;
        
        // PROMPT: Bounce the ball off the top and side walls
        if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
            ball.speedY = -ball.speedY;
        }
        
        if (ball.x + ball.radius > canvas.width) {
            ball.speedX = -ball.speedX;
        }
        
        // PROMPT: reset to center if it hits the bottom (misses paddle)
        if (ball.x - ball.radius < 0) {
            resetBall();
        }
    }
    
    function resetBall() {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.speedX = -ball.speedX;
        ball.speedY = Math.random() > 0.5 ? 5 : -5;
    }
    
    // PROMPT: Detect paddle collision to bounce the ball back up
    function checkPaddleCollision() {
        if (
            ball.x - ball.radius < paddle.x + paddle.width &&
            ball.y > paddle.y &&
            ball.y < paddle.y + paddle.height &&
            ball.x - ball.radius > paddle.x
        ) {
            ball.speedX = -ball.speedX;
            
            // Add some randomness to the bounce
            ball.speedY = (ball.y - (paddle.y + paddle.height / 2)) / 10;
        }
    }
    
    function draw() {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // PROMPT: Draw a white paddle (10px wide, 100px high)
        ctx.fillStyle = 'white';
        ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
        
        // PROMPT: Draw a white ball (10px radius)
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.closePath();
    }
    
    // PROMPT: Use requestAnimationFrame for smooth animation
    function gameLoop() {
        movePaddle();
        moveBall();
        checkPaddleCollision();
        draw();
        requestAnimationFrame(gameLoop);
    }
    
    gameLoop();
});