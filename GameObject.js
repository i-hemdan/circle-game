import {Point} from "./Geom.js";

export class GameObject{
    /**
     * 
     * @param {number} x_position 
     * @param {number} y_position 
     * @param {number} radius
     * @param {number} speed
     * @param {string} color the rgb color in format 'rgb(0,0,0)'
     * @param {boolean} checksCollision if this circle responds to collision
     */
    constructor(x_position, y_position, radius, speed, color, checksCollision=false){
        this.speed = speed;
        this.position = new Point(x_position,y_position);
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
     * @param {number} x - how much to increment x_position 
     * @param {number} y - how much to increment y_position
     */
    move(x,y){
        this.x_position += x;
        this.y_position += y;
    }
    
    onUpdate(){}

    onCollide(other){}
    onKeyHold(keyCode){}
}