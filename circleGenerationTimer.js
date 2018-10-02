
/**
 *
 * @param {number} interval - timer interval, integer in milliseconds
 */
class circleGenerationTimer {
    constructor(interval) {
        /** @type {number} - integer in milliseconds*/
        this.baseInterval = interval;
        /** @type {number} - integer in milliseconds*/
        this.curInterval = interval;
    }
    /**
     * @return {boolean} increments curInterval by baseInterval every time p5.js millis() reaches curInterval.
     * returns true if millis() reaches curInterval.
     * returns false if millis() has not reached curInterval.
     */
    elapse() {
        //check if millis() reached curInterval yet
        if (millis() > this.curInterval) {
            //increment curInterval by baseInterval
            this.curInterval += this.baseInterval;
            //returns true because millis() elapsed curInterval
            return true;
        }
        //returns false because millis() has not elapsed curInterval
        return false;
    }
}
