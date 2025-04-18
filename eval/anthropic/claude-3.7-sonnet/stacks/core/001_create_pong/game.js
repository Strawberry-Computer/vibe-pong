document.addEventListener('DOMContentLoaded', () => {
    // Canvas setup
    const canvas = document.getElementById('pongCanvas');
    const ctx = canvas.getContext('2d');
    
    // Game variables
    const paddleWidth = 100;
    const paddleHeight = 10;
    const ballRadius = 10;
    const paddleSpeed = 8;
    
    // Game objects
    const ball = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        dx: 4,
        dy: -4,
        radius: ballRadius
    };
    
    const paddle = {
        x: canvas.width / 2 - paddleWidth / 2,
        y: canvas.height - paddleHeight - 10,
        width: paddleWidth,
        height: paddleHeight,
        speed: paddleSpeed,
        isMovingLeft: false,
        isMovingRight: false
    };
    
    // Key event handlers
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') paddle.isMovingLeft = true;
        if (e.key === 'ArrowRight') paddle.isMovingRight = true;
    });
    
    document.addEventListener('keyup', (e) => {
        if (e.key === 'ArrowLeft') paddle.isMovingLeft = false;
        if (e.key === 'ArrowRight') paddle.isMovingRight = false;
    });
    
    // Draw functions
    function drawBall() {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.closePath();
    }
    
    function drawPaddle() {
        ctx.beginPath();
        ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.closePath();
    }
    
    // Update game state
    function update() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw objects
        drawBall();
        drawPaddle();
        
        // Move paddle
        if (paddle.isMovingLeft && paddle.x > 0) {
            paddle.x -= paddle.speed;
        }
        
        if (paddle.isMovingRight && paddle.x + paddle.width < canvas.width) {
            paddle.x += paddle.speed;
        }
        
        // Ball collision with top and sides
        if (ball.y - ball.radius <= 0) {
            ball.dy = -ball.dy; // Top collision
        }
        
        if (ball.x + ball.radius >= canvas.width || ball.x - ball.radius <= 0) {
            ball.dx = -ball.dx; // Side collision
        }
        
        // Ball collision with paddle
        if (ball.y + ball.radius >= paddle.y &&
            ball.x >= paddle.x && 
            ball.x <= paddle.x + paddle.width) {
            ball.dy = -ball.dy;
        }
        
        // Ball hits bottom (missed the paddle)
        if (ball.y + ball.radius >= canvas.height) {
            // Reset ball position
            ball.x = canvas.width / 2;
            ball.y = canvas.height / 2;
            // Randomize direction slightly
            ball.dx = (Math.random() > 0.5 ? 1 : -1) * 4;
            ball.dy = -4;
        }
        
        // Move ball
        ball.x += ball.dx;
        ball.y += ball.dy;
        
        // Continue animation
        requestAnimationFrame(update);
    }
    
    // Start the game loop
    update();
});