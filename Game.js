
import  {Point, Rectangle}  from "Geom.js";

let gameInstance = new Engine(800, 600,60);
let playerCircle = new PlayerCircle(10,10);
gameInstance.addCircle(playerCircle);

const enemyColor = Engine.RGB(255,0,0);

window.setInterval(
    function(){
        gameInstance.addCircle(
            new GameObject(
                Math.random() * gameInstance.width,
                Math.random() * gameInstance.height,
                Math.random() * 30,
                0,
                enemyColor));}, 
    2000);




gameInstance.updateUI = function(){
    let ctx = gameInstance.ui_canvas.getContext("2d");
    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
    ctx.fillStyle = Engine.RGB(0,0,0);
    ctx.font = "bold 40px Arial";
    
    ctx.fillText("SCORE:", 10, 40);
}

var p1 = new Point(1,2);
var box = new Rectangle(1,2,3,4);
console.log(p1.x + " " + p1.y + " " + " " + box.x, + " " + box.y + " " + box.width + " " + box.height);