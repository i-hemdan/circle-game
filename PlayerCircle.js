
class PlayerCircle extends GameCircle{
    constructor(x_position, y_position){
        super(x_position, y_position, 10, 2, Engine.RGB(0,0,0), true);
    }

    /**
     * 
     * @param {GameCircle} other the circle collided with
     */
    onCollide(other){
        if(other.radius > this.radius){ 
            this.radius--;
        }else{
            this.radius++;
        }
    }
    onUpdate(){
        
        if(this.engine){
            
            let e = this.engine;
            if(e.keysDown["KeyA"]){
                if(this.position_x > 0) this.move(-this.speed, 0);
            }
            if(e.keysDown["KeyD"]){
                if(this.position_x + 2 * this.radius < e.width) this.move(this.speed, 0);
            }
            if(e.keysDown["KeyW"]){
                if(this.position_y > 0)this.move(0, -this.speed);
            }
            if(e.keysDown["KeyS"]){
                if(this.position_y + 2 * this.radius < e.height)this.move(0, this.speed);
            }
        }
    }
}