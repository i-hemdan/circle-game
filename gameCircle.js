
var gameCircle = function(position_x,position_y,radius, speed){
    this.speed = speed;
    this.position_x = position_x;
    this.position_y = position_y;
    this.radius = radius;
}
gameCircle.prototype.move = function(x,y){
    this.position_x += x;
    this.position_y += y;
}