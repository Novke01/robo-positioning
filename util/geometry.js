
let geometry = {

    calculateIntersection: calculateIntersection

};

function calculateIntersection (circle, lineA, lineB, lineC, robot) {
    if (lineA === 0) {
        let y = -lineC / lineB;
        let a = 1;
        let b = -2 * circle.x;
        let c = circle.x * circle.x + (y - circle.y) * (y - circle.y) - circle.radius * circle.radius;
        let disc = b * b - 4 * a * c;

        if (disc < 0) {
            return null;
        }

        let x1 = (-b + Math.sqrt(disc)) / (2 * a);
        let x2 = (-b - Math.sqrt(disc)) / (2 * a);

        // return closest
        let dist1 = calculateDistance(robot.x, robot.y, x1, y);
        let dist2 = calculateDistance(robot.x, robot.y, x2, y);

        return (dist1 < dist2) ? dist1 : dist2;
        
    }
    else {
        let temp = lineB / lineA;
        let a = temp * temp + 1;
        let b = 2 * (temp * lineC / lineA + temp * circle.x - circle.y);
        let c = lineC * lineC / (lineA * lineA) + 2 * lineC / lineA * circle.x + circle.x * circle.x + circle.y * circle.y - circle.radius * circle.radius;
    
        let disc = b * b - 4 * a * c; // discriminant

        if (disc < 0) {
            return null;
        }

        let y1 = (-b + Math.sqrt(disc)) / (2 * a);
        let x1 = -(lineB * y1 + lineC) / lineA;

        let y2 = (-b - Math.sqrt(disc)) / (2 * a);
        let x2 = -(lineB * y2 + lineC) / lineA;

        // return closest
        let dist1 = calculateDistance(robot.x, robot.y, x1, y1);
        let dist2 = calculateDistance(robot.x, robot.y, x2, y2);

        return (dist1 < dist2) ? dist1 : dist2;

    }

}

function calculateDistance (x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}

module.exports = geometry;