let game;
let buttons;

function setup() {
    //Get document size from window
    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;

    createCanvas(screenWidth * 0.9, screenHeight * 0.9);

    game = new STTT({ x: 0, y: 0, size: min(width, height) });
    buttons = {
        reset: new ImageButton("assets/reset.png", "assets/reset_hover.png", "Reset", width - 70, 20, 50, 50),
        undo: new ImageButton("assets/undo.png", "assets/undo_hover.png", "Undo", width - 150, 20, 50, 50),
        info: new ImageButton("assets/info.png", "assets/info_hover.png", "Info", width - 230, 20, 50, 50)
    }
    if (width < height) {
        buttons.info.x = 20;
        buttons.info.y = height - 90;

        buttons.undo.x = 90;
        buttons.undo.y = height - 90;

        buttons.reset.x = 160;
        buttons.reset.y = height - 90;
    }

    addButtonsListeners();
}

function draw() {
    background(240);
    game.display();
    displayButtons();
    displayInformations();
}

function mouseClicked() {
    if(!isLooping()) return false;
    //check if the click was inside the game boundaries
    if (mouseX > game.boundaries.x && mouseX < game.boundaries.x + game.boundaries.size && mouseY > game.boundaries.y && mouseY < game.boundaries.y + game.boundaries.size) {
        game.mouseClicked();
    }

    for (const button in buttons) {
        buttons[button].mouseClicked();
    }
}

function displayButtons() {
    for (const button in buttons) {
        buttons[button].display();
    }
}

function mouseMoved() {
    for (const button in buttons) {
        buttons[button].mouseMoved();
    }
}

function displayInformations() {
    if (width > height) {

        if (game.winner == null) {
            //Display information about who is the player
            textSize(80);
            textStyle(BOLD);
            fill("#00FF00");
            textAlign(CENTER, CENTER);
            text(game.getPlayer(), (width + height) / 2, height / 2);
            textSize(25);
            textAlign(LEFT, BOTTOM);
            textStyle(NORMAL);
            fill(0);
            text("to play", (width + height) / 2 + 35, height / 2 + 30)
        } else {
            //Display information about who won
            if (game.winner != TTT.XO) {
                textSize(80);
                textStyle(BOLD);
                fill("#00FF00");
                textAlign(CENTER, CENTER);
                text(game.getWinner(), (width + height) / 2, height / 2);
                textSize(25);
                textAlign(LEFT, BOTTOM);
                textStyle(NORMAL);
                fill(0);
                text("won", (width + height) / 2 + 35, height / 2 + 30)
            } else {
                textSize(80);
                textStyle(BOLD);
                fill("#00FF00");
                textAlign(CENTER, CENTER);
                text(game.getWinner(), (width + height) / 2, height / 2);
            }

        }
    } else {
        if (game.winner == null) {
            //Display information about who is the player
            textSize(80);
            textStyle(BOLD);
            fill("#00FF00");
            textAlign(CENTER, TOP);
            text(game.getPlayer(), width / 2, width);
            textSize(25);
            textAlign(LEFT, TOP);
            textStyle(NORMAL);
            fill(0);
            text("to play", width / 2 + 30, width + 40);
        } else {
            //Display information about who won
            if (game.winner != TTT.XO) {
                textSize(80);
                textStyle(BOLD);
                fill("#00FF00");
                textAlign(CENTER, CENTER);
                text(game.getWinner(), (width + height) / 2, height / 2);
                textSize(25);
                textAlign(LEFT, BOTTOM);
                textStyle(NORMAL);
                fill(0);
                text("won", (width + height) / 2 + 35, height / 2 + 30)
            } else {
                textSize(80);
                textStyle(BOLD);
                fill("#00FF00");
                textAlign(CENTER, CENTER);
                text(game.getWinner(), (width + height) / 2, height / 2);
            }
        }
    }
}

function addButtonsListeners() {
    buttons.undo.addOnClickListener(() => {
        game.cancelLastMove();
    });

    buttons.reset.addOnClickListener(() => {
        game.reset();
    });

    buttons.info.addOnClickListener(() => {
        loadStrings("assets/rules.html", (strings) => {
            const rules = strings.join("");
            const div = createDiv(rules);
            div.style("position", "absolute");

            div.style("left", width*0.05+"px");
            div.style("width", width*0.8+"px");

            div.style("top", height*0.05+"px");
            div.style("height", height*0.8+"px");

            div.style("background-color", "white");
            div.style("overflow", "auto");
            div.style("padding-top", height*0.05+"px");
            div.style("padding-bottom", height*0.05+"px");
            div.style("padding-right", width*0.05+"px");
            div.style("padding-left", width*0.05+"px");

            div.show();

            noLoop();

            div.child(createButton("Close").mousePressed(() => {
                div.hide();
                loop();
            }));
        });
    })

    for (const button in buttons) {
        buttons[button].addDefaultHoverBehaviour();
    }
}
