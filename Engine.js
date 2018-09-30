

class Engine {

    /**
     * 
     * @param {number} width game width
     * @param {number} height game height
     * @param {number} fps frames per second
     */
    constructor(width, height, fps){
        this.width = width;
        this.height = height;
        this.circles = [];

        this.keysDown = {};
        this.keysPressed = {};
        this.keysUp = {};

        let canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;
        canvas.id = "mycanvas";
        
        let ui_canvas = document.createElement("canvas");
        ui_canvas.width = this.width;
        ui_canvas.height = this.height;
        ui_canvas.id = "ui_canvas";
        this.ui_canvas = ui_canvas;
         
        
        //used to prevent scoping problems
        var self = this;
        window.onload= function(){
            self.initInputHandler();
            self.canvas = document.body.appendChild(canvas);  
            //sets the update function to repeat every 1000/fps milliseconds
            window.setInterval(
                function(){self.onUpdate();
                }, 
                1000/fps);
        }
        
    }

    /**
     * @param {gameCircle} circle circle to add to the update queue
     */
    addCircle(circle){
        this.circles.push(circle);
        circle.engine = this;
    }
    /**
     * @param {GameCircle} circle
     */
    drawCircle(circle){
        if(circle.offScreenCanvas){
            var ctxTo = this.canvas.getContext("2d");
            ctxTo.drawImage(circle.offScreenCanvas, circle.position_x, circle.position_y);
            
        }else{
            console.log("didn't have a renderable");
            circle.render();
            this.drawCircle(circle);
        }
        
        
    }

    onUpdate(){
        var ctx = this.canvas.getContext("2d");
        ctx.fillStyle = Engine.RGB(200,200,200);
        ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
        
        for (var c of this.circles){
            c.onUpdate();
            this.drawCircle(c);
            if(c.checksCollision == true){
                for(var c2 of this.circles){
                    if(c === c2){
                        continue;
                    }else{
                        if(this.Collides(c, c2)){
                            c.onCollide(c2);
                        }
                    }
                }
            }
        }
        for(var k in this.keysUp){this.keysUp[k]=false}
        for(var k in this.keysPressed){this.keysPressed[k]=false}
        
        this.updateUI();
        ctx.drawImage(this.ui_canvas, 0,0);

    }
    //implemented by game
    updateUI(){}
    /**
     *Constructs a css rgb string like 'rgb(0,0,0)'
     * Works with floating point values between 0 and 1 or integer values between 0 and 255
     * @param {number} red
     * @param {number} green
     * @param {number} blue
     */
    static RGB(red,green,blue){
        return "rgb("+red+","+green+","+blue+")";
    }
    /**
     * 
     * @param {GameCircle} circleA first circle to check with, if collision happens the onCollide function  is called on this circle
     * @param {GameCircle} circleB circle to check against
     */
    Collides(circleA, circleB){
        var x1 = circleA.x_position; var y1 = circleA.y_position;
        var x2 = circleB.x_position; var y2 = circleB.y_position;

        if(
            (x2-x1) * (x2-x1) + (y2-y1)*(y2-y1) 
            <= 
            (circleA.radius + circleB.radius)*(circleA.radius + circleB.radius)
        ){
            return true;
        }
        else {
            return false;
        }
    }

    initInputHandler(){
        let self = this;
        document.body.addEventListener("keyup", function(event){
            self.keysUp[event.code] = true;
            self.keysDown[event.code] = false;
        });
        document.body.addEventListener("keydown", function(event){
            self.keysPressed[event.code] = true;
            self.keysDown[event.code] = true;
        })
        
    }
}


//e.init();