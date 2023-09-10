//class for Super Tic Tac Toe
class STTT{

    constructor(boundaries){
        this.board = [
            [new TTT(), new TTT(), new TTT()], 
            [new TTT(), new TTT(), new TTT()], 
            [new TTT(), new TTT(), new TTT()]
        ];
        this.winner = null;
        this.turn = TTT.X;

        this.boundaries = boundaries

        this.history = [];

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

        //Check for a draw
        let draw = true;
        for (let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                if (this.board[i][j].winner === null) {
                    draw = false;
                }
            }
        }
        if (draw) {
            this.winner = TTT.XO;
        }
        

    
    }

    //Display the board
    display(){
        push();
        translate(this.boundaries.x, this.boundaries.y);
        //Draw the little TTT
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                const game = this.getGameToPlayIn();
                let highlightGame = (game[0] == i && game[1] == j);
                if(game[0] == null && game[1] == null){
                    highlightGame = true;
                }
                if(this.board[i][j].winner != null){
                    highlightGame = false;
                }
                if(this.winner != null){
                    highlightGame = false;
                }

                let highlightPos = null;
                if(this.history.length > 0){
                    if(this.history[this.history.length-1].game[0] == i && this.history[this.history.length-1].game[1] == j){
                        highlightPos = this.history[this.history.length-1].pos;
                    }
                }

                push();
                const littleTTTSize = this.boundaries.size/3;
                translate(littleTTTSize*j, littleTTTSize*i);
                this.board[i][j].display(littleTTTSize, littleTTTSize*0.15, {game: highlightGame, pos: highlightPos});
                pop();
            }
        }
        
        //Draw the boundaries with a 5% gap
        const size = this.boundaries.size;
        const gap = size*0.05;
        
        strokeWeight(5);
        stroke('#0000FF');
        //Vertical lines
        line(gap, size/3, size-gap, size/3);
        line(gap, 2*size/3, size-gap, 2*size/3);
        //Horizontal lines
        line(size/3, gap, size/3, size-gap);
        line(2*size/3, gap, 2*size/3, size-gap);

        pop();
    }

    //Play a move
    playMove(coords) {
        //Check if the game is over
        if(this.winner !== null) {
            console.error("The game is over");
            return false;
        }

        const gameToPlayIn = this.getGameToPlayIn();
        //Check if the move is valid
        if( !(gameToPlayIn[0]==null  && gameToPlayIn[1]==null) && (coords.game[0] != gameToPlayIn[0] || coords.game[1] != gameToPlayIn[1]) ){
            console.error("You should play in the game marked in red");
            return false;
        }

        //play the move in the right game of the board 
        const played = this.board[coords.game[0]][coords.game[1]].playMove(coords.pos[0], coords.pos[1], this.turn);
        if(!played) return false;

        //Change turn
        if(this.turn == TTT.X){
            this.turn = TTT.O;
        }else{
            this.turn = TTT.X;
        }

        this.history.push(coords);

        this.checkWinner();
        return true;
    }

    //Mouse clicked
    mouseClicked(){
        const littleTTTSize = this.boundaries.size/3;
        const tMouseX = mouseX-this.boundaries.x;
        const tMouseY = mouseY-this.boundaries.y;

        const game = [Math.floor(tMouseY/littleTTTSize), Math.floor(tMouseX/littleTTTSize)];
        const pos = [Math.floor( (tMouseY%littleTTTSize) / (littleTTTSize/3) ), Math.floor( (tMouseX%littleTTTSize) / (littleTTTSize/3) )];

        return this.playMove({game, pos});   
    }

    getGameToPlayIn(){
        if(this.history.length == 0){
            return [null, null];
        }

        const last = this.history[this.history.length-1];
        
        if(this.board[last.pos[0]][last.pos[1]].winner !== null){ //Check if the game you should play in is full
            return [null, null];
        }

        return last.pos;
    }

    cancelLastMove(){
        if(this.history.length == 0){
            return false;
        }

        const last = this.history.pop();

        this.board[last.game[0]][last.game[1]].board[last.pos[0]][last.pos[1]] = null;

        if(this.turn == TTT.X){
            this.turn = TTT.O;
        }else{
            this.turn = TTT.X;
        }

        this.winner = null;
        this.board[last.game[0]][last.game[1]].winner = null;

        return true;
    }

    reset(){
        this.board = [
            [new TTT(), new TTT(), new TTT()], 
            [new TTT(), new TTT(), new TTT()], 
            [new TTT(), new TTT(), new TTT()]
        ];
        this.winner = null;
        this.turn = TTT.X;

        this.history = [];
    }

    getWinner(){
        if(this.winner == TTT.X){
            return "X";
        } else if(this.winner == TTT.O){
            return "O";
        } else if (this.winner == TTT.XO){
            return "Draw";
        } else {
            return null;
        }
    }

    getPlayer(){
        if(this.turn == TTT.X){
            return "X";
        } else if(this.turn == TTT.O){
            return "O";
        } else {
            return null;
        }
    }

}