'use strict';

const Point = require('./point');

class Positioning {

    constructor (width, height) {
        this.width = width;      // 3000
        this.height = height;    // 2000
        this._maxDistance = Math.sqrt(width * width + height * height);
        this._minDiff = 300;
        this._maxOffset = 65;
        this._triangleSideOffset = 130;
        this._triangleSide = Math.sqrt(width * width + height * height / 4);
    }

    findBeacons (arr) {

        let beacons = [];
        let points = {};

        this._findPotentialBeacons(arr, points);

        // Check remaining points.

        let angles = Object.getOwnPropertyNames(points);
        let anglesSize = angles.length;

        for (let firstAngle = 0; firstAngle < anglesSize; firstAngle++) {

            let firstPointDist = points[angles[firstAngle]];

            for (let secondAngle = firstAngle + 1; secondAngle < anglesSize; secondAngle++) {

                let secondPointDist = points[angles[secondAngle]];
                let distFirstSecond = this._calculateDistance(firstPointDist, angles[firstAngle], secondPointDist, angles[secondAngle]);

                if (Math.abs(distFirstSecond - this.height) < this._maxOffset) {
                    // console.log(Math.abs(distFirstSecond - this.height));
                    for (let thirdAngle = secondAngle + 1; thirdAngle != firstAngle; thirdAngle = (thirdAngle + 1) % 360) {
                        
                        let thirdPointDist = points[angles[thirdAngle]];
                        let distFirstThird = this._calculateDistance(firstPointDist, angles[firstAngle], thirdPointDist, angles[thirdAngle]);
                        
                        if (Math.abs(distFirstThird - this._triangleSide) < this._triangleSideOffset) {
                            // console.log(Math.abs(distFirstThird - this._triangleSide));
                            let distSecondThird = this._calculateDistance(secondPointDist, angles[secondAngle], thirdPointDist, angles[thirdAngle]);
                            console.log(angles[firstAngle]);
                            console.log(angles[secondAngle]);
                            console.log(angles[thirdAngle]);
                            // console.log(this._triangleSide);
                            if (Math.abs(distSecondThird - this._triangleSide) < this._triangleSideOffset) {
                                // console.log(distSecondThird);
                                beacons.push([
                                    new Point(angles[firstAngle], firstPointDist),
                                    new Point(angles[secondAngle], secondPointDist),
                                    new Point(angles[thirdAngle], thirdPointDist)
                                ]);
                            }
                        }                        

                    }
                }

            }

        }

        return beacons; 

    }

    _findPotentialBeacons (arr, points) {

        let beacon = true;
        let angle = null;
        let start = 0;
        
        // Find starting beacon.
        for (let start = 0; start < arr.length; start = start + 1) {
            if (arr[start] < this._maxDistance) {
                if (arr[(start + 359) % 360] - arr[start] > this._minDiff) {
                    points[start] = arr[start];
                    angle = (start + 1) % 360;
                    break;
                }
            }
        }

        // Invalid if no starting beacon.
        if (angle === null) { 
            return;
        }

        // Find potential beacons.
        while (angle != start) {
            if (!beacon) {
                if (arr[angle] < this._maxDistance) {
                    if (arr[(angle + 359) % 360] - arr[angle] > this._minDiff) {
                        points[angle] = arr[angle];
                        beacon = true;
                    }
                }
            }
            else {
                if (arr[angle] < this._maxDistance) {
                    points[angle] = arr[angle];
                    if (arr[angle] - arr[(angle + 359) % 360] > this._minDiff) {
                        beacon = false;
                    }
                }
            }
            angle = (angle + 1) % 360;
        }

    }

    // Calculate distance using law of cosines.
    _calculateDistance (firstPointDist, firstAngle, secondPointDist, secondAngle) {

        let angle = (Math.PI / 180) * Math.abs(firstAngle - secondAngle);
        return Math.sqrt(firstPointDist * firstPointDist + secondPointDist * secondPointDist - 2 * firstPointDist * secondPointDist * Math.cos(angle));

    }

}

module.exports = Positioning;