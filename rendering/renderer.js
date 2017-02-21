'use strict';

const fs = require('fs');
const config = require('./../config/config');
const Positioning = require('./../positioning/positioning');
const geometry = require('./../util/geometry');
const simulation = require('./../simulation/simulation');

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const startButton = document.getElementById('start-btn');
const roboXField = document.getElementById('roboX');
const roboYField = document.getElementById('roboY');

let robotX = config.robot.x;
let robotY = config.robot.y;

let tableStartX = 50;
let tableStartY = 50;

canvas.width = 1000;
canvas.height = 700;

context.strokeRect(tableStartX, tableStartY, 900, 600);

for (let circle of config.circles) {
    context.beginPath();
    context.arc(circle.x / 10 * 3 + tableStartX, circle.y / 10 * 3 + tableStartY, circle.radius / 10 * 3, 0, 2 * Math.PI);
    context.stroke();
}

context.beginPath();

context.moveTo(robotX / 10 * 3 + tableStartX - 10, robotY / 10 * 3 + tableStartY - 10);
context.lineTo(robotX / 10 * 3 + tableStartX + 10, robotY / 10 * 3 + tableStartY + 10);

context.moveTo(robotX / 10 * 3 + tableStartX + 10, robotY / 10 * 3 + tableStartY - 10);
context.lineTo(robotX / 10 * 3 + tableStartX - 10, robotY / 10 * 3 + tableStartY + 10);
context.stroke();

startButton.onclick = simulation.startSimulation;
