'use strict';

/* ---- Constructor Functions and the new Operator ------------------------------------- */
// We can create constructor functions with function declarations or funtion expressions, but
// not with arrow functions, because arrow functions doesn't have a "this" keyword defined.
const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // NEVER create a method inside of a constructor function. If we want to add a method to
  // an object we use prototype inheritance.
  //   this.calcAge = function () {
  //     console.log(2037 - this.birthYear);
  //   };
};

// The "new" keyword does four things behind the scenes:
//   1. Creates a new empty object {}.
//   2. The function is called, and the "this" keyword will be set to the new created object.
//   3. The newly created object will be linked to a prototype.
//   4. Finally, the function automatically returns the object created.
const jonas = new Person('Jonas', 1991);
console.log(jonas);

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 2015);
console.log(matilda, jack);

// We can know if an object is an instance of a constructor function using the
// "instanceof" operator
console.log(jack instanceof Person); // true
const jay = 'Jay';
console.log(jay instanceof Person); // false
