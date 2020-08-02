class SnakeJs{
  constructor(options){
    this.positionList = {};
    this.board = new Board({...options,
      changeStateGame: this.changeStateGame
    });
    this.snake = new Snake({
      ...options});
    this.gameOn = this.board.getGameState();
    this.numOfCols = options.numOfCols;
    this.numOfRows = options.numOfRows;
    this.gameSpeed = options.speedGame;
    this.numOfNodes = options.numOfNodes;
    this.moveSnakeOnBoard(Math.round(this.numOfRows/2), Math.round(this.numOfCols/2));
  }
  
  changeStateGame = () =>{
    let button = document.querySelector('.start-btn');
    let gameState;
    if(button.innerHTML === 'Start'){
      gameState = true;
    }else{
      gameState = false;
    }
    console.log(gameState);
  }

  updatePositionList = (snakePosition) => {
    let tempPosition1 = this.positionList[1];
    let tempPosition2; 
    this.positionList[1] = snakePosition;
    if(this.numOfNodes > 2){
      for(let i = 2; i < this.numOfNodes; i++){
        tempPosition2 = this.positionList[i];
        this.positionList[i] = tempPosition1;
        tempPosition1 = tempPosition2;
      }
      console.log(this.positionList);
    }
  }

  hideMultiNode = () =>{
    let countNode = 1;
    while(countNode < this.numOfNodes){
      this.board.cells[this.positionList[countNode]].hideCell();
      countNode++;
    }

  }

  initRevilMultiNode = (snakePosition, numOfNodes) =>{
    let countNode = numOfNodes - 1;
    while(countNode > 0){
      this.board.cells[snakePosition - (numOfNodes - countNode)].displayCell();
      this.positionList[numOfNodes - countNode] = snakePosition - (numOfNodes - countNode);
      countNode--;
    }
  }

  
  revilMultiNode = () =>{
    let countNode = 1;
    while(countNode < this.numOfNodes){
      this.board.cells[this.positionList[countNode]].displayCell();
      countNode++;
    }
  }

  moveSnakeOnBoard = (row,col) => {
    
    this.eventListenersList();
   
    if(this.gameOn){
      // Set game boundries
      const endPositionRight = this.numOfCols - 1;
      const endPositionLeft = -1;
      const endPositionTop = 1;
      const endPositionBottom = this.numOfRows - 2;

      // Start in the initial Position
      let i = 1;
      this.snake.setPosition(row,col);
      let snakePosition = this.snake.getPosition();
      this.board.cells[snakePosition].displayCell();
      this.initRevilMultiNode(snakePosition, this.numOfNodes);
      // this.updatePositionList(snakePosition-1);
      this.putFoodOnBoard();
      setInterval(()=>{
        if(this.board.cells[this.foodPosition].getColor() === 'blue'){
          this.putFoodOnBoard();
          this.gameSpeed -= 10;
          //this.numOfNodes += 1;
        }
        
        if(this.snake.snakeDirection === 'right'){
            console.log(this.snake.currentRow, this.snake.currentCol);
            this.board.cells[snakePosition].hideCell();
            this.hideMultiNode();
            this.snake.setPosition(this.snake.currentRow,this.snake.currentCol + i);
            this.updatePositionList(snakePosition);
            snakePosition = this.snake.getPosition();
            this.board.cells[snakePosition].displayCell();
            this.revilMultiNode();
          // when get the borders of the game
          if(this.snake.currentCol === endPositionRight){
            console.log(snakePosition);
            console.log('end');
            this.board.cells[snakePosition].hideCell();
            this.hideMultiNode();
            snakePosition = (this.snake.currentRow - 1) * (this.numOfCols - 1);
            this.updatePositionList(snakePosition);
            this.board.cells[snakePosition].displayCell();
            this.revilMultiNode();
            this.snake.currentCol = 0;
          }
        } else if(this.snake.snakeDirection === 'left'){
          this.board.cells[snakePosition].hideCell();
          this.hideMultiNode();
          this.snake.setPosition(this.snake.currentRow,this.snake.currentCol - i);
          this.updatePositionList(snakePosition);
          snakePosition = this.snake.getPosition();
          this.board.cells[snakePosition].displayCell();
          this.revilMultiNode();
        
          if(this.snake.currentCol  === endPositionLeft){
            console.log('end');
            this.snake.currentCol = this.numOfCols - 2;
            this.board.cells[snakePosition].hideCell();
            this.hideMultiNode();
            snakePosition = (this.snake.currentRow - 1) * (this.numOfCols - 1) + this.snake.currentCol;
            this.updatePositionList(snakePosition);
            this.board.cells[snakePosition].displayCell();
            this.revilMultiNode();
          }
        }else if(this.snake.snakeDirection === 'up'){
          this.board.cells[snakePosition].hideCell();
          this.hideMultiNode();
          this.snake.setPosition(this.snake.currentRow - i,this.snake.currentCol);
          this.updatePositionList(snakePosition);
          snakePosition = this.snake.getPosition();
          this.board.cells[snakePosition].displayCell();
          this.revilMultiNode();
          
          if(this.snake.currentRow === endPositionTop){
            console.log('end');
            this.snake.currentRow = this.numOfRows - 2;
            this.board.cells[snakePosition].hideCell();
            this.hideMultiNode();
            snakePosition = (this.snake.currentRow - 1) * (this.numOfCols - 1) + this.snake.currentCol;
            this.updatePositionList(snakePosition);
            this.board.cells[snakePosition].displayCell();
            this.revilMultiNode();
          }
        }else if(this.snake.snakeDirection === 'down'){
          this.board.cells[snakePosition].hideCell();
          this.hideMultiNode();
          this.snake.setPosition(this.snake.currentRow + i,this.snake.currentCol);
          this.updatePositionList(snakePosition);
          snakePosition = this.snake.getPosition();
          this.board.cells[snakePosition].displayCell();
          this.revilMultiNode();

          if(this.snake.currentRow === endPositionBottom){
            console.log('end');
            console.log(this.snake.currentRow);
            this.board.cells[snakePosition].hideCell();
            this.snake.currentRow = 1;
            this.hideMultiNode();
            snakePosition = (this.snake.currentRow - 1) * (this.numOfCols - 1) + this.snake.currentCol;
            this.updatePositionList(snakePosition);
            this.board.cells[snakePosition].displayCell();
            this.revilMultiNode();
          }
        }
        
      }, this.gameSpeed);
      
    }        
  } 

  putFoodOnBoard = () => {
    this.foodPosition = Math.floor(Math.random() * 2112);
    this.board.cells[this.foodPosition].revilFood();
  }

  eventListenersList = () => {
    document.addEventListener('keydown', e => {
      console.log(e.code);
      switch(e.code){
        case 'ArrowDown':
          this.snake.setDirection('down');
          break;
        case 'ArrowUp':
          this.snake.setDirection('up');
          break;
        case 'ArrowLeft':
          this.snake.setDirection('left');
          break;
        case 'ArrowRight':
          this.snake.setDirection('right');
          break;
      }
    });
  }
}


const game = new SnakeJs({
  container: document.getElementById('main-container'),
  gameOn: false,
  numOfCols: 1300/20,
  numOfRows: 700/20,
  direction: 'right',
  speedGame: 300,
  numOfNodes: 5
  
});


