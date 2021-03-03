# Simple Pendulum
## Title: Main
This a js format for the working of  simple pendulum simulator.
### Variables:
Tp:Time Period

Frs: Angular Frequency

Fhz:Frequency in Hertz

length:Length of string

start:Click to start the simulator

stop:Click to stop the simulator

ropeLength:Length of string

sineWave:Output 

canvas_width: Width of Canvas container. 

canvas_height: Length and width of Canvas container.

origin:Starting point of the pendulum

pendulum: 

### Functions:
anonymous ():The change event handler callback function to change the pendulum rope length by user input.

click start (): The click event handler callback function to start the simulator.

click stop (): The click event handler callback function to stop the simulator.

drawGraph (): Plotting the sine wave .

draw (): Animating the pendulum setup by setting the length.


# Pendulum
![set](https://github.com/gs-niteesh/vlabs-simple-pendulam/blob/main/images/setup.PNG?raw=true)

This a js format of simple pendulum simulator.
## Title: Pendulum
### Class and method:
#### Class-Vector: 
constructor(): initialing the coordinates and the radius of the ball.

addTo(): Incrementing the coordinates wrt to the position of the pendulum.

#### Class-Pendulum:

constructor():initialing the origin ,ropelength,boolean expression,angle.

reset(): initialing the velocity,accelration to zero ,angle = pi/2.

drawLine(): Outlining the rope connecting the bob and the fixed point.

drawBall(): Outlining the pendulum bob .

draw(): Animating the movement of the pendullum.

setAngle(): Initialising the angle theta.

getAngle(): Returning the angle.

setRopeLength(): Evaluating the RopeLength.

update():  Updating the parameters velocity,accelration,angle for an angle sweep.

getTimePeriod(): Returning the value of time period after one complete swing .

# Output
![output](https://github.com/gs-niteesh/vlabs-simple-pendulam/blob/main/images/output.PNG?raw=true)
