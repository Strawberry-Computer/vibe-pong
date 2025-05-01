document.addEventListener('DOMContentLoaded', () => {
    // PROMPT: Use `<canvas width="800" height="400" id="pongCanvas">`
    const canvas = document.getElementById('pongCanvas');
    const ctx = canvas.getContext('2d');

    // PROMPT: Add score display
    let score = 0;

    // PROMPT: Draw a white paddle (10px wide, 100px high) at the left side of the canvas
    const paddle = {
        x: 20,
        y: canvas.height / 2 - 50,
        width: 10,
        height: 100,
        speed: 8,
        dy: 0
    };

    // PROMPT: Add AI Player to Pong
    const aiPaddle = {
        x: canvas.width - 30,
        y: canvas.height / 2 - 50,
        width: 10,
        height: 100,
        speed: 5
    };

    // PROMPT: Draw a white ball (10px radius) starting at canvas center, moving diagonally with constant speed
    const ball = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: 10,
        dx: 5,
        dy: -5
    };

    // PROMPT: movable up/down with arrow keys
    const keys = {
        ArrowUp: false,
        ArrowDown: false
    };

    // PROMPT: movable up/down with arrow keys
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

    // PROMPT: Draw a white paddle
    function drawPaddle() {
        ctx.fillStyle = '#fff';
        ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
        // PROMPT: Add AI Player to Pong
        ctx.fillRect(aiPaddle.x, aiPaddle.y, aiPaddle.width, aiPaddle.height);
    }

    // PROMPT: Draw a white ball
    function drawBall() {
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fill();
    }

    // PROMPT: Add score display
    function drawScore() {
        ctx.fillStyle = '#fff';
        ctx.font = '24px Arial';
        ctx.fillText(`Score: ${score}`, canvas.width - 150, 30);
    }

    // PROMPT: movable up/down with arrow keys
    function movePaddle() {
        paddle.dy = 0;
        if (keys.ArrowUp) {
            paddle.dy = -paddle.speed;
        }
        if (keys.ArrowDown) {
            paddle.dy = paddle.speed;
        }

        paddle.y += paddle.dy;

        // Prevent paddle from moving off canvas
        if (paddle.y < 0) {
            paddle.y = 0;
        }
        if (paddle.y + paddle.height > canvas.height) {
            paddle.y = canvas.height - paddle.height;
        }
    }

    // PROMPT: Add AI Player to Pong
    function moveAiPaddle() {
        // Simple AI: follow the ball
        const paddleCenter = aiPaddle.y + aiPaddle.height / 2;
        if (paddleCenter < ball.y - 10) {
            aiPaddle.y += aiPaddle.speed;
        } else if (paddleCenter > ball.y + 10) {
            aiPaddle.y -= aiPaddle.speed;
        }

        // Prevent AI paddle from moving off canvas
        if (aiPaddle.y < 0) {
            aiPaddle.y = 0;
        }
        if (aiPaddle.y + aiPaddle.height > canvas.height) {
            aiPaddle.y = canvas.height - aiPaddle.height;
        }
    }

    // PROMPT: moving diagonally with constant speed
    function moveBall() {
        ball.x += ball.dx;
        ball.y += ball.dy;
    }

    // PROMPT: Bounce the ball off the top and side walls
    function checkBallCollision() {
        // Top wall collision
        if (ball.y - ball.radius < 0) {
            ball.dy = Math.abs(ball.dy);
        }
        
        // Bottom wall collision
        if (ball.y + ball.radius > canvas.height) {
            ball.dy = -Math.abs(ball.dy);
        }
        
        // Left wall collision (reset)
        if (ball.x - ball.radius < 0) {
            ball.x = canvas.width / 2;
            ball.y = canvas.height / 2;
            ball.dx = 5;
            ball.dy = -5;
            score = 0; // Reset score when ball is missed
        }

        // Right wall collision (removed as we now have AI paddle)

        // PROMPT: Detect paddle collision to bounce the ball back up
        if (
            ball.x - ball.radius < paddle.x + paddle.width &&
            ball.x - ball.radius > paddle.x &&
            ball.y > paddle.y &&
            ball.y < paddle.y + paddle.height
        ) {
            ball.dx = Math.abs(ball.dx);
            // PROMPT: Add score display
            score++; // Increase score when paddle hits the ball
        }

        // PROMPT: Add AI Player to Pong
        if (
            ball.x + ball.radius > aiPaddle.x &&
            ball.x + ball.radius < aiPaddle.x + aiPaddle.width &&
            ball.y > aiPaddle.y &&
            ball.y < aiPaddle.y + aiPaddle.height
        ) {
            ball.dx = -Math.abs(ball.dx);
        }
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // PROMPT: Use requestAnimationFrame for smooth animation
    function update() {
        clearCanvas();
        
        movePaddle();
        // PROMPT: Add AI Player to Pong
        moveAiPaddle();
        moveBall();
        checkBallCollision();
        
        drawPaddle();
        drawBall();
        // PROMPT: Add score display
        drawScore();
        
        requestAnimationFrame(update);
    }

    // Start the game loop
    update();
});