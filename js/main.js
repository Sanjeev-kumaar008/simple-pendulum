class Vector {
    constructor (x, y) {
        this.x = x;
        this.y = y;
        this.ballRadius = 20;
    }

    addTo(vector) {
        this.x += vector.x;
        this.y += vector.y;
    }
}

class Pendulam {
    constructor (origin, ropeLength) {
        this.origin = origin;
        this.ropeLength = ropeLength;
        this.ballRadius = 20;
        this.gravity = 9.8;
        this.REAL_FACTOR = 25;
        this.simlation_running = false;
        this.reset();
        this.angle = 0;
    }

    reset() {
        this.angle = Math.PI / 2;
        this.vel = 0;
        this.acc = 0;
    }

    drawLine(ctx, x, y) {
        ctx.beginPath();
        ctx.moveTo(this.origin.x, this.origin.y);
        ctx.lineTo(x, y);
        ctx.strokeStyle = '#FF0000';
        ctx.stroke();
        ctx.closePath();
    }

    drawBall(ctx, x, y) {
        ctx.beginPath();
        ctx.arc(x, y, this.ballRadius, 0, 2 * Math.PI);
        ctx.fillStyle = "black";
        ctx.fill()
        ctx.closePath();
    }

    draw(ctx) {
        let x, y;
        // if (this.simlation_running) {
            x = this.origin.x
                    + this.ropeLength * Math.cos(Math.PI / 2 + this.angle);
            y = this.origin.y
                    + this.ropeLength * Math.sin(Math.PI / 2 + this.angle);
        // }
        this.drawLine(ctx, x, y);
        this.drawBall(ctx, x, y);
    }

    setAngle(theta) {
        this.angle = theta;
    }

    getAngle() {
        return this.angle;
    }

    setRopeLength() {
        let length = document.getElementById("length");
        length = parseInt(length.value);
        this.ropeLength = length;
    }

    update() {
        console.log('angle: ', this.angle);
        if (!this.simlation_running) {
            return;
        }

        this.acc = (-1 * this.gravity / this.ropeLength) * Math.sin(this.angle);
        this.vel += this.acc;
        this.angle += (this.vel / this.REAL_FACTOR);
    }

    getTimePeriod() {
        return 2 * Math.PI * Math.sqrt(this.ropeLength / this.gravity);
    }
}

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let Tp = document.getElementById("Tp");
let Frs = document.getElementById("Frs");
let Fhz = document.getElementById("Fhz");
let length = document.getElementById("length");
let start = document.getElementById("start");
let stop = document.getElementById("stop");

let ropeLength = parseInt(length.value);
let sineWave = [];

let canvas_width = canvas.parentElement.clientWidth;
let canvas_height = 600;

// Set resolution for canvas
canvas.width = canvas_width;
canvas.height = canvas_height;

let origin = new Vector(canvas_width / 2, 105);
let pendulam = new Pendulam(origin, ropeLength);

length.addEventListener('change', function(val){
    pendulam.ropeLength = parseInt(val.target.value);
});

start.addEventListener('click', function(){
    if (pendulam.angle == 0)
        pendulam.angle = Math.PI / 2;
    pendulam.simlation_running = true;
});

stop.addEventListener('click', function(){
    pendulam.simlation_running = false;
});

function drawGraph(angle) {
    ctx.beginPath();
    ctx.moveTo(200, 400);
    ctx.lineTo(200, 580);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(200, 490);
    ctx.lineTo(500, 490);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();

    if (pendulam.simlation_running) {
        if (sineWave.length >= 300)
            sineWave.shift();
        sineWave.push(Math.PI / 2 - angle);
    }

    ctx.beginPath();
    ctx.fillStyle = "blue";
    sineWave.slice().reverse().forEach(function (val, index) {
        ctx.fillRect(200 + index, 490 + 20 * (val - Math.PI / 2), 1, 2);
    });
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Amplitude", 100, 420, 90);
    ctx.fillText("Time", 500, 520, 70);
    ctx.closePath();

}

let c = 0;
function draw() {
    // Clear the screen
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas_width, canvas_height);

    // Draw the Pendulam
    pendulam.update()
    pendulam.draw(ctx);

    Tp.innerText = (pendulam.getTimePeriod() / 10).toFixed(3) + 's';
    let hz = (1 / (pendulam.getTimePeriod() / 10)).toFixed(3);
    Fhz.innerText = hz + ' Hz';
    Frs.innerText = (hz * 2 * Math.PI).toFixed(4) + ' rad/s';

    drawGraph(pendulam.getAngle());

    requestAnimationFrame(draw);
}

requestAnimationFrame(draw);
