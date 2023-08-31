let game;

function setup() {
  createCanvas(600, 600);

  game = new STTT();
}

function draw() {
    background(240);
    game.display();
}

function mouseClicked(){
    //game.mouseClicked({x: 0, y: 0, size: width}, TTT.X);

}