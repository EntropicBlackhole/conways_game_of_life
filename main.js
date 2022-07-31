$(function () {
	const board = new Board(20, 20, true);
	// board.setCellState(2, 10, 1);
	// board.setCellState(3, 11, 1);
	// board.setCellState(4, 11, 1);
	// board.setCellState(4, 10, 1);
	// board.setCellState(4, 9, 1);
	// console.log(board.board[0][0])
	var dimensions = board.getDimensions();
	let a = 0;
	for (let i = 0; i < dimensions[0]; i++) {
		for (let j = 0; j < dimensions[1]; j++) {
			a++;
			$('#game').append($(`<div class="tile" id="tile_${a}"></div>`));
			if (board.board[i][j] == true) {
				document.getElementById(`tile_${a}`).style.backgroundColor = 'black';
			}
			else
				document.getElementById(`tile_${a}`).style.backgroundColor = 'white';
		}
	}
	setInterval(board.run.bind(board), 100);
})



class Board {
	constructor(width, height, randomize) {
		this.width = width;
		this.height = height;
		this.board = this.makeBoard();
		// console.log(this.board)
		if (randomize) {
			this.randomizeBoard();
		}
	}
	makeBoard() {
		let board = [];
		for (let i = 0; i < this.height; i++) {
			board.push([]);
			for (let j = 0; j < this.width; j++) {
				board[i].push(0);
			}
		}
		return board;
	}
	drawBoard(board) {
		let a = 0;
		for (let i = 0; i < this.height; i++) {
			for (let j = 0; j < this.width; j++) {
				a++
				if (board[i][j] == 1)
					document.getElementById(`tile_${a}`).style.backgroundColor = 'black';
				else
					document.getElementById(`tile_${a}`).style.backgroundColor = 'white';
			}
		}
	}
	setCellState(board, x, y, val) {
		board[x][y] = val;
	}
	getCellState(board, x, y) {
		if (x < 0 || y < 0 || x >= this.height || y >= this.width) return false
		return board[x][y];
	}
	randomizeBoard() {
		//randomize the board
		for (let i = 0; i < this.height; i++) {
			for (let j = 0; j < this.width; j++) {
				var random = Math.floor((Math.random() * 5) + 1);
				if (random == 1)
					this.setCellState(this.board, i, j, 1);
			}
		}
	}
	getDimensions() {
		return [this.width, this.height]
	}
	run(board) {
		let bufferBoard = this.board
		// console.log(bufferBoard)
		let a = 0;
		for (let i = 0; i < this.height; i++) {
			for (let j = 0; j < this.width; j++) {
				var topCell = this.getCellState(this.board, i - 1, j);
				var bottomCell = this.getCellState(this.board, i + 1, j);
				var leftCell = this.getCellState(this.board, i, j - 1);
				var rightCell = this.getCellState(this.board, i, j + 1);
				var topLeftCell = this.getCellState(this.board, i - 1, j - 1);
				var topRightCell = this.getCellState(this.board, i - 1, j + 1);
				var bottomLeftCell = this.getCellState(this.board, i + 1, j - 1);
				var bottomRightCell = this.getCellState(this.board, i + 1, j + 1);
				let neighbors = topCell + bottomCell + leftCell + rightCell + topLeftCell + topRightCell + bottomLeftCell + bottomRightCell;
				a++
				if (this.getCellState(this.board, i, j) == 1) {
					if (neighbors < 2 || neighbors > 3) {
						this.setCellState(bufferBoard, i, j, 0)
					}
				} else {
					if (neighbors == 3) {
						this.setCellState(bufferBoard, i, j, 1)
					}
				}
				
			}
		}
		this.board = bufferBoard;
		this.drawBoard(this.board)
	}
}


