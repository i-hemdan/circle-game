



function handleGameInput(circle){
    if(keyIsDown(LEFT_ARROW)){
        circle.move(-circle.speed, 0);
    }
    if(keyIsDown(RIGHT_ARROW)){
        circle.move(circle.speed, 0);
    }
    if(keyIsDown(UP_ARROW)){
        circle.move(0,-circle.speed);
    }
    if(keyIsDown(DOWN_ARROW)){
        circle.move(0,circle.speed);
    }
}

function generateCircle(maxRadius){
    var r = random(5, maxRadius - 1);
    var x = random(width);
    var y = random(height);
    return new gameCircle(x,y,r,0);
}


var genTimer = new circleGenerationTimer(1000);
var playerCircle = new gameCircle(10,10,20,5);
var circleFood = [];

function setup() {
    createCanvas(640,480);
    frameRate(30);
}

function draw() {
    background(100);
    handleGameInput(playerCircle);
    fill(0);
    ellipse(playerCircle.position_x, playerCircle.position_y, playerCircle.radius*2,playerCircle.radius*2);
    if(genTimer.elapse()){
        circleFood.push(generateCircle(playerCircle.radius));
    }

    fill(255,0,0);
    if(circleFood.length > 0){
        for(let i = 0; i < circleFood.length; i++){
            ellipse(circleFood[i].position_x, circleFood[i].position_y, circleFood[i].radius*2, circleFood[i].radius*2);
        }
    }
}