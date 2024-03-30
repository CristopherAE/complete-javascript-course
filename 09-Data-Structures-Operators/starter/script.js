'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

/* ----------- String Methods Practice -------------------
const getCode = s => s.slice(0, 3).toUpperCase();

for (const flight of flights.split('+')) {
  const [type, from, to, time] = flight.split(';');
  const output = `${type.startsWith('_Delayed') ? '🔴' : ''}${type.replaceAll(
    '_',
    ' '
  )} from ${getCode(from)} to ${getCode(to)} (${time.replace(
    ':',
    'h'
  )})`.padStart(44);
  console.log(output);
} */

// Data needed for first part of the section
const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const openingHours = {
  /////////////////////////////////////////////////////////////////
  // Enhanced Object Literals.
  // Since ES6, we can compute the property names for an object,
  // instead of writing them manually, using the square bracket syntax:
  // - We could put any expression between the square brackets, like [`day-${ 2 + 5 }`]
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  sat: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  /////////////////////////////////////////////////////////////////
  // Enhanced Object Literals.
  // Before ES6, we would have to do this:
  // openingHours: openingHours,
  // But now we only do this (this is an enhanced object literal):
  openingHours,

  // Since ES6, we can also write methods in this way, omitting the use
  // of the 'function' keyword. Both ways of writing methods function in
  // exactly the same way, so is just a question of preference:
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery: function ({
    starterIndex = 0,
    mainIndex = 0,
    address,
    time = '20:00',
  }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}.`
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}.`
    );
  },

  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

/* ----------- Destructuring Arrays ----------------------------------

// Without destructuring, we will have to do this:
const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

// Using destructuring:
const [x, y, z] = arr;
console.log(x, y, z);
console.log(arr);

// We can also skip elements in an array:
let [main, , secondary] = restaurant.categories;
console.log(main, secondary);

// We can use destructuring to swap variables.
// Withous destructuring, we would have to do this:
// const temp = main;
// main = secondary;
// secondary = temp;

// With destructuring, we only do this:
[main, secondary] = [secondary, main];
console.log(main, secondary);

// We can use destructuring to return multiple values from a function:
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

const nested = [2, 4, [5, 6]];
// const [i, , j] = nested;
// console.log(i, j);
// We can use destructuring inside destructuring:
const [i, , [j, k]] = nested;
console.log(i, j, k);

// We can set default values while destructuring.
//  - This is useful when we get data from an API.
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r); */

/* ----------- Destructuring Objects ---------------------------------
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

// We can change the name of the properties that we are
// destructuring:
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);

// We can also set default values while destructuring objects:
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

// Mutating variables (switching variables with destructuring):
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };
({ a, b } = obj);
console.log(a, b);

// Destructuring objects inside of objects:
const {
  fri: { open: o, close: c },
} = openingHours;
console.log(o, c);

// We can pass an object of options to a function, and then
// the function destructures this object to use its data:
restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});

restaurant.orderDelivery({
  address: 'Via del Sole, 21',
}); */

/* ----------- The Spread Operator -----------------------------------
const arr = [7, 8, 9];
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArr);

// We can use the spread operator whenever we would otherwise write
// multiple values separated by commas.
const goodNewArr = [1, 2, ...arr];
console.log(goodNewArr);

console.log(...goodNewArr);

const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);

// This operator can be used to create shallow copies of arrays
const mainMenuCopy = [...restaurant.mainMenu];

// It can also be used to join two or more arrays together
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu);

// The spread operator works in iterables, not only arrays. That is:
// arrays, strings, maps and sets (but not objects).
const str = 'Jonas';
const letters = [...str, ' ', 'S.'];
console.log(letters);

// It's not posible to do the following with the spread operator, because we can
// only use it when passing arguments to a function or when we create an array:
// console.log(`${...str} Schmedtmann`); // This gives an error

// Real world example:
// const ingredients = [
//   prompt("Let's make pasta! Ingredient 1?"),
//   prompt('Ingredient 2?'),
//   prompt('Ingredient 3?'),
// ];

// restaurant.orderPasta(...ingredients);

// Even though the spread operator originally did't work with objects,
// since ES2018 it actually does!
const newRestaurant = { foundedIn: 1978, ...restaurant, founder: 'Giuseppe' };
console.log(newRestaurant);
// We can also use it to make shallow copies of objects:
const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristorante Roma';
restaurantCopy.openingHours.thu.open = 9;
console.log(restaurant.name);
console.log(restaurantCopy.name); */

