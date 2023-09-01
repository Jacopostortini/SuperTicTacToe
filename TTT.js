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
    display(size, gap, highlights = {game: false, pos: null}){
        const squareSize = (size-2*gap)/3;
        strokeWeight(min(gap/5, 5));
        stroke(highlights.game ? '#FF0000' : '#000000');
        //Vertical lines
        line(squareSize+gap, gap, squareSize+gap, size-gap);
        line(2*squareSize+gap, gap, 2*squareSize+gap, size-gap);

        //Horizontal lines
        line(gap, squareSize+gap, size-gap, squareSize+gap);
        line(gap, 2*squareSize+gap, size-gap, 2*squareSize+gap);

        const signsGap = squareSize*0.1;
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++) {
                if(highlights.pos != null && highlights.pos[0] == i && highlights.pos[1] == j){
                    //orange lines
                    stroke('#FFA500');
                } else {
                    stroke(0);
                }
                if (this.board[i][j] === TTT.X) {
                    line(j*squareSize+gap+signsGap, i*squareSize+gap+signsGap, (j+1)*squareSize+gap-signsGap, (i+1)*squareSize+gap-signsGap);
                    line((j+1)*squareSize+gap-signsGap, i*squareSize+gap+signsGap, j*squareSize+gap+signsGap, (i+1)*squareSize+gap-signsGap);
                } else if (this.board[i][j] === TTT.O) {
                    noFill();
                    circle((j+0.5)*squareSize+gap, (i+0.5)*squareSize+gap, squareSize-signsGap*2);
                }
            }
        }

        //If the game is over, display big symbol of the winner over the game
        if (this.winner !== null) {
            strokeWeight(gap/3);
            stroke('#0000FF');
            noFill();
            if (this.winner === TTT.X) {
                line(gap, gap, size-gap, size-gap);
                line(size-gap, gap, gap, size-gap);
            } else if (this.winner === TTT.O) {
                circle(size/2, size/2, size-2*gap);
            }   
        }
    }
}