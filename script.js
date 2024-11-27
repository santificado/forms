const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Definir as dimensões do canvas com base na tela
canvas.width = window.innerWidth < 480 ? window.innerWidth - 20 : 480;
canvas.height = window.innerHeight * 0.6;

let ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;

let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

let rightPressed = false;
let leftPressed = false;

let brickRowCount = 3;
let brickColumnCount = 5;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;

let bricks = []; // A matriz de tijolos
let currentLevel = 1;

let score = 0;
let lives = 3;
let gameInterval;
let powerUpActive = false;

const scoreDisplay = document.getElementById("scoreDisplay");
const livesDisplay = document.getElementById("livesDisplay");
const levelDisplay = document.getElementById("levelDisplay");
const gameOverMessage = document.getElementById("gameOverMessage");
const restartBtn = document.getElementById("restartBtn");

const collisionSound = new Audio("collision.mp3");
const breakSound = new Audio("break.mp3");
const winSound = new Audio("win.mp3");
const loseSound = new Audio("lose.mp3");

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
restartBtn.addEventListener("click", restartGame);

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

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD"; // Cor padrão para a bola
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD"; // Cor padrão para a raquete
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            let b = bricks[c][r];
            if (b.status == 1) {
                let brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                let brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                b.x = brickX;
                b.y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#4CAF50"; // Cor padrão para os tijolos
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            let b = bricks[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0; // Tijolo destruído
                    score += 10;
                    breakSound.play();
                    if (score === brickRowCount * brickColumnCount * 10) {
                        levelUp();
                    }
                }
            }
        }
    }
}

function levelUp() {
    currentLevel++;
    brickRowCount = Math.min(5, brickRowCount + 1);
    brickColumnCount = Math.min(7, brickColumnCount + 1);
    dx += 0.5;
    dy += 0.5;
    resetBricks();
    winSound.play();
}

function resetBricks() {
    bricks = [];
    for (let c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (let r = 0; r < brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1 }; // Inicializa todos os tijolos como ativos (status = 1)
        }
    }
}

function updateScore() {
    scoreDisplay.textContent = `Pontos: ${score}`;
    livesDisplay.textContent = `Vidas: ${lives}`;
    levelDisplay.textContent = `Nível: ${currentLevel}`;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas

    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection();

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
        collisionSound.play();
    }
    if (y + dy < ballRadius) {
        dy = -dy;
        collisionSound.play();
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
            collisionSound.play();
        } else {
            lives--;
            if (lives === 0) {
                gameOver();
            } else {
                resetBall();
            }
        }
    }

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    x += dx;
    y += dy;
    updateScore();
}

function gameOver() {
    gameOverMessage.style.display = "block";
    loseSound.play();
    clearInterval(gameInterval);
}

function resetBall() {
    x = canvas.width / 2;
    y = canvas.height - 30;
    dx = 2;
    dy = -2;
}

function restartGame() {
    gameOverMessage.style.display = "none";
    score = 0;
    lives = 3;
    currentLevel = 1;
    updateScore();
    resetBall();
    resetBricks();
    gameInterval = setInterval(draw, 10);
}

// Definir variáveis para os controles de toque
let touchStartX = 0;
let touchEndX = 0;

// Detectar o movimento de toque para controlar a raquete
document.addEventListener("touchstart", touchStartHandler, false);
document.addEventListener("touchmove", touchMoveHandler, false);

function touchStartHandler(e) {
    touchStartX = e.touches[0].clientX; // Posição inicial do toque
}

function touchMoveHandler(e) {
    touchEndX = e.touches[0].clientX; // Posição final do toque

    let deltaX = touchEndX - touchStartX;

    // Atualizar a posição da raquete de acordo com o movimento do toque
    if (deltaX > 0 && paddleX < canvas.width - paddleWidth) {
        paddleX += 7; // Mover para a direita
    } else if (deltaX < 0 && paddleX > 0) {
        paddleX -= 7; // Mover para a esquerda
    }

    touchStartX = touchEndX; // Atualiza a posição inicial do toque
}

resetBricks(); // Inicializa os tijolos
gameInterval = setInterval(draw, 10);
