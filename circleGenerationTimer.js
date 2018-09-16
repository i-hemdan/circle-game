

function circleGenerationTimer(interval){
    this.baseInterval = interval;
    this.curInterval = interval;
}
circleGenerationTimer.prototype.elapse = function(){
    if(millis() > this.curInterval) {
        this.curInterval += this.baseInterval;
        return true;
    }
    return false;
}