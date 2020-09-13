class Cell{
  constructor(options){
    this.id = options.id;
    this.createCellElement(options.board);
  }

  createCellElement = (board) => {
    
    this.cellElement = document.createElement('div');
    this.cellElement.classList.add('cell');
    this.cellElement.setAttribute('id',this.id);
    board.appendChild(this.cellElement);
  }

  displayCell = () => {
    this.cellElement.style.backgroundColor = 'blue';
  }

  hideCell = () =>{
    this.cellElement.style.backgroundColor = '#b2ebf2';
  }

  revilFood = () => {
    this.cellElement.style.backgroundColor = 'red';
  }

  getColor = () => {
    return this.cellElement.style.backgroundColor;
  }

}