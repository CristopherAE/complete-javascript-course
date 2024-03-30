'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2024-02-05T17:01:17.194Z',
    '2024-02-07T23:36:17.929Z',
    '2024-02-10T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date1 - date2) / (24 * 60 * 60 * 1000));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  // const day = `${date.getDate()}`.padStart(2, '0');
  // const month = `${date.getMonth() + 1}`.padStart(2, '0');
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}/`;
  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCurrency = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);

    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMov = formatCurrency(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCurrency(
    acc.balance,
    acc.locale,
    acc.currency
  );
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCurrency(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCurrency(
    Math.abs(out),
    acc.locale,
    acc.currency
  );

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCurrency(
    interest,
    acc.locale,
    acc.currency
  );
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const startLogoutTimer = function (locale) {
  const tick = function () {
    // In each call, print remaining time to the UI
    labelTimer.textContent = new Intl.DateTimeFormat(locale, {
      minute: '2-digit',
      second: '2-digit',
    }).format(time);

    // When it reaches 0 seconds, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }

    // Subtract a second every second
    time -= 1000;
  };

  // Set time to 5 minutes
  let time = 5 * 60 * 1000; // In miliseconds

  // Call the timer every second
  tick();
  const timer = setInterval(tick, 1000);

  return timer;
};

///////////////////////////////////////
// Event handlers

// GLOBAL VARIABLES
// ------------------------------------
let currentAccount, timer;
// ------------------------------------

// Fake always logged-in
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Display current date and time
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      // weekday: 'long',
    };
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);

    // Resets timer if there's already one running
    if (timer) clearInterval(timer);
    // Start log out timer
    timer = startLogoutTimer(currentAccount?.locale || navigator.locale);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    // Resets the current timer
    clearInterval(timer);
    // Start log out timer
    timer = startLogoutTimer(currentAccount?.locale || navigator.locale);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);

      // Resets the current timer
      clearInterval(timer);
      // Start log out timer
      timer = startLogoutTimer(currentAccount?.locale || navigator.locale);
    }, 3000);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/* --- Converting and Checking Numbers ----------
// Internally, javascript represents all numbers as floating point numbers, even if they are integers
console.log(23 === 23.0); // true

// Representing some numbers in base 2 is difficult for computers, that's why we sometimes get rounding errors
console.log(0.1 + 0.2); // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3); // false

// Converting strings to numbers:
console.log(Number('23'));
// We can also do this, since javascript does type coercion automatically when it sees a plus operator
// before a string
console.log(+'23');

// Parsing strings to numbers. This method tries to convert a string to a number, removing all other symbols
// (except when the string starts with a symbol that is not a number). As a second argument, we can specify
// the base system (like 10 for decimal and 2 for binary);
console.log(Number.parseInt('23px', 10)); // 23
console.log(Number.parseInt('e23', 10)); // NaN

// Putting whitespaces doesn't affect the result
console.log(Number.parseFloat('   2.5rem   ')); // 2.5
console.log(Number.parseInt('2.5rem')); // 2
// parseInt() and parseFloat() are global functions, so we don't need the Number object to access them.
// However, we should use the Number object to access them since it contains them in their own namespace,
// so the names of these functions could be used in other parts of our code without causing name collisions.
console.log(parseInt('  3rem')); // 3

// We can check if a primitive is not-a-number using the method isNaN()
console.log(Number.isNaN(25)); // false
console.log(Number.isNaN('25')); // false
console.log(Number.isNaN(+'25x')); // true
console.log(Number.isNaN(25 / 0)); // false

// We can use Number.isFinite() to check if something is a number or not
console.log(Number.isFinite(20)); // true
console.log(Number.isFinite('20')); // false
console.log(Number.isFinite(+'20x')); // false
console.log(Number.isFinite(20 / 0)); // false

// We can also check if something is an integer with the isInteger() method
console.log(Number.isInteger(21)); // true
console.log(Number.isInteger(21.0)); // true
console.log(Number.isInteger(21.1)); // false
console.log(Number.isInteger(21 / 0)); // false */

/* --- Math and Rounding ------------------------
// Calculating the square root
console.log(Math.sqrt(25)); // 5
console.log(25 ** (1 / 2)); // 5
// Calculating the cube root
console.log(8 ** (1 / 3)); // 2

// Calculating the maximum value of a series. This method does type coercion before obtaining the max value.
// It doesn't do parsing, so '23' will be converted to a number, but '23px' will not be converted.
console.log(Math.max(2, 5, 23, 10)); // 23
console.log(Math.max(2, 5, '23', 10)); // 23
console.log(Math.max(2, 5, '23px', 10)); // NaN

// We can also get the minimum value on a series
console.log(Math.min(2, 5, 23, 10)); // 2

// The Math namespace also contains some constants that can be useful. For example, we can use the value of
// Pi to calculate the area of a circle
console.log(Math.PI * Number.parseFloat('10px') ** 2); // 314.1592653589793

// Using the random method
console.log(Math.trunc(Math.random() * 6) + 1); // Returns a pseudorandom number from 1 to 6
// A general function to calculate a pseudorandom integer number for a given range
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min;
console.log(randomInt(10, 20));

// Rounding integers: All of the next methods also do type coercion
// The trunc() method removes the decimal part
console.log(Math.trunc(23.3)); // 23
// round() will always round the number to its nearest integer
console.log(Math.round(23.3)); // 23
console.log(Math.round(23.8)); // 24
// ceil() rounds up to the nearest integer
console.log(Math.ceil(23.3)); // 24
console.log(Math.ceil(23.8)); // 24
// floor() rounds down to the nearest integer
console.log(Math.floor(23.3)); // 23
console.log(Math.floor(23.8)); // 23
// trunc() and floor() work in the same way for positive integers, but not for negative ones
console.log(Math.trunc(-23.3)); // -23
console.log(Math.floor(-23.3)); // -24

// Rounding decimals: using toFixed() always returns a string, so we need to be careful when
// we use it
console.log((2.7).toFixed(0)); // 3
console.log((2.7).toFixed(3)); // 2.700
console.log(+(2.345).toFixed(2)); // 2.35 */

/* --- The Remainder Operator -------------------
console.log(5 % 2); // 1
console.log(5 / 2); // 5 = 2 * 2 + 1

console.log(8 % 3); // 2
console.log(8 / 3); // 8 = 2 * 3 + 2

// We can check the parity of a number (its eveness or oddness) using the remainder opertator
console.log(6 % 2); // We get 0, so the number is even
console.log(7 % 2); // We get 1, so the number is odd
const isEven = n => n % 2 === 0;
console.log(isEven(8)); // true
console.log(isEven(23)); // false
console.log(isEven(512)); // true

// A practical example
// We can also do this to convert the NodeList to an array: [...document.querySelectorAll('.movements__row')]
labelBalance.addEventListener('click', function () {
  Array.from(document.querySelectorAll('.movements__row')).forEach((row, i) => {
    if (i % 2 === 0) row.style.backgroundColor = 'lightgrey';
    if (i % 3 === 0) {
      row.style.backgroundColor = 'grey';
      row.querySelector('.movements__value').style.color = 'white';
    }
  });
});*/

/* --- Numeric Separators -----------------------
// Numeric separators make it easier for us (or other developers) to make sense of very large numbers
const diameter = 287_460_000_000; // The javascript engine ignores the underscores
console.log(diameter);

const price = 345_99;
console.log(price);

const transferFee1 = 15_00;
const transferFee2 = 1_500;

const PI = 3.14_15;
// We cannot place underscores:
//  - at the start or end of a number: _3.1415 or 3.1415_
//  - before or after a decimal point: 3_.1415 or 3._1415
//  - immediately after another underscore: 3.14__15

// We shouldn't use underscores when we are storing a number as a string, because the Number() function
// would not be able to parse it or it would parse it incorretly (like in the parseInt example)
console.log(Number('23_000')); // NaN
console.log(Number.parseInt('23_000')); // 23
console.log(Number('23000')); */

/* --- Working with BigInt ----------------------
// Commondly, numbers are represented using only 64 bits, of which 53 are use to store the number itself.
// The rest are used to store the sign of the number and the position of the floating point. As a consequence
// of this fact, we cannot safely store integers bigger than (2 ** 53 - 1) because javascript cannot represent them
// accurately and we might lose precision:
console.log(2 ** 53 - 1); // 9,007,199,254,740,991
// This number is so important that is stored in the Number namespace:
console.log(Number.MAX_SAFE_INTEGER);

// We sometimes need to work with numbers bigger than this MAX_SAFE_INTEGER, like when we are working with
// databases or with APIs. BigInt is a primitive type added in ES2020 that allow us to store integers as big as we want.
// We just need to add an 'n' to the end of a number to tranform it to a BigInt:
console.log(32472385473953945347593857938457); // loses precision
console.log(32472385473953945347593857938457n); // doesn't lose precision because it's a BigInt
// We can also create BigInts by using the BigInt() function
console.log(BigInt(1274138472398423));

// We can do the same operations with BigInts as with normal numbers
console.log(10_000n + 10_000n);
console.log(1523652734572345872345378450981235n * 1000n);

// It's not possible to mix BigInts with Numbers in some operations
const hugeNumber = 4192374149823424987923n;
const regularNumber = 100;
// console.log(hugeNumber * regularNumber); // TypeError
// We need to transform the normal number into a BigInt
console.log(hugeNumber * BigInt(regularNumber));
// We also cannot apply Math operations in BigInts
// console.log(Math.sqrt(16n)); // TypeError

// We can mix BigInts and Numbers in logical operations
console.log(20n > 15); // true
console.log(20n === 20); // false, because the both numbers have a different type
console.log(20n == 20); // true, because javascript does type coercion before checking for equality
console.log(typeof 20); // number
console.log(typeof 20n); // bigint

// We can also mix BigInts and Numbers in string concatenations
console.log(hugeNumber + ' is REALLY BIG!!!');

// Division of BigInts
console.log(10 / 3); // 3.3333333333333335
console.log(10n / 3n); // It simply returns the closest bigint: 3n */

/* --- Creating Dates ---------------------------
// There are 4 ways of creating dates in javascript, accepting different parameters
const now = new Date();
console.log(now);
// We can also pass a date in the form of a string to the Date() constructor
console.log(new Date('Feb 08 2024 22:00:18'));
// Javascript can parse this type of string, but we shouldn't do it because it's unreliable
console.log(new Date('December 24, 2000'));
// String dates created by javascript are pretty realiable to parse
console.log(new Date(account1.movementsDates[0]));

// We can also pass each value of the date separately
console.log(new Date(2037, 10, 19, 15, 23, 5));
// Javascript autocorrects the day. For example, november has only 30 days so when we try to give a date
// bigger than 30 it returns a december's date instead
console.log(new Date(2037, 10, 33)); // Tue Dec 01 2037 00:00:00
// We can also pass to the Date() constructor a timestamp. A timestamp corresponds to the number of miliseconds
// that have passed since the start of Unix time (midnight, January 1st, 1970 UTC)
console.log(new Date(0)); // Logs to the console the start of Unix time
console.log(new Date(3 * 24 * 60 * 60 * 1000)); // Three days after the start of Unix time

// Dates are a special kind of object, so they have their own getters and setters to get or set a particular
// section of a date
const future = new Date(2037, 10, 19, 15, 23);
console.log(future.getFullYear()); // 2037
console.log(future.getMonth()); // 10 (Index of the month, zero-based)
console.log(future.getDate()); // 19 (Day of the month)
console.log(future.getDay()); // 4 (Day of the week, in this case Thursday)
console.log(future.getHours()); // 15
console.log(future.getMinutes()); // 23
console.log(future.getMilliseconds()); // 0
// We can also get a nicely formatted string
console.log(future.toISOString()); // 2037-11-19T21:23:00.000Z
console.log(future.getTime()); // Returns the timestamp in Unix time
// We can also get the current timestamp
console.log(Date.now());

// There are, of course, set methods for each get method
future.setFullYear(2040);
console.log(future); */

/* --- Operations with Dates --------------------
const future = new Date(2037, 10, 19, 15, 23);
// Converting a date to a number gives the total number of miliseconds that have passed since Unix Epoch
console.log(+future);

// const calcDaysPassed = (date1, date2) =>
//     Math.trunc(Math.abs(date1 - date2) / (24 * 60 * 60 * 1000));

// const days1 = calcDaysPassed(
//   new Date(2037, 3, 14, 10, 8),
//   new Date(2037, 3, 4)
// );
// console.log(days1);*/

/* --- Internationalizing Dates (Intl) ----------
// Experimenting with the internationalization API
const now = new Date();
// The namespace for the internationalization API is Intl.
// We can pass an options object to the Intl API
const options = {
  hour: 'numeric',
  minute: 'numeric',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  weekday: 'long',
};
// We can hard code the locale manually (e.g., 'en-US') or we can set it up according to the user's browser
const locale = navigator.language;
console.log(new Intl.DateTimeFormat(locale, options).format(now));*/

/* --- Internationalizing Numbers (Intl) --------
const number = 4201002.69;

const options = {
  style: 'currency',
  currency: 'EUR',
  // unit: 'celsius',
  // useGrouping: false,
};

console.log('US:', new Intl.NumberFormat('en-US', options).format(number));
console.log('ES:', new Intl.NumberFormat('es-ES', options).format(number));
console.log('RU:', new Intl.NumberFormat('ru-RU', options).format(number));
console.log('SY:', new Intl.NumberFormat('ar-SY', options).format(number));
console.log(
  navigator.language,
  new Intl.NumberFormat(navigator.language, options).format(number)
); */

/* --- Timers: setTimeout and setInterval -------
// setTimeout:
// The execution of our program doesn't stop when we use setTimeout(), it continues and executes the callback function
// only after the specify time has passed. This mechanism is part of asynchronous javascript.
// We can pass arguments to the callback function after the second argument of the setTimeout function.
const ingredients = ['olives', 'spinach'];
const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2}!`),
  3000,
  ...ingredients
);
console.log('Waiting...');

// We can stop a timer before it ends
if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);

// setInterval:
// This function allow us to execute a callback funtion repeatedly after a period of time
setInterval(() => {
  console.clear();
  const date = new Intl.DateTimeFormat(navigator.locale, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(new Date());
  console.log(date);
}, 1000); */
