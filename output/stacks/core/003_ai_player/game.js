document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('pongCanvas');
    const ctx = canvas.getContext('2d');
    const scoreElement = document.getElementById('score');

    // Game constants
    const PADDLE_WIDTH = 100;
    const PADDLE_HEIGHT = 10;
    const BALL_RADIUS = 10;
    const BALL_SPEED = 5;
    const AI_SPEED = 4; // Speed of AI paddle movement

    // Game state
    let playerPaddleX = (canvas.width - PADDLE_WIDTH) / 2;
    let aiPaddleX = (canvas.width - PADDLE_WIDTH) / 2;
    let ballX = canvas.width / 2;
    let ballY = canvas.height / 2;
    let ballDX = BALL_SPEED;
    let ballDY = -BALL_SPEED;
    let score = 0;
    
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

    // Update score display
    function updateScore() {
        scoreElement.textContent = `Score: ${score}`;
    }

    // Draw objects
    function drawPlayerPaddle() {
        ctx.beginPath();
        ctx.rect(playerPaddleX, canvas.height - PADDLE_HEIGHT, PADDLE_WIDTH, PADDLE_HEIGHT);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.closePath();
    }

    function drawAIPaddle() {
        ctx.beginPath();
        ctx.rect(aiPaddleX, 0, PADDLE_WIDTH, PADDLE_HEIGHT);
        ctx.fillStyle = 'red'; // Different color for AI paddle
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

    // Reset ball to center with random x direction
    function resetBall() {
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        // Random x direction (left or right)
        ballDX = Math.random() > 0.5 ? BALL_SPEED : -BALL_SPEED;
        ballDY = -BALL_SPEED;
    }

    // AI movement logic
    function moveAI() {
        // Simple AI that tries to follow the ball
        const paddleCenter = aiPaddleX + PADDLE_WIDTH / 2;
        
        // Add some difficulty by limiting AI's perfect tracking
        if (paddleCenter < ballX - 10) {
            aiPaddleX += AI_SPEED;
        } else if (paddleCenter > ballX + 10) {
            aiPaddleX -= AI_SPEED;
        }
        
        // Keep AI paddle within canvas bounds
        if (aiPaddleX < 0) {
            aiPaddleX = 0;
        } else if (aiPaddleX > canvas.width - PADDLE_WIDTH) {
            aiPaddleX = canvas.width - PADDLE_WIDTH;
        }
    }

    // Update game logic
    function update() {
        // Move player paddle based on keyboard input
        if (keys.rightPressed && playerPaddleX < canvas.width - PADDLE_WIDTH) {
            playerPaddleX += 7;
        } else if (keys.leftPressed && playerPaddleX > 0) {
            playerPaddleX -= 7;
        }

        // Move AI paddle
        moveAI();

        // Move ball
        ballX += ballDX;
        ballY += ballDY;

        // Ball collision with walls
        if (ballX + ballDX > canvas.width - BALL_RADIUS || ballX + ballDX < BALL_RADIUS) {
            ballDX = -ballDX;
        }
        
        // Ball collision with top AI paddle
        if (
            ballY - BALL_RADIUS < PADDLE_HEIGHT &&
            ballX > aiPaddleX && 
            ballX < aiPaddleX + PADDLE_WIDTH
        ) {
            ballDY = -ballDY;
            // Make ball move faster after hitting AI paddle to increase difficulty
            if (Math.abs(ballDY) < 10) {
                ballDY *= 1.05;
                ballDX *= 1.05;
            }
        }
        
        // Ball collision with player paddle
        if (
            ballY + BALL_RADIUS > canvas.height - PADDLE_HEIGHT &&
            ballX > playerPaddleX && 
            ballX < playerPaddleX + PADDLE_WIDTH
        ) {
            ballDY = -ballDY;
            // Increment score when ball hits player paddle
            score++;
            updateScore();
        }
        
        // Ball hits bottom (player miss)
        if (ballY + BALL_RADIUS > canvas.height) {
            // Reset ball to center with random x direction
            resetBall();
            
            // Penalty for missing
            if (score > 0) {
                score--;
                updateScore();
            }
        }
        
        // Ball hits top (AI miss, should be rare)
        if (ballY - BALL_RADIUS < 0) {
            // Reset ball
            resetBall();
            ballDY = Math.abs(ballDY); // Ensure the ball moves down
            
            // Bonus points for getting past AI
            score += 3;
            updateScore();
        }
    }

    // Main game loop
    function gameLoop() {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw game objects
        drawPlayerPaddle();
        drawAIPaddle();
        drawBall();
        
        // Update game state
        update();
        
        // Continue animation
        requestAnimationFrame(gameLoop);
    }

    // Initialize score display
    updateScore();

    // Start the game loop
    gameLoop();
});