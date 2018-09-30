
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
                this.move(-this.speed, 0);
            }
            if(e.keysDown["KeyD"]){
                this.move(this.speed, 0);
            }
            if(e.keysDown["KeyW"]){
                this.move(0, -this.speed);
            }
            if(e.keysDown["KeyS"]){
                this.move(0, this.speed);
            }
        }
    }
}