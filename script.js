let game;
let undoButton;
let resetButton;

function setup() {
    createCanvas(1000, 600);

    game = new STTT({ x: 0, y: 0, size: height });
    undoButton = new ImageButton("undo.png", "undo_hover.png", "Undo", width - 150, 20, 50, 50);
    resetButton = new ImageButton("reset.png", "reset_hover.png", "Reset", width - 70, 20, 50, 50);

    undoButton.addOnClickListener(() => {
        game.cancelLastMove();
    });

    resetButton.addOnClickListener(() => {
        game.reset();
    });

    undoButton.addOnEnterListener(() => {
        undoButton.img = undoButton.hoverImage;
    });

    resetButton.addOnEnterListener(() => {
        resetButton.img = resetButton.hoverImage;
    });

    undoButton.addOnExitListener(() => {
        undoButton.img = undoButton.normalImage;
    });

    resetButton.addOnExitListener(() => {
        resetButton.img = resetButton.normalImage;
    });
}

function draw() {
    background(240);
    game.display();
    displayButtons();
    displayInformations();
}

function mouseClicked() {
    //check if the click was inside the game boundaries
    if (mouseX > game.boundaries.x && mouseX < game.boundaries.x + game.boundaries.size && mouseY > game.boundaries.y && mouseY < game.boundaries.y + game.boundaries.size) {
        game.mouseClicked();
    }

    undoButton.mouseClicked();
    resetButton.mouseClicked();
}

function displayButtons() {
    undoButton.display();
    resetButton.display();
}

function mouseMoved() {
    undoButton.mouseMoved();
    resetButton.mouseMoved();
}

function displayInformations(){
    
    if(game.winner == null){
        //Display information about who is the player
        textSize(80);
        textStyle(BOLD);
        fill("#00FF00");
        textAlign(CENTER, CENTER);
        text(game.getPlayer(), (width+height)/2, height/2);
        textSize(25);
        textAlign(LEFT, BOTTOM);
        textStyle(NORMAL);
        fill(0);
        text("to play", (width+height)/2+35, height/2+30)
    } else {
        //Display information about who won
        if(game.winner != TTT.XO){
            textSize(80);
            textStyle(BOLD);
            fill("#00FF00");
            textAlign(CENTER, CENTER);
            text(game.getWinner(), (width+height)/2, height/2);
            textSize(25);
            textAlign(LEFT, BOTTOM);
            textStyle(NORMAL);
            fill(0);
            text("won", (width+height)/2+35, height/2+30)
        } else {
            textSize(80);
            textStyle(BOLD);
            fill("#00FF00");
            textAlign(CENTER, CENTER);
            text(game.getWinner(), (width+height)/2, height/2);
        }

    }
}

