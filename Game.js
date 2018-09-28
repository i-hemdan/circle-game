
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
    
    //draws the player circle
    drawPlayerCircle();

    //elapse genTimer and see if we need a new circle, if we do, make one
    if(genTimer.elapse()){
        //push a generated circle made by generateCircle onto the circleFood array
        circleFood.push(generateCircle(playerCircle.radius));
    }

    //handles collision of player to food circles. increases size of player when colliding with circles
    handleCollision(playerCircle, circleFood)

    //draws all the food circles
    drawFoodCircles(circleFood);
    
}