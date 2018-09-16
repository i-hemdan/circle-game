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

//returns an array of indeces of collided circles
function checkCircleCollision(firstCircle, restCircleArray){
    var collided = [];
    var x1 = firstCircle.position_x;
    var y1 = firstCircle.position_y;
    for(let i = 0; i < restCircleArray.length; i++){
        var x2 = restCircleArray[i].position_x;
        var y2 = restCircleArray[i].position_y;

        if( (x2-x1)*(x2-x1) + (y2-y1)*(y2-y1) <= (firstCircle.radius+restCircleArray[i].radius)*(firstCircle.radius+restCircleArray[i].radius) ){
            collided.push(i);
        }
    }

    return collided;
}