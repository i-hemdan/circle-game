
/**
 * @type {circleGenerationTimer} instance of circleGenerationTimer to time circle spawning
 */
var genTimer = new circleGenerationTimer(1000);


/**
 * @type {gameCircle} - instance of gameCircle controlled by the player
 */
var playerCircle = new gameCircle(10,10,20,5);


/**
 * @type {Array<gameCircle>} - array of gameCircles used as food for the player gameCircle
 */
var circleFood = [];

/**
 * @type {number} - integer to increment radius of player circle by when the player consumes a circle
 */
var radiusIncrement = 2;

//setup function for p5.js
function setup() {
    //p5.js function, sets the resolution of the canvas within the page
    createCanvas(640,480);
    //p5.js function, sets the framerate for rendering
    frameRate(30);
}

//p5.js function, called every frame
function draw() {
    /**
     * p5.js function
     * sets background color
     * can take three arguments to set a specific color (r,g,b) or
     * if a single argument is given it uses that for r, g, and b.
     * Essentially a gray
     * 
     * in this instance, used to clear the background to a gray color to prepare for drawing
     * don't want overdraw
     */
    background(100);

    //handle the input every frame
    handleGameInput(playerCircle);
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
    
    //elapse genTimer and see if we need a new circle, if we do, make one
    if(genTimer.elapse()){
        //push a generated circle made by generateCircle onto the circleFood array
        circleFood.push(generateCircle(playerCircle.radius));
    }
    //sets "pen" to red to draw the food circles
    fill(255,0,0);
    if(circleFood.length > 0){
        //loop through circleFood and draw circles. similar to when the player circle was drawn above
        for(let i = 0; i < circleFood.length; i++){
            ellipse(circleFood[i].position_x, circleFood[i].position_y, circleFood[i].radius*2, circleFood[i].radius*2);
        }
        var collidedIndeces = checkCircleCollision(playerCircle, circleFood);
        //loop through collidedIndeces
        for(let i = 0; i < collidedIndeces.length; i++){
            playerCircle.radius += radiusIncrement;

            //built in js function, in this case removes 1 item at index provided by collidedIndeces
            circleFood.splice(collidedIndeces[i], 1);
        }
    }
    
}