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

/* ---- Prototypes --------------------------------------------------------------------- */
// We can set methods in the prototype
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

// All instances of the Person constructor now have access to the calcAge method because
// it was defined in its prototype. The Person constructor delegated this functionality to
// the prototype from which it inherits.
console.log(Person.prototype);
jonas.calcAge();
matilda.calcAge();

// We can confirm that each object inherits from Person.prototype
console.log(jonas.__proto__);
console.log(jonas.__proto__ === Person.prototype); // true
console.log(Person.prototype.isPrototypeOf(jonas)); // true

// IMPORTANT: Person.prototype is not the prototype of the Person constructor function.
// Instead, it's the prototype to which the instances of Person will be linked.
console.log(Person.prototype.isPrototypeOf(Person)); // false

// We can also set properties in the prototype
Person.prototype.species = 'Homo Sapiens';
console.log(jonas.species); // Homo Sapiens

// The "species" property it's not part of the object itself, but it's inherited
// from the prototype chain.
console.log(jonas.hasOwnProperty('firstName')); // true
console.log(jonas.hasOwnProperty('species')); // false
