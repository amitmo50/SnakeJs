class Board{
  constructor(options){
    this.numOfCols = options.numOfCols - 1;
    this.numOfRows = options.numOfRows - 2;
    this.gameOn = options.gameOn;
    this.createBoardElement(options.container, this.numOfCols, this.numOfRows);
    this.changeState = options.changeStateGame;
  }

  createBoardElement = (container, cols, rows) => {
    let gamePlay = this.gameOn;
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
    button.innerHTML = 'Start';
    button.classList.add('start-btn');
    button.addEventListener('click', (e)=>{
      if(e.target.innerHTML === 'Start'){
        e.target.innerHTML = 'Stop';
      }else{
        e.target.innerHTML = 'Start';
      }
      
    });
    buttonContainer.appendChild(button);
    document.querySelector('#main-container').after(buttonContainer);
  }
  getGameState = ()=> {
    // this.gameOn = this.changeState();
    this.gameOn = false;
    console.log(this.gameOn);
    return this.gameOn;
  }

  
  
}