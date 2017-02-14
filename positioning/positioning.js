
const Point = require('./point');

class Positioning {

    constructor (width, height) {
        this.width = width;
        this.height = height;
        this._maxDistance = Math.sqrt(width * width + height * height);
        this.minDiff = 300;
        this.maxOffset = 65; 
    }

    findBeacons (arr) {

        let beacons = [];
        let points = {};
        let beacon = true;
        let angle = null;

        for (let start in arr) {
            if (arr[angle] < this._maxDistance) {
                if (arr[angle] - arr[angle + 1] > this.minDiff) {
                    points[start] = arr[start];
                    angle = start + 1;
                    break;
                }
            }
        }

        // Cannot find start of a beacon; invalid data.
        
        if (angle === null) { 
            return [];
        }

        while (angle != start) {
            if (!beacon) {
                if (arr[angle] < this._maxDistance) {
                    if (arr[angle] - arr[(angle + 1) % 360] > this.minDiff) {
                        points[angle] = arr[angle];
                        beacon = true;
                    }
                }
            }
            else {
                if (arr[angle] < this._maxDistance) {
                    points[angle] = arr[angle];
                    if (arr[(angle + 1) % 360] - arr[angle] > this.minDiff) {
                        beacon = false;
                    }
                }
            }
            angle = (angle + 1) % 360;
        }

        // Check remaining points.

        let angles = Object.getOwnPropertyNames(points);
        let anglesSize = angles.length;

        for (let firstPoint = 0; firstPoint < anglesSize; firstPoint++) {
            for (let secondPoint = firstPoint + 1; secondPoint < anglesSize; secondPoint++) {
                for (let thirdPoint = secondPoint + 1; thirdPoint < anglesSize; thirdPoint++) {
                    // Check if these three points make triangle.
                }
            }
        }

        return beacons; 

    }

}

module.exports = Positioning;