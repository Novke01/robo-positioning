'use strict';

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const drawing = {
    drawField: drawField,
    drawCircle: drawCircle,
    drawTriangle: drawTriangle,
    drawRobot: drawRobot,
    clearCanvas: clearCanvas
};

const tableStartX = 50;
const tableStartY = 50;

function drawField (width, height) {

    canvas.width = width;
    canvas.height = height;

    context.strokeRect(tableStartX, tableStartY, 900, 600);

}

function drawCircle (robotX, robotY, circle) {

        context.beginPath();
        context.arc(circle.x / 10 * 3 + tableStartX, circle.y / 10 * 3 + tableStartY, circle.radius / 10 * 3, 0, 2 * Math.PI);
        context.stroke();
    
}

function drawTriangle (robotX, robotY, triangle) {
    
    context.beginPath();

    context.moveTo(tableStartX + (robotX + Math.cos(triangle[0].angle * Math.PI / 180) * triangle[0].dist) / 10 * 3, 
                   tableStartY + (robotY + Math.sin(triangle[0].angle * Math.PI / 180) * triangle[0].dist) / 10 * 3);
    context.lineTo(tableStartX + (robotX + Math.cos(triangle[1].angle * Math.PI / 180) * triangle[1].dist) / 10 * 3, 
                   tableStartY + (robotY + Math.sin(triangle[1].angle * Math.PI / 180) * triangle[1].dist) / 10 * 3);
    context.lineTo(tableStartX + (robotX + Math.cos(triangle[2].angle * Math.PI / 180) * triangle[2].dist) / 10 * 3, 
                   tableStartY + (robotY + Math.sin(triangle[2].angle * Math.PI / 180) * triangle[2].dist) / 10 * 3);
    context.lineTo(tableStartX + (robotX + Math.cos(triangle[0].angle * Math.PI / 180) * triangle[0].dist) / 10 * 3, 
                   tableStartY + (robotY + Math.sin(triangle[0].angle * Math.PI / 180) * triangle[0].dist) / 10 * 3);
    
    context.stroke();

}

function drawRobot (robotX, robotY) {

    context.beginPath();

    context.moveTo(robotX / 10 * 3 + tableStartX - 10, robotY / 10 * 3 + tableStartY - 10);
    context.lineTo(robotX / 10 * 3 + tableStartX + 10, robotY / 10 * 3 + tableStartY + 10);

    context.moveTo(robotX / 10 * 3 + tableStartX + 10, robotY / 10 * 3 + tableStartY - 10);
    context.lineTo(robotX / 10 * 3 + tableStartX - 10, robotY / 10 * 3 + tableStartY + 10);

    context.stroke();

}

function clearCanvas () {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

module.exports = drawing;