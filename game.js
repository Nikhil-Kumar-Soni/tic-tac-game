document.addEventListener('DOMContentLoaded', () => {
    const board = document.querySelector('.board');
    const cells = document.querySelectorAll('.cell');
    const status = document.querySelector('.status');
    const restartBtn = document.querySelector('.restart-btn');
  
    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
  
    const checkWin = () => {
      const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
  
      for (const condition of winningConditions) {
        const [a, b, c] = condition;
        if (
          gameState[a] !== '' &&
          gameState[a] === gameState[b] &&
          gameState[a] === gameState[c]
        ) {
          gameActive = false;
          status.textContent = `Player ${gameState[a]} wins!`;
          break;
        }
      }
  
      if (!gameState.includes('') && gameActive) {
        gameActive = false;
        status.textContent = "It's a tie!";
      }
    };
  
    const handleClick = (e) => {
      const cellIndex = e.target.dataset.cellIndex;
      if (gameState[cellIndex] === '' && gameActive) {
        gameState[cellIndex] = currentPlayer;
        e.target.textContent = currentPlayer;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        checkWin();
      }
    };
  
    const restartGame = () => {
      currentPlayer = 'X';
      gameState = ['', '', '', '', '', '', '', '', ''];
      gameActive = true;
      status.textContent = '';
      cells.forEach(cell => {
        cell.textContent = '';
      });
    };
  
    cells.forEach(cell => {
      cell.addEventListener('click', handleClick);
    });
  
    restartBtn.addEventListener('click', restartGame);
  });