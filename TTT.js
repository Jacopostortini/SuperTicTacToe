// TicTacToe class handling simple game
class TTT { 
    static X = 1;
    static O = 0;
    static XO = -1;

    constructor() {
        this.board = [
            [null, null, null], 
            [null, null, null], 
            [null, null, null]
        ];
        this.winner = null;
    }

    //Function to check if there is a winner
    checkWinner() {
        //Check rows
        for (let i = 0; i < 3; i++) {
            if (this.board[i][0] != null && this.board[i][0] == this.board[i][1] && this.board[i][1] == this.board[i][2]) {
                this.winner = this.board[i][0];
                return;
            }
        }
        //Check columns
        for (let i = 0; i < 3; i++) {
            if (this.board[0][i] != null && this.board[0][i] == this.board[1][i] && this.board[1][i] == this.board[2][i]) {
                this.winner = this.board[0][i];
                return;
            }
        }
        //Check first diagonal
        if (this.board[0][0] != null && this.board[0][0] == this.board[1][1] && this.board[1][1] == this.board[2][2]) {
            this.winner = this.board[0][0];
            return;
        }
        //Check other diagonal
        if (this.board[0][2] != null && this.board[0][2] == this.board[1][1] && this.board[1][1] == this.board[2][0]) {
            this.winner = this.board[0][2];
            return;
        }

        //Check for a draw
        let draw = true;
        for (let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                if (this.board[i][j] === null) {
                    draw = false;
                }
            }
        }
        if (draw) {
            this.winner = TTT.XO;
        }
    }

    //Play a move
    playMove(x, y, player) {
        //Check if the game is over
        if(this.winner !== null) {
            return false;
        }
        //Check if the player is valid
        if (player !== TTT.X && player !== TTT.O) {
            return false;
        }


        if (this.board[x][y] === null) {
            this.board[x][y] = player;
            this.checkWinner();
            return true;
        }
        return false;
    }

    //Display the board
    display(size, gap){
        const squareSize = (size-2*gap)/3;
        strokeWeight(4);
        stroke(0);
        //Vertical lines
        line(squareSize+gap, gap, squareSize+gap, size-gap);
        line(2*squareSize+gap, gap, 2*squareSize+gap, size-gap);

        //Horizontal lines
        line(gap, squareSize+gap, size-gap, squareSize+gap);
        line(gap, 2*squareSize+gap, size-gap, 2*squareSize+gap);

        const signsGap = squareSize*0.1;
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++) {
                if (this.board[i][j] === TTT.X) {
                    line(i*squareSize+gap+signsGap, j*squareSize+gap+signsGap, (i+1)*squareSize+gap-signsGap, (j+1)*squareSize+gap-signsGap);
                    line((i+1)*squareSize+gap-signsGap, j*squareSize+gap+signsGap, i*squareSize+gap+signsGap, (j+1)*squareSize+gap-signsGap);
                } else if (this.board[i][j] === TTT.O) {
                    circle((i+0.5)*squareSize+gap, (j+0.5)*squareSize+gap, squareSize-signsGap*2);
                }
            }
        }
    }

    //Click listener
    mouseClicked(boundaries, player) {
        if (this.winner !== null) {
            return false;
        }
        if (mouseX > boundaries.x && mouseX < boundaries.x+boundaries.size && mouseY > boundaries.y && mouseY < boundaries.y+boundaries.size) {
            const squareSize = boundaries.size/3;
            const x = Math.floor((mouseX-boundaries.x)/squareSize);
            const y = Math.floor((mouseY-boundaries.y)/squareSize);
            return this.playMove(x, y, player);
        }
        return false;
    }

}