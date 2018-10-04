export class Point {
    /**
     * 
     * @param {Number} x_position Coordinate A, (a, x or w)
     * @param {Number} y_position Coordinate B, (b, y or h)
     */
    constructor(x_position = 0, y_position = 0){
        this.x = x_position;
        this.y = y_position;
    }
}


export class Rectangle{
    constructor(x_position = 0, y_position = 0, width = 0, height = 0){
        this.position = new Point(x_position, y_position);
        this.dimensions = new Point(width, height);
    }
    
    get x(){
        return this.position.x;
    }
    set x(value){
        this.position.x = value;
    }

    get y() {
        return this.position.y;
    }
    set y(value) {
        this.position.y = value;
    }

    get width(){
        return this.dimensions.x;
    }
    set width(value){
        this.dimensions.x = value;
    }

    get height(){
        return this.dimensions.y;
    }
    set height(value){
        this.dimensions.y = value;
    }
}
