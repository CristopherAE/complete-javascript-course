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

/* const Car = function (maker, speed) {
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
carMercedes.accelerate(); // 95 */

///////////////////////////////////////////////////////
// Coding Challenge #2

/*
Your tasks:
  1. Re-create Challenge #1, but this time using an ES6 class (call it 'CarCl')
  2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide
  by 1.6)
  3. Add a setter called 'speedUS' which sets the current speed in mi/h (but
  converts it to km/h before storing the value, by multiplying the input by 1.6)
  4. Create a new car and experiment with the 'accelerate' and 'brake'
  methods, and with the getter and setter.
Test data:
  Data car 1: 'Ford' going at 120 km/h
*/

class CarCl {
  constructor(maker, speed) {
    this.maker = maker;
    this.speed = speed;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.maker} new speed: ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.maker} new speed: ${this.speed} km/h`);
  }
}

const ford = new CarCl('Ford', 120);

console.log(`US speed: ${ford.speedUS} mi/h`); // 75 mi/h
ford.accelerate(); // 130 km/h
ford.brake(); // 125 km/h
ford.speedUS = 75;

console.log(ford.speed); // 120
