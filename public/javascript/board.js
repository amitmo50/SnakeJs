class Board{
  constructor(options){
    this.numOfCols = options.numOfCols - 1;
    this.numOfRows = options.numOfRows - 2;
    this.gameOn = options.gameOn;
    this.createBoardElement(options.container, this.numOfCols, this.numOfRows);
    this.changeState = options.changeStateGame;
    this.restartGame = options.restartGame;
  }

  createBoardElement = (container, cols, rows) => {
    
    this.cells = {};
    this.boardElement = document.createElement('div');
    this.boardElement.classList.add('board-game');
    for(let i = 0; i < rows * cols; i++){
      
      this.cells[i] = new Cell({
        board: this.boardElement,
        id: i
      });
    }
    container.appendChild(this.boardElement);
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');
    const button = document.createElement('button');
    const restart = document.createElement('button');
    restart.innerHTML = 'Restart';
    button.innerHTML = 'Pause';
    restart.classList.add('restart-btn');
    restart.style.display = 'none';
    button.classList.add('start-btn');
    restart.addEventListener('click', (e) => {
      this.restartGame();
      e.target.style.display = 'none';
    });
    button.addEventListener('click', (e)=>{
      if(e.target.innerHTML === 'Start'){
        e.target.innerHTML = 'Pause';
        restart.style.display = 'none';
      }else{
        e.target.innerHTML = 'Start';
        restart.style.display = 'block';
      }
      this.changeState();
    });
    
    buttonContainer.appendChild(button);
    buttonContainer.appendChild(restart);
    container.appendChild(buttonContainer);
  }
  

  
  
}