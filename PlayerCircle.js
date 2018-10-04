import {GameObject} from "./GameObject.js";
import {Engine} from "./Engine.js";

export class PlayerCircle extends GameObject{
    constructor(x_position, y_position){
        super(x_position, y_position, 10, 1, Engine.RGB(0,0,0), true);
    }

    /**
     * 
     * @param {GameObject} other the circle collided with
     */
    onCollide(other){
        if(other.radius > this.radius){ 
            this.radius--;
            this.render();
        }else{
            console.log("hit");
            this.radius++;
            this.engine.removeCircle(other);
            this.render();
        }

        if(this.radius <= 0){
            this.position.x = -10;
            this.position.y = -10;
            alert("you fuckin lost!");
        }
    }
    onUpdate(){
        
        if(this.engine){
            
            let e = this.engine;
            if(e.keysDown["a"]){
                if(this.position.x > 0) this.move(-this.speed, 0);
                console.log("a pressed");
            }
            if(e.keysDown["d"]){
                if(this.position.x + 2 * this.radius < e.width) this.move(this.speed, 0);
            }
            if(e.keysDown["w"]){
                if(this.position.y > 0)this.move(0, -this.speed);
            }
            if(e.keysDown["s"]){
                if(this.position.y + 2 * this.radius < e.height)this.move(0, this.speed);
            }
        }
    }
}