


let gameInstance = new Engine(800, 600,60);
let playerCircle = new PlayerCircle(10,10);
gameInstance.addCircle(playerCircle);
gameInstance.updateUI = function(){
    let ctx = gameInstance.ui_canvas.getContext("2d");
    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
    ctx.fillStyle = Engine.RGB(0,0,0);
    ctx.font = "bold 40px Arial";
    
    ctx.fillText("SCORE:", 10, 40);
}