/* ----------- Rest Pattern and Parameters ---------------------------

// PART 1: Using the rest pattern while destructuring.
// The rest pattern works in the oposite way of the spread operator, and
// it's use to pack the elements into an array

// SPREAD, because it's on the right hand side of the assignment operator '=':
const arr = [1, 2, ...[3, 4]];

// REST, because it's on the left hand side of the '=':
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others);

// The rest element must be always the last element while doing destructuring,
// otherwise we'll get an error
const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood);

// The rest pattern also work with objects
const { sat, ...weekdays } = restaurant.openingHours;
console.log(sat, weekdays);

// PART 2: Using the rest parameter in functions.
const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  console.log(sum);
};

add(2, 3);
add(5, 3, 7, 2);
add(8, 2, 5, 3, 2, 1, 4);

const x = [23, 5, 7];
add(...x);

restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach');
restaurant.orderPizza('mushrooms');*/

/* ----------- Short Circuiting (&& and ||) --------------------------
// Properties of logical operators:
// - They can use any data type.
// - They can return any data type.
// - They do short-circuit evaluation.

// The OR operator: if the first value is a truthy value, it will immediately
// return that value and it will skip the evaluation of the other value.
console.log('--- OR ---');
console.log(3 || 'Hello'); // Returns 3 and skips the evaluation of 'Jonas'
console.log('' || 'Hello'); // Returns 'Jonas'
console.log(true || 0); // Returns true
console.log(undefined || null); // Returns null

// Returns the first truthy value. In this case, 'Hello'
console.log(undefined || 0 || '' || 'Hello' || 23 || null);

// Practical uses
// restaurant.numGuests = 23;
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);

// This won't work if the real number of guests is 0, because 0 is a falsy value.
const guests2 = restaurant.numGuests || 10;
console.log(guests2);

// The AND operator: it will return the first falsy value that it finds, or the last value
// if the preceding values that evaluates are all truthy.
console.log('--- AND ---');
console.log(0 && 'Hello');
console.log(7 && 'Hello');
console.log(9 && undefined);
console.log('Hello' && 23 && null && 'World');

// Practical uses
if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'spinach');
}

restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');*/

/* ----------- The Nullish Coalescing Operator (??) ------------------
restaurant.numGuests = 0;
const guests2 = restaurant.numGuests || 10;
console.log(guests2);

// The nullish coalescing operator works with the idea of nullish operators,
// instead of the idea of falsy values.
// The only nullish values are: null and undefined.
const guestsCorrected = restaurant.numGuests ?? 10;
console.log(guestsCorrected);*/

/* ----------- Logical Assignment Operators --------------------------
const rest1 = { name: 'Capri', numGuests: 0 };
const rest2 = { name: 'La Piazza', owner: 'Giovanni Rossi' };

// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;

// The OR assignment operator
// rest1.numGuests ||= 10;
// rest2.numGuests ||= 10;

// The nullish coalescing assignment operator
rest1.numGuests ??= 10;
rest2.numGuests ??= 10;

// The AND assignment operator
// rest1.owner = rest1.owner && '<ANONYMOUS>';
// rest2.owner = rest2.owner && '<ANONYMOUS>';
rest1.owner &&= '<ANONYMOUS>';
rest2.owner &&= '<ANONYMOUS>';

console.log(rest1);
console.log(rest2);*/

/* ----------- Looping Arrays: The for-of Loop -----------------------
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

// With this type of loop, we can still use the continue and break keywords
for (const item of menu) console.log(item);

// We can also obtain the current index of the array
for (const [i, item] of menu.entries()) {
  console.log(`${i + 1}: ${item}`);
}

console.log([...menu.entries()]);*/

/* ----------- Enhanced Object Literals ------------------------------
Check the 'restaurant' and 'openingHours' objects above */

/* ----------- Optional Chaining (?.) --------------------------------
// The next line gives an error, but its something that we might try to do if,
// for example, we are working with an API:
// console.log(restaurant.openingHours.mon.open);

// To prevent this type of error from occurring, we could do this:
// - We would also assume that openingHours might not exist in the restaurant object,
//   so we need to check for the existence of both objects.
// if (restaurant.openingHours && restaurant.openingHours.mon)
//   console.log(restaurant.openingHours.mon.open);

// Instead of doing all of this, we can simply use optional chaining:
// - If the value of the property does not exist, the optional chaining operator
//   will immediatly return 'undefined'.
console.log(restaurant.openingHours?.mon?.open);

// Real world example
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

for (const day of days) {
  // Optional chaining and the nullish coalescing operator work really well together:
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`On ${day}, we open at ${open}`);
}

// Optional chaining also works when calling methods
console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');
console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exist');

// Optional chaining also works on arrays. We can use it to check if an array is empty
const users = [{ name: 'Jonas', email: 'jonas@gmail.com' }];
// const users = [];
console.log(users[0]?.name ?? "'Users' array is empty");
// Without optional chaining, we would have to do this:
// if (users.length > 0) console.log(users[0].name);
// else console.log("'Users' array is empty"); */

