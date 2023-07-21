// Armazena as cartas do jogo
const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false; // Verifica se já há uma carta virada
let lockBoard = false; // Impede que outras cartas sejam viradas durante a verificação
let firstCard, secondCard; // Armazena a primeira e a segunda carta virada
let errorCount = 0; // Contador de erros

// Função para virar uma carta e verificar se é a primeira ou segunda carta virada
function flipCard() {
  if (lockBoard) return; // Verifica se o tabuleiro está bloqueado e retorna caso verdadeiro
  if (this === firstCard) return; // Verifica se a mesma carta foi clicada duas vezes e retorna caso verdadeiro

  this.classList.add('flip'); // Adiciona a classe 'flip' para virar a carta atual

  if (!hasFlippedCard) {
    // Se não houver carta virada, vira a primeira carta
    hasFlippedCard = true; // Define a variável hasFlippedCard como true
    firstCard = this; // Armazena a referência da primeira carta virada
    return; // Retorna para encerrar a função
  }

  secondCard = this; // Armazena a referência da segunda carta virada
  checkForMatch(); // Chama a função checkForMatch() para verificar se há correspondência entre as cartas viradas
}


// Função para verificar se as duas cartas viradas são correspondentes
function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework; // Verifica se os valores dos atributos 'data-framework' das duas cartas são iguais

  if (isMatch) {
    // Se houver correspondência entre as cartas, desativa as cartas
    disableCards(); // Chama a função disableCards() para desativar as cartas viradas
  } else {
    // Se não houver correspondência, vira as cartas de volta
    unflipCards(); // Chama a função unflipCards() para virar as cartas de volta
    incrementErrorCount(); // Chama a função incrementErrorCount() para incrementar a contagem de erros
  }
}


// Função para desativar as cartas correspondentes
function disableCards() {
  firstCard.removeEventListener('click', flipCard); // Remove o evento de clique da primeira carta
  secondCard.removeEventListener('click', flipCard); // Remove o evento de clique da segunda carta

  resetBoard(); // Chama a função resetBoard() para limpar o estado do jogo
}

// Função para virar as cartas de volta se não houver correspondência
function unflipCards() {
  lockBoard = true; // Bloqueia o tabuleiro para impedir que outras cartas sejam viradas

  setTimeout(() => {
    firstCard.classList.remove('flip'); // Remove a classe 'flip' da primeira carta para virá-la de volta
    secondCard.classList.remove('flip'); // Remove a classe 'flip' da segunda carta para virá-la de volta

    resetBoard(); // Chama a função resetBoard() para limpar o estado do jogo
  }, 1500); // Aguarda 1,5 segundos antes de executar as ações para dar tempo de visualizar as cartas
}


// Função para resetar as variáveis relacionadas ao estado do jogo e embaralhar as cartas
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false]; // Reseta as variáveis hasFlippedCard e lockBoard para seus valores iniciais
  [firstCard, secondCard] = [null, null]; // Reseta as variáveis firstCard e secondCard para seus valores iniciais

  if (isGameOver()) {
    // Verifica se o jogo acabou (todas as cartas desativadas)
    gameOver();
  }
}

// Função para verificar se todas as cartas foram desativadas
function isGameOver() {
  return document.querySelectorAll('.memory-card.flip').length === cards.length; // Retorna true se o número de cartas viradas for igual ao número total de cartas
}

// Função para incrementar a variável de erro
function incrementErrorCount() {
  errorCount++; // Incrementa a contagem de erros
  displayErrorCount(); // Exibe a quantidade de erros na página
}

// Função para exibir a quantidade de erros na página
function displayErrorCount() {
  const errorCountElement = document.getElementById('error-count');
  errorCountElement.textContent = errorCount; // Atualiza o conteúdo com a quantidade de erros
}

// Função para embaralhar as cartas definindo uma ordem aleatória
function shuffleCards() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * cards.length); // Gera uma posição aleatória para a carta
    card.style.order = randomPos; // Define a ordem da carta com a posição aleatória
  });
}

// Adiciona um evento de clique a todas as cartas
cards.forEach(card => card.addEventListener('click', flipCard));

// Seleciona o elemento do botão de reset
const resetButton = document.getElementById('reset-button');

// Adiciona um evento de clique ao botão de reset
resetButton.addEventListener('click', resetGame);

// Função de reset do jogo
function resetGame() {
  cards.forEach(card => {
    card.classList.remove('flip'); // Remove a classe 'flip' de todas as cartas para desvirá-las
    card.addEventListener('click', flipCard); // Adiciona novamente o evento de clique a todas as cartas
    card.style.order = ''; // Remove a ordem definida aleatoriamente para as cartas
  });

  errorCount = 0; // Reseta a contagem de erros para zero
  displayErrorCount(); // Atualiza a exibição da quantidade de erros

  resetBoard(); // Reseta o estado do jogo
  shuffleCards(); // Embaralha as cartas novamente

}

// Embaralha as cartas inicialmente
shuffleCards();

