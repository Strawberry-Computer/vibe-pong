document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('pongCanvas');
    const ctx = canvas.getContext('2d');

    // Game constants
    const PADDLE_WIDTH = 100;
    const PADDLE_HEIGHT = 10;
    const BALL_RADIUS = 10;
    const BALL_SPEED = 5;

    // Game state
    let paddleX = (canvas.width - PADDLE_WIDTH) / 2;
    let ballX = canvas.width / 2;
    let ballY = canvas.height / 2;
    let ballDX = BALL_SPEED;
    let ballDY = -BALL_SPEED;
    
    // Keyboard state
    const keys = {
        rightPressed: false,
        leftPressed: false
    };

    // Event listeners for keyboard
    document.addEventListener('keydown', keyDownHandler);
    document.addEventListener('keyup', keyUpHandler);

    function keyDownHandler(e) {
        if (e.key === 'Right' || e.key === 'ArrowRight') {
            keys.rightPressed = true;
        } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
            keys.leftPressed = true;
        }
    }

    function keyUpHandler(e) {
        if (e.key === 'Right' || e.key === 'ArrowRight') {
            keys.rightPressed = false;
        } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
            keys.leftPressed = false;
        }
    }

    // Draw objects
    function drawPaddle() {
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height - PADDLE_HEIGHT, PADDLE_WIDTH, PADDLE_HEIGHT);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.closePath();
    }

    function drawBall() {
        ctx.beginPath();
        ctx.arc(ballX, ballY, BALL_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.closePath();
    }

    // Update game logic
    function update() {
        // Move paddle based on keyboard input
        if (keys.rightPressed && paddleX < canvas.width - PADDLE_WIDTH) {
            paddleX += 7;
        } else if (keys.leftPressed && paddleX > 0) {
            paddleX -= 7;
        }

        // Move ball
        ballX += ballDX;
        ballY += ballDY;

        // Ball collision with walls
        if (ballX + ballDX > canvas.width - BALL_RADIUS || ballX + ballDX < BALL_RADIUS) {
            ballDX = -ballDX;
        }
        
        // Ball collision with top
        if (ballY + ballDY < BALL_RADIUS) {
            ballDY = -ballDY;
        }
        
        // Ball collision with paddle
        if (
            ballY + ballDY > canvas.height - PADDLE_HEIGHT - BALL_RADIUS &&
            ballX > paddleX && 
            ballX < paddleX + PADDLE_WIDTH
        ) {
            ballDY = -ballDY;
        }
        
        // Ball hits bottom (miss)
        if (ballY + ballDY > canvas.height - BALL_RADIUS) {
            // Reset ball to center
            ballX = canvas.width / 2;
            ballY = canvas.height / 2;
            ballDX = BALL_SPEED;
            ballDY = -BALL_SPEED;
        }
    }

    // Main game loop
    function gameLoop() {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw game objects
        drawPaddle();
        drawBall();
        
        // Update game state
        update();
        
        // Continue animation
        requestAnimationFrame(gameLoop);
    }

    // Start the game loop
    gameLoop();
});