/* ----------- Looping Objects: Object Keys, Values, and Entries ----- 
const properties = Object.keys(openingHours);
console.log(properties);

// Looping over property names (keys):
for (const day of Object.keys(openingHours)) {
  console.log(day);
}

// Looping over values:
for (const value of Object.values(openingHours)) {
  console.log(value);
}

// Looping over all entries on an object (key-value pairs):
for (const [day, { open, close }] of Object.entries(openingHours)) {
  console.log(`On ${day} we open at ${open} and close at ${close}`);
} */

/* ----------- Sets --------------------------------------------------
// A set is a collection of unique values (non-duplicates):
// - Just like arrays, sets are also iterables.
// - A set is different from an array in the sense that it contains only unique values
//   and the order of the elements in a set is completely irrelevant.
// - We can't retrieve individual elements from a set, we can only know if the set contains a certain
//   element using the Set.has() method. If we want to retrieve an element, its better to use
//   an array instead.
const orderSet = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  'Risotto',
  'Pasta',
  'Pizza',
]);
console.log(orderSet);

// We can also pass a string to create a new set, since they are iterables
console.log(new Set('Jonas'));
// The set could also be empty
console.log(new Set());
// We can get the size of a set like this
console.log(orderSet.size);
// We can check if an element is present in a set
console.log(orderSet.has('Pizza'));
console.log(orderSet.has('Bread'));
// We can add new elements to a set
orderSet.add('Garlic Bread');
orderSet.add('Garlic Bread');
// And we can eliminate a particular element
orderSet.delete('Risotto');
// Or all elements present in the set
// orderSet.clear();
console.log(orderSet);

// Sets are also iterables, so we can loop over them
for (const order of orderSet) {
  console.log(order);
}

// Use case example
const staff = ['waiter', 'chef', 'waiter', 'manager', 'chef', 'manager'];
// If we want to create an array based on a set, we simply can use the spread operator
const staffUnique = [...new Set(staff)];
console.log(staffUnique);
// If we only want to know the number of unique elements, we can do this instead
console.log(new Set(staff).size);
// Sets can also be used to know how many unique characters there are in a string
console.log(new Set('Jonas Schmedtmann').size); */

/* ----------- Maps: Fundamentals ------------------------------------
// Maps are data structures that we can use to map values to keys.
// - Maps are different from objects in the sense that the key names in a map
//   can be of any type (strings, numbers, objects, arrays, etc.).

// The easiest way to create a set is to first create an empty set and then
// fill it using the Map.set() method. This method not only updates the map,
// but it also returns it every time that its updated.
const rest = new Map();
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenze, Italy');
console.log(rest.set(2, 'Lisbon, Portugal'));
// The fact that the Map.set() method returns immediately the new map allows us
// to chain multiple calls to this method.
rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open :D')
  .set(false, 'We are closed :(');

// To read data from a map we use the Map.get() method
console.log(rest.get('name'));
console.log(rest.get(true));
console.log(rest.get(1));

// We can do something clever like this (but its not readable, so don't use it)
const time = 8;
console.log(rest.get(time > rest.get('open') && time < rest.get('close')));

// To check if a map contains a certain key
console.log(rest.has('categories'));
// To delete elements from a map
rest.delete(2);
// Maps also have the size property
console.log(rest.size);
// Just as with sets, we can also remove all the elements from a map
// rest.clear();

// We can use objects and arrays as map keys
const arr = [1, 2];
rest.set(arr, 'test');
console.log(rest.get(arr));
// This can be useful when we work with DOM elements, since they are simply a special
// type of object
rest.set(document.querySelector('h1'), 'Heading');
console.log(rest); */

/* ----------- Maps: Iteration ---------------------------------------
// This a more efficient way to write maps, passing an array of arrays
const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct!'],
  [false, 'Try again!'],
]);
console.log(question);

// There's an easy way of converting objects to maps
console.log(Object.entries(openingHours));
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

console.log(question.get('question'));
// Looping over an object
for (const [key, value] of question) {
  if (typeof key === 'number') {
    console.log(`Answer ${key}: ${value}`);
  }
}

// const answer = Number(prompt('Type your answer'));
// console.log(question.get(question.get('correct') === answer));

// We can convert a map back to an array
console.log([...question]);

// We can use the same methods that we use on arrays
// console.log(question.entries()); // This is the same as the one above
console.log([...question.keys()]);
console.log([...question.values()]); */

