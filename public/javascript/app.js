class SnakeJs{
  constructor(options){
    this.positionList = {};
    this.initPositionOfNodes = {};
    this.board = new Board({...options,
      changeStateGame: this.changeStateGame,
      restartGame: this.restartGame
    });
    this.snake = new Snake({
      ...options});
    this.gameOn = options.gameOn;
    this.numOfCols = options.numOfCols;
    this.numOfRows = options.numOfRows;
    this.gameSpeed = options.speedGame;
    this.startSpeedGame = options.speedGame;
    this.numOfNodes = options.numOfNodes;
    this.endPositionRight = this.numOfCols - 1;
    this.endPositionLeft = -1;
    this.endPositionTop = 1;
    this.endPositionBottom = this.numOfRows - 2;
    this.score = document.querySelector('.score');
    this.moveSnakeOnBoard(Math.round(this.numOfRows/2), Math.round(this.numOfCols/2));
    
    
  }
  restartGame = () => {
    console.log('node position before reset',this.positionList);
    this.score.innerHTML = 0;
    
    for(let j = 0; j < (this.numOfCols - 1) * (this.numOfRows - 2);j++){
      this.board.cells[j].hideCell();
    }
    // Start in the initial Position
    this.i = 1;
    // console.log('start init');
    clearInterval(this.intervalID);
    this.positionList = this.initPositionOfNodes;
    this.snake.setDirection('right');
    console.log(this.initPositionOfNodes);
    this.gameSpeed = this.startSpeedGame;
    localStorage.setItem('Score', this.score.innerHTML);
    this.snake.setPosition(Math.round(this.numOfRows/2), Math.round(this.numOfCols/2));
    this.snakePosition = this.snake.getPosition();
    this.board.cells[this.snakePosition].displayCell();
    this.initRevilMultiNode(this.snakePosition, this.numOfNodes);
    this.putFoodOnBoard();
    //this.intervalID = setInterval(this.snakeStep, this.gameSpeed);  
  }
  changeStateGame = () =>{
    let button = document.querySelector('.start-btn');
    if(button.innerHTML === 'Start'){
      this.gameOn = false;
    }else{
      this.gameOn  = true;
      this.intervalID = setInterval(this.snakeStep,this.gameSpeed);
    }
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
      
    }
  }

  hideMultiNode = () =>{
    let countNode = 1;
    while(countNode < this.numOfNodes){

      console.log(this.positionList)
      console.log(this.board.cells[this.positionList[countNode]].id)
      this.board.cells[this.positionList[countNode]].hideCell();
      countNode++;
      
    }
  }

  initRevilMultiNode = (snakePosition, numOfNodes) =>{
    let countNode = numOfNodes - 1;
    while(countNode > 0){
      this.board.cells[snakePosition - (numOfNodes - countNode)].displayCell();
      this.positionList[numOfNodes - countNode] = snakePosition - (numOfNodes - countNode);
      this.initPositionOfNodes[numOfNodes - countNode] = snakePosition - (numOfNodes - countNode);
      countNode--;
    }
    
    
  }
  snakeStep = ()=>{
    // console.log(this.gameSpeed);
    if(this.gameOn === true && (document.querySelector('.start-btn').innerHTML === 'Pause')){
      if(this.board.cells[this.foodPosition].getColor() === 'blue'){
        this.putFoodOnBoard();
        clearInterval(this.intervalID);
        this.gameSpeed -= 10;
        this.score.innerHTML++;
        localStorage.setItem('Score', this.score.innerHTML);
        //this.numOfNodes += 1;
        this.intervalID = setInterval(this.snakeStep,this.gameSpeed);
        return;
      }
      //console.log(this.gameOn);
      if(this.snake.snakeDirection === 'right'){
          this.board.cells[this.snakePosition].hideCell();
          this.hideMultiNode();
          this.snake.setPosition(this.snake.currentRow,this.snake.currentCol + this.i);
          this.updatePositionList(this.snakePosition);
          this.snakePosition = this.snake.getPosition();
          this.board.cells[this.snakePosition].displayCell();
          this.revilMultiNode();
        // when get the borders of the game
        if(this.snake.currentCol === this.endPositionRight){
          console.log('end');
          this.board.cells[this.snakePosition].hideCell();
          this.hideMultiNode();
          this.snakePosition = (this.snake.currentRow - 1) * (this.numOfCols - 1);
          this.updatePositionList(this.snakePosition);
          this.board.cells[this.snakePosition].displayCell();
          this.revilMultiNode();
          this.snake.currentCol = 0;
        }
      } else if(this.snake.snakeDirection === 'left'){
  
        this.board.cells[this.snakePosition].hideCell();
        this.hideMultiNode();
        this.snake.setPosition(this.snake.currentRow,this.snake.currentCol - this.i);
        this.updatePositionList(this.snakePosition);
        this.snakePosition = this.snake.getPosition();
        this.board.cells[this.snakePosition].displayCell();
        this.revilMultiNode();
      
        if(this.snake.currentCol === this.endPositionLeft){
          console.log('end');
          this.snake.currentCol = this.numOfCols - 2;
          this.board.cells[this.snakePosition].hideCell();
          this.hideMultiNode();
          this.snakePosition = (this.snake.currentRow - 1) * (this.numOfCols - 1) + this.snake.currentCol;
          this.updatePositionList(this.snakePosition);
          this.board.cells[this.snakePosition].displayCell();
          this.revilMultiNode();
        }
      }else if(this.snake.snakeDirection === 'up'){
        this.board.cells[this.snakePosition].hideCell();
        this.hideMultiNode();
        this.snake.setPosition(this.snake.currentRow - this.i,this.snake.currentCol);
        this.updatePositionList(this.snakePosition);
        this.snakePosition = this.snake.getPosition();
        this.board.cells[this.snakePosition].displayCell();
        this.revilMultiNode();
        
        if(this.snake.currentRow === this.endPositionTop){
          console.log('end');
          this.snake.currentRow = this.numOfRows - 2;
          this.board.cells[this.snakePosition].hideCell();
          this.hideMultiNode();
          this.updatePositionList(this.snakePosition);
          this.snakePosition = (this.snake.currentRow - 1) * (this.numOfCols - 1) + this.snake.currentCol;
          this.board.cells[this.snakePosition].displayCell();
          this.revilMultiNode();
        }
      }else if(this.snake.snakeDirection === 'down'){
        this.board.cells[this.snakePosition].hideCell();
        this.hideMultiNode();
        this.snake.setPosition(this.snake.currentRow + this.i,this.snake.currentCol);
        this.updatePositionList(this.snakePosition);
        this.snakePosition = this.snake.getPosition();
        this.board.cells[this.snakePosition].displayCell();
        this.revilMultiNode();
  
        if(this.snake.currentRow === this.endPositionBottom){
          console.log('end');
          this.snake.currentRow = 1;
          this.board.cells[this.snakePosition].hideCell();
          this.hideMultiNode();
          this.updatePositionList(this.snakePosition);
          this.snakePosition = (this.snake.currentRow - 1) * (this.numOfCols - 1) + this.snake.currentCol;
          this.board.cells[this.snakePosition].displayCell();
          this.revilMultiNode();
        }
      }
    }
    
  }
  
  revilMultiNode = () =>{
    let countNode = 1;
    while(countNode < this.numOfNodes){
      if(typeof(this.board.cells[this.positionList[countNode]]) !== 'undefined'){
        this.board.cells[this.positionList[countNode]].displayCell();
        countNode++;
      }
    }
  }

  moveSnakeOnBoard = (row,col) => {
    
    this.eventListenersList();
   
    if(this.gameOn){
      // Start in the initial Position
      this.i = 1;
      localStorage.setItem('Score', this.score.innerHTML);
      this.snake.setPosition(row,col);
      this.snakePosition = this.snake.getPosition();
      this.board.cells[this.snakePosition].displayCell();
      this.initRevilMultiNode(this.snakePosition, this.numOfNodes);
      // this.updatePositionList(snakePosition-1);
      this.putFoodOnBoard();
      this.intervalID = setInterval(this.snakeStep, this.gameSpeed);
      
    }        
  } 

  putFoodOnBoard = () => {
    this.foodPosition = Math.floor(Math.random() * 2112);
    this.board.cells[this.foodPosition].revilFood();
    console.log('food position',this.board.cells[this.foodPosition]);
  }

  eventListenersList = () => {
    document.addEventListener('keydown', e => {
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
  gameOn: true,
  numOfCols: 1300/20,
  numOfRows: 700/20,
  direction: 'right',
  speedGame: 400,
  numOfNodes: 3
  
});


