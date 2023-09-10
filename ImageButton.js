class ImageButton {
    constructor(imagePath, hoverPath, label, x, y, w, h) {
        this.path = imagePath;
        this.hoverPath = hoverPath;
        this.normalImage = loadImage(this.path);
        this.hoverImage = loadImage(this.hoverPath);
        this.img = this.normalImage;
        this.label = label;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.hover = false;
        
    }

    mouseClicked() {
        //Check if the click was inside the button
        if(mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h){
            if(this.click){
                for(const f of this.click){
                    f();
                }
            }
        }
    }

    mouseMoved(){
        //Check if the mouse is inside the button
        if(mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h){
            if(!this.hover && this.enter){
                for(const f of this.enter){
                    f();
                }
            }   
            this.hover = true;
        } else {
            if(this.hover && this.exit){
                for(const f of this.exit){
                    f();
                }
            }
            this.hover = false;
        }
    }

    display() {
        fill(0);
        if(this.label){
            textSize(20);
            textAlign(CENTER, TOP);
            text(this.label, this.x+this.w/2, this.y+this.h);
        }

        this.img.resize(this.w, this.h);
        image(this.img, this.x, this.y);   
        
    }

    addOnClickListener(listener) {
        if(this.click) this.click.push(listener);
        else this.click = [listener];
    }

    addHoverListener(listener) {
        if(this.onHover) this.onHover.push(listener);
        else this.onHover = [listener];
    }

    addOnEnterListener(listener) {
        if(this.enter) this.enter.push(listener);
        else this.enter = [listener];
    }

    addOnExitListener(listener) {
        if(this.exit) this.exit.push(listener);
        else this.exit = [listener];
    }

    addDefaultHoverBehaviour(){
        this.addOnEnterListener(() => {
            this.img = this.hoverImage;
        });
        
        this.addOnExitListener(() => {
            this.img = this.normalImage;
        });
    }

}