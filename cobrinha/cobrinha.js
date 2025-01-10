// ** Snake Game by Dev.LipeBlack

// ** Captura de Elementos do documento para manipulação via JS
const menu = document.getElementById("gameMenu"); // ?? menu do jogo
const gameArea = document.getElementById("gameArea"); // ?? Area do jogo
const canvas = document.getElementById("gameCanvas"); // ?? tela do jogo
const startButton = document.getElementById("startGame"); // ?? botão jogar
const playerNameInput = document.getElementById("playerName"); // ?? input do nome do jogador
const scoreDisplay = document.getElementById("scoreDisplay"); // ?? visualização da pontuação do jogador
const highScoreDisplay = document.getElementById("highScoreDisplay"); // ?? maior record

// ** Click no botão de jogar
startButton.addEventListener("click", () => {
  // ?? validação de nome do jogador
  const playerName = playerNameInput.value.trim();
  if (!playerName) {
    alert("Por Favor, insira um nome!!");
    return;
  }

  menu.style.display = "none"; // ?? menu some
  gameArea.style.display = "block"; // ?? Area do jogo aparece


  let score = 0; // ?? pontuação atual
  scoreDisplay.textContent = `Jogador ${playerName} | Pontuação: ${score}`; // ?? exibição da pontuação
  highScoreDisplay.textContent = `Maior Recorde: ${getHighScore()}`; // ?? exibição do maior recorde

  // ?? Criando um "contexto" dentro do quadro/tela(canvas) do jogo
  const ctx = canvas.getContext("2d");

  // ?? tamanho da tela do jogo
  canvas.width = 400;
  canvas.height = 400;

  // ?? Definição dos arquivos de audio dos efeitos do jogo
  const audioDirectional = new Audio("./Button Click - Sound Effect.mp3");
  const eatingAudio = new Audio(
    "./Felipe Hendeson - eating soando snake 2025-01-07 22_48.m4a"
  );
  const gameOverAudio = new Audio(
    "./Felipe Hendeson - FimDeJogo 2025-01-07 22_59.m4a"
  );

  // ** Dados sobre o jogo
  let snake = [{ x: 200, y: 200 }]; // ?? Posição inicial da cobra, centro da tela do jogo
  let snakeDirection = { x: 20, y: 0 }; // ?? Direção inicial em que a cobra se move
  let snakeFood = { x: 100, y: 100 }; // ?? posição inicial da comida
  let gameInterval; // ?? o jogo atualmente roda em cima de um intervalo de tempo que cria e destroi a tela fazendo os movimentos

  // ** Função que desenha os objetos em tela, usada para desenhar as comidas e a cobra
  function drawObject(objColor, x, y, objSize) {
    ctx.fillStyle = objColor;
    ctx.fillRect(x, y, objSize, objSize);
  }

  // ** Realiza a atualização dos objetos do jogo, como a cobra e a fruta, durante o loop do jogo
  function updateGameObjects() {
    ctx.fillStyle = "#006400";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawObject("red", snakeFood.x, snakeFood.y, 20);

    snake.forEach((segment) => drawObject("lime", segment.x, segment.y, 20));
  }
  // ** Atualiza a posição da cobra
  function updateSnakePosition() {
    const head = {
      x: snake[0].x + snakeDirection.x,
      y: snake[0].y + snakeDirection.y,
    };
    snake.unshift(head);

    if (
      snake[0].x < 0 ||
      snake[0].y < 0 ||
      snake[0].x >= canvas.width ||
      snake[0].y >= canvas.height
    ) {
      updateHighScores(playerName, score);
      gameOverAudio.volume = 0.5;
      gameOverAudio.play();
      alert("Fim de Jogo!");
      clearInterval(gameInterval); // ?? Em caso de derrota interrompe o fluxo do jogo
      return;
    }

    // ?? Desenha a comida aleatoriamente pela tela após comer e marca os pontos
    if (head.x === snakeFood.x && head.y === snakeFood.y) {
      score += 10;
      scoreDisplay.textContent = `Jogador: ${playerName} | Pontuação: ${score}`;
      snakeFood = {
        x: Math.floor((Math.random() * canvas.width) / 20) * 20,
        y: Math.floor((Math.random() * canvas.height) / 20) * 20,
      };
      eatingAudio.currentTime = 0;
      eatingAudio.volume = 0.5;
      eatingAudio.play();
    } else {
      snake.pop();
    }
  }

  // ** Traz as pontuações do storage do jogador
  function getHighScore() {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    return highScores.length ? highScores[0].score : 0;
  }

  // ** Atualiza a pontuação do jogador
  function updateHighScores(name, score) {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push({ name, score });
    highScores.sort((a, b) => b.score - a.score);
    if (highScores.length > 10) highScores.pop();
    localStorage.setItem("highScores", JSON.stringify(highScores));
  }

  function startGameLoop() {
    updateSnakePosition();
    updateGameObjects();
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" && snakeDirection.y === 0) {
      snakeDirection = { x: 0, y: -20 };
      audioDirectional.currentTime = 0;
      audioDirectional.volume = 0.5;
      audioDirectional.play();
    }
    if (e.key === "ArrowDown" && snakeDirection.y === 0) {
      snakeDirection = { x: 0, y: 20 };
      audioDirectional.currentTime = 0;
      audioDirectional.volume = 0.5;
      audioDirectional.play();
    }
    if (e.key === "ArrowLeft" && snakeDirection.x === 0) {
      snakeDirection = { x: -20, y: 0 };
      audioDirectional.currentTime = 0;
      audioDirectional.volume = 0.5;
      audioDirectional.play();
    }
    if (e.key === "ArrowRight" && snakeDirection.x === 0) {
      snakeDirection = { x: 20, y: 0 };
      audioDirectional.currentTime = 0;
      audioDirectional.volume = 0.5;
      audioDirectional.play();
    }
  });

  gameInterval = setInterval(startGameLoop, 150);
});
