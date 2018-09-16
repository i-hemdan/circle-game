
/**
 * 
 * @param {gameCircle} circle - uses circle.move to move circle by circle.speed in relevant 
 * direction when arrow keys are pressed.
 */
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
/**
 * 
 * @param {number} maxRadius - the maximum radius the generated circle can have
 * currently the minum radius is hard coded to 5 
 */
function generateCircle(maxRadius){
    //random number between 5 and maxRadius
    var r = random(5, maxRadius - 1);
    //random number between 0 and the width of the frame
    var x = random(width);
    //random number between 0 and the height of the frame
    var y = random(height);
    //returns a new gameCircle at the position x,y with radius r and speed of 0 as the food circles dont move
    return new gameCircle(x,y,r,0);
}

/**
 * 
 * @param {gameCircle} firstCircle the gameCircle to test against the gameCircles in restCircleArray
 * @param {Array<gameCircle>} restCircleArray the array of gameCircles tested against firstCircle
 * @return {Array<number>} - returns an array of indeces of gameCircles within restCircleArray
 *  firstCircle collided with to be used to index the 
 * restCircleArray after checking if collided with firstCircle
 */
function checkCircleCollision(firstCircle, restCircleArray){
    //initialize array to be returned
    var collided = [];

    /**
     * using square distance
     * (x2-x1)^2 + (y2-y1)^2 <= (r1+r2)^2
     * checks if the square distance of positions of two circles
     * is higher than the square of the sum of the circles radii
     */
    var x1 = firstCircle.position_x;
    var y1 = firstCircle.position_y;
    for(let i = 0; i < restCircleArray.length; i++){
        var x2 = restCircleArray[i].position_x;
        var y2 = restCircleArray[i].position_y;
        //if a collision occurs, push the index of the circle to the collided array
        if( (x2-x1)*(x2-x1) + (y2-y1)*(y2-y1) <= (firstCircle.radius+restCircleArray[i].radius)*(firstCircle.radius+restCircleArray[i].radius) ){
            collided.push(i);
        }
    }

    return collided;
}