/* ----------- Working With Strings - Part 1 -------------------------
const airline = 'TAP Air Portugal';
const plane = 'A320';

console.log(plane[0]);
console.log('B737'[0]);
console.log(airline.length);
console.log('B737'.length);

// String methods
console.log(airline.indexOf('r'));
console.log(airline.lastIndexOf('r'));
console.log(airline.indexOf('Portugal'));

console.log(airline.slice(4)); // This doesn't change the original string
console.log(airline.slice(4, 7));

console.log(airline.slice(0, airline.indexOf(' ')));
console.log(airline.slice(airline.lastIndexOf(' ') + 1));

console.log(airline.slice(-2));
console.log(airline.slice(1, -1));

// Example
const checkMiddleSeat = function (seat) {
  // B and E are middle seats
  const s = seat.slice(-1);
  s === 'B' || s === 'E'
    ? console.log('You got the middle seat :(')
    : console.log('You got lucky!');
};
checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

// JavaScript primitives can't have methods, so when we call a method on
// a string what is really happening is that the javascript engine first
// converts the string to an object, applies the method and then converts it
// back to a string. This is called 'boxing'.
console.log(new String('Jonas'));
console.log(typeof new String('Jonas'));
console.log(typeof new String('Jonas').slice(1)); */

/* ----------- Working With Strings - Part 2 -------------------------
const airline = 'TAP Air Portugal';

console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

// Practical example: Fix capitalization on a passenger name
const passenger = 'jOnAS'; // Jonas
const passengerLower = passenger.toLowerCase();
const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);

// Comparing emails
const email = 'hello@jonas.io';
const loginEmail = '  Hello@Jonas.Io \n';

const normalizeEmail = loginEmail.toLowerCase().trim();
console.log(normalizeEmail);
console.log(email === normalizeEmail);

// Replacing parts of a string
const priceGB = '288,97£';
const priceUS = priceGB.replace('£', '$').replace(',', '.');
console.log(priceUS);

const announcement =
  'All passengers come to boarding door 23. Boarding door 23!';
console.log(announcement.replaceAll('door', 'gate'));
// Replacing using regular expressions
console.log(announcement.replace(/door/g, 'gate'));

// Boolean methods of strings
const plane = 'Airbus A320neo';
console.log(plane.includes('A320'));
console.log(plane.includes('Boeing'));
console.log(plane.startsWith('Air'));
console.log(plane.startsWith('Aib'));

if (plane.startsWith('Airbus') && plane.endsWith('neo')) {
  console.log('Part of the NEW AIRBUS family!');
}

// Practice exercise
const checkBaggage = function (items) {
  const baggage = items.toLowerCase();
  if (baggage.includes('knife') || baggage.includes('gun')) {
    console.log('You are NOT allowed on board!');
  } else {
    console.log('Welcome aboard!');
  }
};

checkBaggage('I have a laptop, some Food and a Pocket Knife');
checkBaggage('I have some sock and a camera');
checkBaggage('Got some snacks and a gun for protection'); */

/* ----------- Working With Strings - Part 3 -------------------------
console.log('a+very+nice+string'.split('+'));
console.log('Jonas Schmedtmann'.split(' '));

const [firstName, lastName] = 'Jonas Schmedtmann'.split(' ');
console.log(firstName, lastName);

const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
console.log(newName);

// Example
const capitalizeName = function (name) {
  const names = name.split(' ');
  const capitalizedNames = [];
  for (const word of names) {
    // capitalizedNames.push(word[0].toUpperCase() + word.slice(1));
    capitalizedNames.push(word.replace(word[0], word[0].toUpperCase()));
  }
  console.log(capitalizedNames.join(' '));
};

capitalizeName('jessica ann smith davis');
capitalizeName('jonas schmedtmann');

// Padding a string
const message = 'Go to gate 23!';
console.log(message.padStart(20, '+').padEnd(30, '+'));
console.log('Jonas'.padStart(20, '+').padEnd(30, '+'));

// Real world example for padding: Masking a credit card number
const maskCreditCard = function (number) {
  const str = String(number);
  const lastDigits = str.slice(-4);
  return lastDigits.padStart(str.length, '*');
};

console.log(maskCreditCard(2371283941));
console.log(maskCreditCard(7329842893459245));
console.log(maskCreditCard('3423857535734953928523'));

// Repeat method
const message2 = 'Bad weather... All departures delayed... ';
console.log(message2.repeat(5)); */
