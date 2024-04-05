'use strict';

///////////////////////////////////////////////////////
// Coding Challenge #1

/*
Your tasks:
1. Use a constructor function to implement a 'Car'. A car has a 'maker' and a
'speed' property. The 'speed' property is the current speed of the car in
km/h
2. Implement an 'accelerate' method that will increase the car's speed by 10,
and log the new speed to the console
3. Implement a 'brake' method that will decrease the car's speed by 5, and log
the new speed to the console
4. Create 2 'Car' objects and experiment with calling 'accelerate' and
'brake' multiple times on each of them
Test data:
    Data car 1: 'BMW' going at 120 km/h
    Data car 2: 'Mercedes' going at 95 km/h
*/

const Car = function (maker, speed) {
  this.maker = maker;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.maker} new speed: ${this.speed}`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.maker} new speed: ${this.speed}`);
};

const carBMW = new Car('BMW', 120);
const carMercedes = new Car('Mercedes', 95);

carBMW.accelerate(); // 130
carBMW.accelerate(); // 140
carBMW.brake(); // 135

carMercedes.brake(); // 90
carMercedes.brake(); // 85
carMercedes.accelerate(); // 95
