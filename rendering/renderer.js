const canvasBuffer = require('electron-canvas-to-buffer');
const fs = require('fs');

const canvas = document.getElementById('canvas');
canvas.width = 1300;
canvas.height = 900;
const context = canvas.getContext('2d');

context.strokeRect(50, 50, 1200, 800);
