'use strict';

const config = require('./../config/config');
const Positioning = require('./../positioning/positioning');
const geometry = require('./../util/geometry');
const simulation = require('./../simulation/simulation');
const drawing = require('./../util/drawing');

const startButton = document.getElementById('start-btn');
const roboXField = document.getElementById('roboX');
const roboYField = document.getElementById('roboY');

let robotX = config.robot.x;
let robotY = config.robot.y;

roboXField.value = robotX;
roboYField.value = robotY;

drawing.drawField(1000, 700);

for (let circle of config.circles) {
    drawing.drawCircle(robotX, robotY, circle);
}

drawing.drawRobot(robotX, robotY);

startButton.onclick = startSimulation;

function startSimulation () {

    robotX = Number(roboXField.value);
    robotY = Number(roboYField.value);
    config.robot.x = robotX;
    config.robot.y = robotY;
    
    drawing.clearCanvas();
    drawing.drawField(1000, 700);
    for (let circle of config.circles) {
        drawing.drawCircle(robotX, robotY, circle);
    }
    drawing.drawRobot(robotX, robotY);
    
    let beacons = simulation.startSimulation(config);

    console.log(beacons);

    for (let triangle of beacons) {
        drawing.drawTriangle(robotX, robotY, triangle);
    }

}
