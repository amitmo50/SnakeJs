class SnakeJs{
  constructor(options){
    this.positionList = {};
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
    this.oringinNumOfNodes = options.numOfNodes;
    this.endPositionRight = this.numOfCols - 1;
    this.endPositionLeft = -1;
    this.endPositionTop = 1;
    this.endPositionBottom = this.numOfRows - 2;
    this.score = document.querySelector('.score');
    this.highScore = document.querySelector('.high-score');
    this.gameOverFlag = false;
    this.moveSnakeOnBoard(Math.round(this.numOfRows/2), Math.round(this.numOfCols/2));
  }

  // Initialize the game when the game is up
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
      this.putFoodOnBoard();
      this.intervalID = setInterval(this.snakeStep, this.gameSpeed);
      
    }        
  } 

  // Restart all the game by clear all states and parameters
  restartGame = () => {
    console.log('node position before reset',this.positionList);
    this.score.innerHTML = 0;
    for(let j = 0; j < (this.numOfCols - 1) * (this.numOfRows - 2);j++){
      this.board.cells[j].hideCell();
    }
    // Start in the initial Position
    this.i = 1;
    clearInterval(this.intervalID);
    this.numOfNodes = this.oringinNumOfNodes;
    this.positionList = this.oringinPositionList;
    this.snake.setDirection('right');
    this.gameSpeed = this.startSpeedGame;
    localStorage.setItem('Score', this.score.innerHTML);
    this.snake.setPosition(Math.round(this.numOfRows/2), Math.round(this.numOfCols/2));
    this.snakePosition = this.snake.getPosition();
    this.board.cells[this.snakePosition].displayCell();
    this.initRevilMultiNode(this.snakePosition, this.numOfNodes);
    this.putFoodOnBoard(); 
  }

  // Change the state of the gameOn flag
  changeStateGame = () =>{
    let button = document.querySelector('.start-btn');
    if(button.innerHTML === 'Start'){
      this.gameOn = false;
      
    }else{
      this.gameOn  = true;
      if(this.gameOverFlag === true){
        const gameOverMessage = document.querySelector('.game-over-message');
        document.querySelector('.board-game').parentNode.removeChild(gameOverMessage);
      }
      this.intervalID = setInterval(this.snakeStep,this.gameSpeed);
    }
  }
  
  // Update to a dictionary all the nodes position on board
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

  // Hide all the nodes behind the snakePosition (the head)
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
    this.oringinPositionList = this.positionList;
    
  }

  // Display all nodes behind the snakePosition(the head of the snake)
  revilMultiNode = () =>{
    let countNode = 1;
    while(countNode < this.numOfNodes){
      if(typeof(this.board.cells[this.positionList[countNode]]) !== 'undefined'){
        this.board.cells[this.positionList[countNode]].displayCell();
        countNode++;
      }
    }
  }
  
  // Add Node to snake after eat a fruit
  addNodeToSnakeWhenEat = (snakeDirection) => {
    let newPositionList = {};
    let countNode = this.numOfNodes - 1;
    newPositionList[1] = this.snakePosition;
    while(countNode > 0){
      this.board.cells[this.positionList[countNode]].hideCell();
      newPositionList[(this.numOfNodes - countNode) + 1] = this.positionList[this.numOfNodes - countNode];
      countNode--;
    }
    this.board.cells[this.snakePosition].hideCell();
    this.positionList = newPositionList;
    if(snakeDirection === "right"){
      this.snakePosition = this.snakePosition + 1;
    }else if(snakeDirection === "left"){
      this.snakePosition = this.snakePosition - 1;
    }else if(snakeDirection === "up"){
      this.snakePosition = this.snakePosition + 64;
    }else{
      this.snakePosition = this.snakePosition - 64; 
    }
    this.numOfNodes++;
    this.updatePositionList(this.snakePosition);
  }
  
  // Game Over function to handle a situation where the snake hit the walls
  gameOver = () => {
    const gameOverMessage = document.createElement('div');
    gameOverMessage.innerHTML = 'Game Over!';
    gameOverMessage.classList.add('game-over-message');
    document.querySelector('.board-game').before(gameOverMessage);
    this.gameOverFlag = true;
    if(this.highScore.innerHTML < this.score.innerHTML){
      this.highScore.innerHTML = this.score.innerHTML;
    }
    this.restartGame();
    document.querySelector('.start-btn').innerHTML = "Start";
    document.querySelector('.restart-btn').style.display = "block";
    
  }

  // Snake Movements on board
  snakeStep = ()=>{
    if(this.gameOn === true && (document.querySelector('.start-btn').innerHTML === 'Pause')){
      if(this.board.cells[this.foodPosition].getColor() === 'blue'){
        console.log(this.snake.snakeDirection);
        this.putFoodOnBoard();
        clearInterval(this.intervalID);
        this.gameSpeed -= 10;
        this.addNodeToSnakeWhenEat(this.snake.snakeDirection);
        this.score.innerHTML++;
        localStorage.setItem('Score', this.score.innerHTML);
        this.intervalID = setInterval(this.snakeStep,this.gameSpeed);
        return;
      }
      if(this.snake.snakeDirection === 'right'){
          this.board.cells[this.snakePosition].hideCell();
          this.hideMultiNode();
          this.snake.setPosition(this.snake.currentRow,this.snake.currentCol + this.i);
          this.updatePositionList(this.snakePosition);
          this.snakePosition = this.snake.getPosition();
          this.board.cells[this.snakePosition].displayCell();
          this.revilMultiNode();
        // when get the borders of the game
        if(this.snake.currentCol > this.endPositionRight){
          this.gameOver();
        }
      } else if(this.snake.snakeDirection === 'left'){
        this.board.cells[this.snakePosition].hideCell();
        this.hideMultiNode();
        this.snake.setPosition(this.snake.currentRow,this.snake.currentCol - this.i);
        this.updatePositionList(this.snakePosition);
        this.snakePosition = this.snake.getPosition();
        this.board.cells[this.snakePosition].displayCell();
        this.revilMultiNode();
      
        if(this.snake.currentCol < this.endPositionLeft){
          this.gameOver();
        }
      }else if(this.snake.snakeDirection === 'up'){
        this.board.cells[this.snakePosition].hideCell();
        this.hideMultiNode();
        this.snake.setPosition(this.snake.currentRow - this.i,this.snake.currentCol);
        this.updatePositionList(this.snakePosition);
        this.snakePosition = this.snake.getPosition();
        this.board.cells[this.snakePosition].displayCell();
        this.revilMultiNode();
        
        if(this.snake.currentRow < this.endPositionTop){
          this.gameOver();
        }
      }else if(this.snake.snakeDirection === 'down'){
        this.board.cells[this.snakePosition].hideCell();
        this.hideMultiNode();
        this.snake.setPosition(this.snake.currentRow + this.i,this.snake.currentCol);
        this.updatePositionList(this.snakePosition);
        this.snakePosition = this.snake.getPosition();
        this.board.cells[this.snakePosition].displayCell();
        this.revilMultiNode();
  
        if(this.snake.currentRow > this.endPositionBottom){
          console.log('end');
          this.gameOver();
        }
      }
    } 
  }

  // Put the food on board
  putFoodOnBoard = () => {
    this.foodPosition = Math.floor(Math.random() * 2112);
    this.board.cells[this.foodPosition].revilFood();
  }

  // Keyboard event listener
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


