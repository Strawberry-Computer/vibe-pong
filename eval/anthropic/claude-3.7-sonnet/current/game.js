document.addEventListener('DOMContentLoaded', () => {
    // Canvas setup
    const canvas = document.getElementById('pongCanvas');
    const ctx = canvas.getContext('2d');
    
    // Score element
    const scoreElement = document.getElementById('score');
    let score = 0;
    
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
    
    const userPaddle = {
        x: canvas.width / 2 - paddleWidth / 2,
        y: canvas.height - paddleHeight - 10,
        width: paddleWidth,
        height: paddleHeight,
        speed: paddleSpeed,
        isMovingLeft: false,
        isMovingRight: false
    };
    
    const aiPaddle = {
        x: canvas.width / 2 - paddleWidth / 2,
        y: 20, // Position at the top with a small gap
        width: paddleWidth,
        height: paddleHeight,
        speed: 5 // Slightly slower than player for fairness
    };
    
    // Key event handlers
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') userPaddle.isMovingLeft = true;
        if (e.key === 'ArrowRight') userPaddle.isMovingRight = true;
    });
    
    document.addEventListener('keyup', (e) => {
        if (e.key === 'ArrowLeft') userPaddle.isMovingLeft = false;
        if (e.key === 'ArrowRight') userPaddle.isMovingRight = false;
    });
    
    // Update score display
    function updateScoreDisplay() {
        scoreElement.textContent = `Score: ${score}`;
    }
    
    // AI movement logic
    function moveAiPaddle() {
        // Calculate the paddle center
        const paddleCenter = aiPaddle.x + aiPaddle.width / 2;
        
        // Add a small reaction delay/error for more human-like behavior
        const reactionError = 25;
        
        // Move the paddle towards the ball with some error margin
        if (paddleCenter < ball.x - reactionError && aiPaddle.x + aiPaddle.width < canvas.width) {
            aiPaddle.x += aiPaddle.speed;
        } else if (paddleCenter > ball.x + reactionError && aiPaddle.x > 0) {
            aiPaddle.x -= aiPaddle.speed;
        }
    }
    
    // Draw functions
    function drawBall() {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.closePath();
    }
    
    function drawUserPaddle() {
        ctx.beginPath();
        ctx.rect(userPaddle.x, userPaddle.y, userPaddle.width, userPaddle.height);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.closePath();
    }
    
    function drawAiPaddle() {
        ctx.beginPath();
        ctx.rect(aiPaddle.x, aiPaddle.y, aiPaddle.width, aiPaddle.height);
        ctx.fillStyle = 'red'; // Different color to distinguish AI paddle
        ctx.fill();
        ctx.closePath();
    }
    
    // Update game state
    function update() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw objects
        drawBall();
        drawUserPaddle();
        drawAiPaddle();
        
        // Update score display
        updateScoreDisplay();
        
        // Move user paddle
        if (userPaddle.isMovingLeft && userPaddle.x > 0) {
            userPaddle.x -= userPaddle.speed;
        }
        
        if (userPaddle.isMovingRight && userPaddle.x + userPaddle.width < canvas.width) {
            userPaddle.x += userPaddle.speed;
        }
        
        // Move AI paddle
        moveAiPaddle();
        
        // Ball collision with sides
        if (ball.x + ball.radius >= canvas.width || ball.x - ball.radius <= 0) {
            ball.dx = -ball.dx; // Side collision
        }
        
        // Ball collision with AI paddle (top paddle)
        if (ball.y - ball.radius <= aiPaddle.y + aiPaddle.height &&
            ball.x >= aiPaddle.x && 
            ball.x <= aiPaddle.x + aiPaddle.width &&
            ball.dy < 0) {
            ball.dy = -ball.dy;
        }
        
        // Ball collision with user paddle (bottom paddle)
        if (ball.y + ball.radius >= userPaddle.y &&
            ball.x >= userPaddle.x && 
            ball.x <= userPaddle.x + userPaddle.width &&
            ball.dy > 0) {
            ball.dy = -ball.dy;
            score++; // Increment score when ball hits user paddle
        }
        
        // Ball hits bottom (missed by user)
        if (ball.y + ball.radius >= canvas.height) {
            // Reset ball position
            ball.x = canvas.width / 2;
            ball.y = canvas.height / 2;
            // Randomize direction slightly
            ball.dx = (Math.random() > 0.5 ? 1 : -1) * 4;
            ball.dy = -4;
            // Note: We don't reset the score when the ball is missed
        }
        
        // Ball hits top (missed by AI)
        if (ball.y - ball.radius <= 0) {
            // Reset ball position
            ball.x = canvas.width / 2;
            ball.y = canvas.height / 2;
            // Randomize direction slightly
            ball.dx = (Math.random() > 0.5 ? 1 : -1) * 4;
            ball.dy = 4; // Start moving downward
            score += 2; // Bonus points when AI misses
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