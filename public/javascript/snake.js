class Snake{
  constructor(options){
    this.position = options.position;
    this.snakeDirection = options.direction;
    this.currentRow;
    this.currentCol;
    this.numOfCols = options.numOfCols;
    this.numOfRows = options.numOfRows;
    this.arrayPosition = [];
  }

  setPosition = (row, col) =>{
    this.currentCol = col;
    this.currentRow = row;
    const currentHeadPosition = (row - 1) * (this.numOfCols - 1) + col;
    this.position = currentHeadPosition;
    
  }
  getPosition = () => {
    return this.position ;
  }

  setDirection = (dir) => {
    this.snakeDirection = dir;
  }
  getDirection = () => {
    return this.snakeDirection;
  }
}