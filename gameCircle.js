/**
 * 
 * @param {number} position_x 
 * @param {number} position_y 
 * @param {number} radius
 * @param {number} speed
 */
var gameCircle = function(position_x,position_y,radius, speed){
    this.speed = speed;
    this.position_x = position_x;
    this.position_y = position_y;
    this.radius = radius;
}
/**
 * 
 * @param {number} x - how much to increment position_x 
 * @param {number} y - how much to increment position_y
 */
gameCircle.prototype.move = function(x,y){
    this.position_x += x;
    this.position_y += y;
}