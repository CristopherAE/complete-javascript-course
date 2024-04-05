'use strict';

/* ---- Constructor Functions and the new Operator -------------------------------------
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
*/

/* ---- Prototypes ---------------------------------------------------------------------
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
*/

/* ---- Prototypal Inheritance on Built-In Objects -------------------------------------
console.log(jonas.__proto__);
// The Object.prototype (the top of the prototype chain)
console.log(jonas.__proto__.__proto__);
// There's nothing after the end of the prototype chain, so it returns null
console.log(jonas.__proto__.__proto__.__proto__);

console.dir(Person.prototype.constructor); // Returns the Person constructor function

// Every object in JavaScript has its own prototype chain, and arrays are not exception
const arr = [1, 2, 2, 3, 3, 4, 4, 5]; // new Array() === []
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype); // true

console.log(arr.__proto__.__proto__); // returns Object.prototype

// Knowing that all arrays inherit its methods from Array.prototype, we can use it to
// extend the functionality of arrays. It's not recommended to do this, since a new
// version of JavaScript can break this functionality.
Array.prototype.unique = function () {
  return [...new Set(this)];
};
console.log(arr.unique()); // [ 1, 2, 3, 4, 5 ]

// Exploring the prototype chain of HTML elements
const h1 = document.querySelector('h1');
console.dir(h1); // returns all properties and methods of this html element
// Functions also have their own prototype chain
console.dir(x => x + 1);
*/

/* ---- ES6 Classes --------------------------------------------------------------------
// The implementation of classes in JavaScript is only syntactic sugar over the use of
// constructor functions and prototypal inheritance.

// Important considerations when using ES6 classes:
//  1. Classes are not hoisted; we can't use a class before it is declared in our code.
//  2. Classes are first-class citizens; we can pass them into functions and return them
//  from other functions.
//  3. The body of a class it's always executed in strict mode, even if we didn't put
//  'use strict' at the start of our JavaScript file.

// There are two ways of defining classes: class expressions and class declarations. This is
// because classes are a special type of function in JavaScript.

// Class expression:
// const Person = class {};

// Class declaration:
class Person {
  // This constructor will be called automatically everytime we create a new instance of
  // this class. Behind the scenes, it's essentialy the same as the constructor function
  // that we used before to define a class.
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

  // In ES6 classes we don't need to attach the methods to the prototype chain. This will
  // happen automatically for us.
  calcAge() {
    console.log(2037 - this.birthYear);
  }
}

const jessica = new Person('Jessica', 1996);
console.log(jessica);
jessica.calcAge();

// We see that the prototype chain still exists, but now it's JavaScript that handles the
// linking of our methods to the prototype chain.
console.log(jessica.__proto__ == Person.prototype); // true

// We can still add methods to the prototype itself and they will work as expected.
Person.prototype.greet = function () {
  console.log(`Hello, ${this.firstName}!`);
};

jessica.greet(); // Hello, Jessica!
*/

/* ---- Setters and Getters ------------------------------------------------------------ */
// Every object in JavaScript can have setters and getters properties. This special
// properties are called "accessor properties", while the more normal kind of properties are
// called "data properties".

const account = {
  owner: 'Jonas',
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(movement) {
    this.movements.push(movement);
  },
};

console.log(account.latest); // 300

account.latest = 50;
console.log(account.movements);

// We can also use getters and setter in classes
class Person {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hello, ${this.firstName}!`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  // We should follow a pattern similar to this when we want to set a property that already exists.
  // We should create both a setter and a getter, and put a underscore before the name of the property
  // that we want to change (otherwise the name will be in conflict with the property name that we
  // defined in the constuctor).
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else console.log(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }
}

const jessica = new Person('Jessica Davis', 1996);
console.log(jessica);
console.log(jessica.age); // 41

const walter = new Person('Walter White', 1965);
