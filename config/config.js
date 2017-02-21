'use strict';

// Object that contains all of object's positions on a field.

let config = {
    field: {
        width: 3000,
        height: 2000
    },
    circles: [
        {
            x: 0,
            y: 0,
            radius: 65
        },
        {
            x: 3000,
            y: 1000,
            radius: 65
        },
        {
            x: 0,
            y: 2000,
            radius: 65
        },
        {
            x: 1500,
            y: 65,
            radius: 65
        },
        {
            x: 1200,
            y: 65,
            radius: 65
        },
        {
            x: 1800,
            y: 65,
            radius: 65
        }
    ],
    robot: {
        x: 2000,
        y: 1500
    }
};

module.exports = config;
