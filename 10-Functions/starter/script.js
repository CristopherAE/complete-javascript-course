'use strict';

/* ----------- Default Parameters -----------------------------------------------
const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  // This is how we would have created default parameters before ES6
  //   numPassengers = numPassengers || 1;
  //   price = price || 199;

  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('LF234', 2, 800);
createBooking('LF234', 2);
createBooking('LF234', 5);

// If we want to skip a parameter, we do this
createBooking('LF234', undefined, 1000); */

/* ----------- How Passing Arguments Works: Value vs. Reference -----------------
// IMPORTANT: JavaScript doesn't have passing by reference, only passing by value

const flight = 'LH234';
const jonas = { name: 'Jonas Schmedtmann', passport: 414278583485 };

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr. ' + passenger.name;

  if (passenger.passport === 414278583485) {
    console.log('Checked in!');
  } else {
    console.log('Wrong passport');
  }
};

checkIn(flight, jonas);
console.log(flight);
console.log(jonas);

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 1000000000000);
};

newPassport(jonas);
console.log(jonas);

checkIn(flight, jonas); */

/* ----------- Functions Accepting Callback Functions ---------------------------
const oneWord = function (str) {
  return str.replaceAll(' ', '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

// We now can create a higher-order function
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);
  console.log(`Transformed by: ${fn.name}`);
};

transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', oneWord);

// Another example of the use of higher-order functions
const greeting = function () {
  console.log('Hi there!');
};

document.body.addEventListener('click', greeting);

// JS uses callbacks all the time
['Jonas', 'Marta', 'Adán'].forEach(greeting); */

/* ----------- Functions Returning Functions ------------------------------------
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

// Rewriting using arrow functions
// const greet = greeting => name => console.log(`${greeting} ${name}`);

const greeterHey = greet('Hey');
greeterHey('Jonas');
greeterHey('Steven');

// We can also call the function like this
greet('Hello')('Jonas'); */

/* ----------- The call and apply Methods ---------------------------------------
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(234, 'Jonas Schmedtmann');
lufthansa.book(457, 'John Smith');
console.log(lufthansa);

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book;

// This does not work because the 'this' keyword is undefined outside of the object
// book(212, 'Sarah Williams');

// We should call this function like this, using the 'call' method
book.call(eurowings, 212, 'Sarah Williams');
console.log(eurowings);

book.call(lufthansa, 239, 'Mary Cooper');
console.log(lufthansa);

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 294, 'Joan Cooper');
console.log(swiss);

// Using the 'apply' method (it isn't used as much anymore in modern javascript)
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
console.log(swiss);

// Instead of using the 'apply' method, we can do this
book.call(eurowings, ...flightData);
console.log(eurowings);  */

/* ----------- The bind Method --------------------------------------------------
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

const book = lufthansa.book;

// Instead of calling the function, the bind method returns a new function
// with the 'this' keyword pointing to the object that we pass
const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(23, 'Steven Williams');

// We can use the bind method to set in stone some arguments of the function.
// This is a common pattern in programming, and its called Partial Application.
const bookEW23 = book.bind(eurowings, 23);
bookEW23('Jonas Schmedtmann');
bookEW23('Martha Cooper');

// Example 1: Using the bind methos with event listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

// The 'this' keyword is set dinamically, so when we pressed the button 'this'
// will point to the DOM element instead of the 'lufthansa' object. So, we need
// to use the 'bind' method to set manually the 'this' keyword to the lufthansa object.
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// Example 2: Partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23);
// Using the bind method would be equal to writing this:
// addVAT = (value) => value + value * 0.23;
console.log(addVAT(100));
console.log(addVAT(23));

// CHALLENGE
const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};
// Another solution:
// const addTaxRate = rate => value => value + value * rate;

const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(100));
console.log(addVAT2(23)); */

/* ----------- Immediately Invoked Function Expressions (IIFE) ------------------
// IIFEs are mostly used when we work with async/await in later sections of the course
// const runOnce = function () {
//   console.log('This function should only run once!');
// };
// runOnce();

// This is the correct way in which we write a function that should only be called once.
// This pattern is called IIFE (Immediately Invoked Function Expression)
(function () {
  console.log('This function should only run once!');
})();

(() => console.log('This function should ALSO only run once!'))();

// This pattern was used to hide parts of the code according to the scope chain,
// but now we can accomplish this using blocks like this:
{
  let isPrivate = 23;
}
console.log(isPrivate); */

/* ----------- Closures ---------------------------------------------------------
// A function has access to the variable environment (VE) of the execution context in which it was created
// Closure: VE attached to the function, exactly as it was at the time and place the function was created
const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();

booker();
booker();
booker();

// We can observe the closure of a function using console.dir()
console.dir(booker); */

/* ----------- More Closure Examples --------------------------------------------
// EXAMPLE #1
let f;
const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 12;
  f = function () {
    console.log(b * 2);
  };
};

g();
f();
console.dir(f);

// Re-assigning f function
h();
f();
console.dir(f);

// EXAMPLE #2
const boardPassengers = function (numPassengers, waitTime) {
  const perGroup = numPassengers / 3;

  setTimeout(() => {
    console.log(`We are now boarding all ${numPassengers} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, waitTime * 1000);

  console.log(`Will start boarding in ${waitTime} seconds`);
};

// const perGroup = 1000;
boardPassengers(180, 3); */
