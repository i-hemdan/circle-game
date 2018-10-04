import {GameObject} from "./GameObject.js";


export class Engine {

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
     * @param {GameObject} circle circle to add to the update queue
     */
    addCircle(circle){
        this.circles.push(circle);
        circle.engine = this;
        this.reIndexCircles();
    }
    /**
     * @param {GameObject} circle circle to remove from queue
     */
    removeCircle(circle){
        this.circles.splice(circle.index, 1);
        this.reIndexCircles();
    }
    /**
     * reassigns the indexes of the circles in the circles array
     */
    reIndexCircles(){
        for(var i in this.circles){
            this.circles[i].index = i;
        }
    }
    /**
     * @param {GameObject} circle
     */
    drawCircle(circle){
        if(circle.offScreenCanvas){
            var ctxTo = this.canvas.getContext("2d");
            ctxTo.drawImage(circle.offScreenCanvas, circle.position.x, circle.position.y);
            
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
        
        for (var circle1 of this.circles){
            circle1.onUpdate();
            this.drawCircle(circle1);
            if(circle1.checksCollision == true){
                for(var circle2 of this.circles){
                    if(circle1 === circle2){
                        continue;
                    }else{
                        if(this.Collides(circle1, circle2)){
                            circle1.onCollide(circle2);
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
    //implemented by Game.js
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
     * @param {GameObject} circleA first circle to check with, if collision happens the onCollide function  is called on this circle
     * @param {GameObject} circleB circle to check against
     */
    Collides(circleA, circleB){
        var radA = circleA.radius;
        var x1 = circleA.position.x + radA;
        var y1 = circleA.position.y + radA;

        
        var radB = circleB.radius;
        var x2 = circleB.position.x + radB;
        var y2 = circleB.position.y + radB;


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
            self.keysUp[event.key] = true;
            self.keysDown[event.key] = false;
        });
        document.body.addEventListener("keydown", function(event){
            self.keysPressed[event.key] = true;
            self.keysDown[event.key] = true;
        });
        
    }
}


//e.init();