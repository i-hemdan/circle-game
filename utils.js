
/**
 * 
 * @param {GameCircle} circle - uses circle.move to move circle by circle.speed in relevant 
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
 * @param {GameCircle} firstCircle the gameCircle to test against the gameCircles in restCircleArray
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

function drawPlayerCircle(){
    /**
     * p5.js function, 
     * sets the "pen" to black to prepare for drawing
     * really should be a variable in the gameCircle object
     */
    fill(0);

    /**
     * p5.js function,
     * draws an ellips with the current fill color
     * in this case, parameters are set to the corresponding playerCircle variabls
     * we used radius when defining size of gameCircles so we have to multiply by 2 to get
     * diameter which is what p5.js uses, I think.
     */
    ellipse(playerCircle.position_x, playerCircle.position_y, playerCircle.radius*2,playerCircle.radius*2);
}

function drawFoodCircles(circleFood){
    //sets "pen" to red to draw the food circles
    fill(255,0,0);
    if(circleFood.length > 0){
        //loop through circleFood and draw circles. similar to when the player circle was drawn above
        for(let i = 0; i < circleFood.length; i++){
            ellipse(circleFood[i].position_x, circleFood[i].position_y, circleFood[i].radius*2, circleFood[i].radius*2);
        }
        
    }
}

function handleCollision(playerCircle, circleFood){
    var collidedIndeces = checkCircleCollision(playerCircle, circleFood);
    //loop through collidedIndeces
    for(let i = 0; i < collidedIndeces.length; i++){
        playerCircle.radius += radiusIncrement;

        //built in js function, in this case removes 1 item at index provided by collidedIndeces
        circleFood.splice(collidedIndeces[i], 1);
    }
}