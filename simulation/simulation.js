'use strict';

const config = require('./../config/config');
const geometry = require('./../util/geometry');
const Positioning = require('./../positioning/positioning');

let simulation = {
    startSimulation: startSimulation
};

function startSimulation () {

    // robotX = roboXField.value;
    // robotY = roboYField.value;
    let points = collectPoints(config);
    console.log(points);
    let positioning = new Positioning(config.field.width, config.field.height);
    let beacons = positioning.findBeacons(points);
    console.log(beacons);
    for (let triangle of beacons) {
        console.log('====================================================');
        for (let point of triangle) {
            console.log(point.angle);
            console.log(point.dist);
            // console.log((config.robot.x + Math.sin(point.angle * Math.PI / 180) * point.dist) + ' ' + (config.robot.y - Math.cos(point.angle * Math.PI / 180) * point.dist));
        }
    }
    // draw all points;

}

function collectPoints (config) {
    let points = [];
    for (let angle = 0; angle < 360; angle++) {
        let a = 0;
        let b = 0;
        let c = 0;
        let dist = Infinity;
        let circles = [];
        if (angle === 0 || angle === 180) {
            a = -1;
            b = 0;
            c = config.robot.x;
        }
        else {
            a = -Math.tan(angle * Math.PI / 180);
            b = 1;
            c = -(config.robot.x * a + config.robot.y * b);
        }
        circles = filterCircles(angle, a, b, config.robot.x, config.robot.y, config.circles);
        for (let circle of circles) {
            let intersection = geometry.calculateIntersection(circle, a, b, c, config.robot);
            if (intersection !== null && dist > intersection) {
                dist = intersection;
            }
        }
        points.push(dist);
    }
    return points;
}

function filterCircles (angle, lineA, lineB, robotX, robotY, circles) {
    let a = 0;
    let b = 0;
    let c = 0;
    let filter = null;
    if (lineA === 0) {
        a = 1;
        b = 0;
        c = -robotX;
    }
    else {
        a = -lineB / lineA;
        b = 1;
        c = -(robotX * a + robotY * b);
    }
    if ((angle > 270 && angle < 360) || (angle >= 0 && angle < 90)) {
        filter = makeIsOver(a, b, c);
    }
    else if (angle > 90 && angle < 270) {
        filter = makeIsUnder(a, b, c);
    }
    else if (angle === 90) {
        filter = makeIsRight(robotX);
    }
    else if (angle === 270) {
        filter = makeIsLeft(robotX);
    }
    return circles.filter(filter);
}

function makeIsOver (a, b, c) {
    return function (circle) {
        return a * circle.x + b * circle.y + c < 0;
    };
}

function makeIsUnder (a, b, c) {
    return function (circle) {
        return a * circle.x + b * circle.y + c > 0;
    };
}

function makeIsLeft (x) {
    return function (circle) {
        return x > circle.x;
    };
}

function makeIsRight (x) {
    return function (circle) {
        return x < circle.x;
    };
}

module.exports = simulation;