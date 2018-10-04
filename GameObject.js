

class GameObject{
    /**
     * 
     * @param {number} position_x 
     * @param {number} position_y 
     * @param {number} radius
     * @param {number} speed
     * @param {string} color the rgb color in format 'rgb(0,0,0)'
     * @param {boolean} checksCollision if this circle responds to collision
     */
    constructor(position_x, position_y, radius, speed, color, checksCollision=false){
        this.speed = speed;
        this.position_x = position_x;
        this.position_y = position_y;
        this.radius = radius;
        this.color = color;
        this.checksCollision = checksCollision;
    }
    render(){
        this.offScreenCanvas = document.createElement("canvas");
        this.offScreenCanvas.width = this.radius*2+2;
        this.offScreenCanvas.height = this.radius*2+2
        var ctx = this.offScreenCanvas.getContext("2d");
        ctx.beginPath();
        ctx.arc(this.radius+1, this.radius+1, this.radius, 0, 2*Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    /**
     * 
     * @param {number} x - how much to increment position_x 
     * @param {number} y - how much to increment position_y
     */
    move(x,y){
        this.position_x += x;
        this.position_y += y;
    }
    
    onUpdate(){}

    onCollide(other){}
    onKeyHold(keyCode){}
}