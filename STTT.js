//class for Super Tic Tac Toe
class STTT{

    constructor(){
        this.board = [
            [new TTT(), new TTT(), new TTT()], 
            [new TTT(), new TTT(), new TTT()], 
            [new TTT(), new TTT(), new TTT()]
        ];
        this.winner = null;
        this.turn = TTT.X;

        const size = min(width, height)/3;
        this.boundaries = [
            [[{x: 0, y: 0, size}], [{x: size, y: 0, size}], [{x: 2*size, y: 0, size}]],
            [[{x: 0, y: size, size}], [{x: size, y: size, size}], [{x: 2*size, y: size, size}]],
            [[{x: 0, y: 2*size, size}], [{x: size, y: 2*size, size}], [{x: 2*size, y: 2*size, size}]]
        ]

        this.lastMoveCoords = null;
    }

    //Function to check if there is a winner
    checkWinner() {
        //Check rows
        for (let i = 0; i < 3; i++) {
            if (this.board[i][0].winner != null && this.board[i][0].winner == this.board[i][1].winner && this.board[i][1].winner == this.board[i][2].winner) {
                this.winner = this.board[i][0].winner;
                return;
            }
        }
        //Check columns
        for (let i = 0; i < 3; i++) {
            if (this.board[0][i].winner != null && this.board[0][i].winner == this.board[1][i].winner && this.board[1][i].winner == this.board[2][i].winner) {
                this.winner = this.board[0][i].winner;
                return;
            }
        }
        //Check first diagonal
        if (this.board[0][0].winner != null && this.board[0][0].winner == this.board[1][1].winner && this.board[1][1].winner == this.board[2][2].winner) {
            this.winner = this.board[0][0].winner;
            return;
        }
        //Check other diagonal
        if (this.board[0][2].winner != null && this.board[0][2].winner == this.board[1][1].winner && this.board[1][1].winner == this.board[2][0].winner) {
            this.winner = this.board[0][2].winner;
            return;
        }
    }

    //Display the board
    display(){
        //Draw the little TTT
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                push();
                translate(this.boundaries[i][j][0].x, this.boundaries[i][j][0].y);
                this.board[i][j].display(this.boundaries[i][j][0].size, this.boundaries[i][j][0].size*0.15);
                pop();
            }
        }
        //Draw the boundaries with a 5% gap
        const gap = min(width, height)*0.05;
        strokeWeight(5);
        stroke('#0000FF');
        //Vertical lines
        line(gap, height/3, width-gap, height/3);
        line(gap, 2*height/3, width-gap, 2*height/3);
        //Horizontal lines
        line(width/3, gap, width/3, height-gap);
        line(2*width/3, gap, 2*width/3, height-gap);
    }

    //Play a move
    playMove(coords) {
        //Check if the game is over
        if(this.winner !== null) {
            return false;
        }

        let freeToPlay = false;

        //Check if the game you should play in is full
        if(this.board[this.lastMoveCoords.move[0]][this.lastMoveCoords.move[1]].winner !== null){
            freeToPlay = true;
        }

        //Check if the move is valid
        if(!freeToPlay && coords.game[0] != this.lastMoveCoords.pos[0] || coords.game[1] != this.lastMoveCoords.pos[1]){
            return false;
        }

        //play the move in the right game of the board 
        this.board[coords.game[0]][coords.game[1]].playMove(coords.move[0], coords.move[1], this.turn);

        //Change turn
        if(this.turn == TTT.X){
            this.turn = TTT.O;
        }else{
            this.turn = TTT.X;
        }
        
        return true;
    }

    //Mouse clicked
    mouseClicked(){
        
    }

}