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
    // console.log(points);
    let positioning = new Positioning(config.field.width, config.field.height);
    let beacons = positioning.findBeacons(points);
    console.log(beacons);
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    for (let triangle of beacons) {
        // console.log('====================================================');
        ctx.beginPath();
        ctx.moveTo(50 + (config.robot.x + Math.cos(triangle[0].angle * Math.PI / 180) * triangle[0].dist) / 10 * 3, 50 + (config.robot.y + Math.sin(triangle[0].angle * Math.PI / 180) * triangle[0].dist) / 10 * 3);
        ctx.lineTo(50 + (config.robot.x + Math.cos(triangle[1].angle * Math.PI / 180) * triangle[1].dist) / 10 * 3, 50 + (config.robot.y + Math.sin(triangle[1].angle * Math.PI / 180) * triangle[1].dist) / 10 * 3);
        ctx.lineTo(50 + (config.robot.x + Math.cos(triangle[2].angle * Math.PI / 180) * triangle[2].dist) / 10 * 3, 50 + (config.robot.y + Math.sin(triangle[2].angle * Math.PI / 180) * triangle[2].dist) / 10 * 3);
        ctx.lineTo(50 + (config.robot.x + Math.cos(triangle[0].angle * Math.PI / 180) * triangle[0].dist) / 10 * 3, 50 + (config.robot.y + Math.sin(triangle[0].angle * Math.PI / 180) * triangle[0].dist) / 10 * 3);
        ctx.stroke();
    }
    
}

function collectPoints (config) {
    let points = [];
    for (let angle = 0; angle < 360; angle++) {
        let a = 0;
        let b = 0;
        let c = 0;
        let dist = Infinity;
        let circles = [];
        if (angle === 90 || angle === 270) {
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
    if (angle > 0 && angle < 180) {
        filter = makeIsUnder(a, b, c);
    }
    else if (angle > 180 && angle < 360) {
        filter = makeIsOver(a, b, c);
    }
    else if (angle === 0) {
        filter = makeIsRight(robotX);
    }
    else if (angle === 180) {
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