'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//////////////////////////////////////////////////
// THEORY SECTIONS

/* ----- Simple Array Methods ---------------------------------------------
let arr = ['a', 'b', 'c', 'd', 'e'];

// SLICE: Doesn't mutate the original array
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));
// We can also use the slice method to create a shallow copy of the array
console.log(arr.slice());
// It works the same as using the spread operator
console.log([...arr]);

// SPLICE: Mutates the original array
// console.log(arr.splice(2));
// console.log(arr.splice(-1));
// console.log(arr.splice(1, 2));
// console.log(arr);

// REVERSE: Mutates the original array
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2);

// CONCAT: Used to concatenate two arrays. Doesn't mutate the original array
const letters = arr.concat(arr2);
console.log(letters);
// It works the same as using the spread operator
console.log([...arr, ...arr2]);

// JOIN
console.log(letters.join(' - ')); */

/* ----- The new 'at' Method ----------------------------------------------
const arr = [23, 11, 64];

// Both work in the same way, returning the element at the given index
console.log(arr[0]);
console.log(arr.at(0));

// The 'at' method is particularly useful when getting the last element in array.
// Instead of doing this:
// console.log(arr[arr.length - 1]);
// console.log(arr.slice(-1)[0]);
// We can simply do this:
console.log(arr.at(-1));

// The 'at' method also works on strings
console.log('Jonas'.at(0));
console.log('Jonas'.at(-1)); */

/* ----- Looping Arrays: forEach ------------------------------------------
// for (const [i, movement] of movements.entries()) {
//   if (movement > 0) {
//     console.log(`Movement ${i + 1}: You deposited ${movement}`);
//   } else {
//     console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
//   }
// }

// forEach passes to the callback function the current element, the index and the complete array (in that order).
// It's important to know that we can't use the 'continue' or 'break' keywords inside a forEach loop.
movements.forEach((movement, i, arr) => {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}); */

/* ----- forEach With Maps and Sets ---------------------------------------
// Looping maps with forEach
currencies.forEach((value, key, map) => {
  console.log(`${key}: ${value}`);
});

// Looping sets with forEach
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
// The key and the value on a set are the same, so we can ommit it using a throwaway variable '_'
currenciesUnique.forEach((value, _, set) => {
  console.log(`${value}: ${value}`);
}); */

/* ----- The map Method ---------------------------------------------------
const eurToUsd = 1.1;

// const movementsUSD = movements.map(function (mov) {
//   return mov * eurToUsd;
// });

const movementsUSD = movements.map(mov => mov * eurToUsd);

console.log(movements);
console.log(movementsUSD);

// Implementing the same functionality but using a for-loop
// const movementsUSDfor = [];
// for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);
// console.log(movementsUSDfor);

const movementsDescriptions = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);

console.log(movementsDescriptions);*/

/* ----- The filter Method ------------------------------------------------
const deposits = movements.filter(mov => mov > 0);
console.log(movements);
console.log(deposits);

// The same functionality, but using a for-of loop
// const depositsFor = [];
// for (const mov of movements) if (mov > 0) depositsFor.push(mov);
// console.log(deposits);

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);*/

/* ----- The reduce Method (Theory) ---------------------------------------
// acc -> accumulator
// cur -> current element
// const balance = movements.reduce(function (acc, cur, i) {
//   console.log(`Iteration ${i}: ${acc}`);
//   return acc + cur;
// }, 0);
// console.log(balance);

const balance = movements.reduce((acc, cur) => acc + cur, 0);
console.log(balance);

// The same functionality but with a for-of loop
// let balance2 = 0;
// for (const mov of movements) balance2 += mov;
// console.log(balance2);

// Using reduce to obtain the maximum value on an array
const maxValue = movements.reduce((acc, mov) => {
  if (acc < mov) return mov;
  else return acc;
}, movements[0]);
console.log(maxValue);*/

/* ----- The Magic of Chaining Methods (Theory) ---------------------------
const eurToUsd = 1.1;
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUsd)
  .reduce((acc, cur) => acc + cur, 0);
console.log(totalDepositsUSD);*/

/* ----- The find Method --------------------------------------------------
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(firstWithdrawal);

console.log(accounts);
const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

// The same but using the for-of loop
let accountTwo = undefined;
for (const acc of accounts) {
  if (acc.owner === 'Jessica Davis') accountTwo = acc;
  else continue;
}
console.log(accountTwo);*/

/* ----- some and every Methods (Theory) ----------------------------------
console.log(movements);
// The includes method only tests for equality
console.log(movements.includes(-130));

// The some and every methods allow us to test for complex conditions
const anyDeposits = movements.some(mov => mov > 5000);
console.log(anyDeposits);

// The every method only returns true if every element in the array satisfies the condition
console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));

// We can write the calback function separately
const checkDeposit = mov => mov > 0;
console.log(movements.some(checkDeposit));
console.log(movements.every(checkDeposit));
console.log(movements.filter(checkDeposit));*/

/* ----- flat and flatMap -------------------------------------------------
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr);
console.log(arr.flat());

// The flat method by itself only flatens an array to one level of nesting, we can fix that
// by passing an argument to the method that indicates the deep level we want.
const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2));

// Example using flat:
const overallBalance = accounts
  .map(account => account.movements)
  .flat()
  .reduce((accumulator, movement) => accumulator + movement);
console.log(overallBalance);

// It's pretty common to use a flat method after a map method, that's why we also can use
// the flatMap method. This method is better for performance.
// Example using flatMap:
const overallBalance2 = accounts
  .flatMap(account => account.movements)
  .reduce((accumulator, movement) => accumulator + movement);
console.log(overallBalance2);*/

/* ----- Sorting Arrays (Theory) ------------------------------------------
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];

// Sorting strings
// The sort method mutates the original array
console.log(owners.sort());
console.log(owners); // The original array was mutated

// Sorting numbers
console.log(movements);
// The sort() method only works on strings. So, first it transform each element in a
// string and then sorts them. That's why we don't get the expected result:
// console.log(movements.sort());
// To solve this, we need to pass a callback function to the sort() method, so it can know
// how to sort each item in the array:
//  - return < 0, [a, b] (keep current order)
//  - return > 0, [b, a] (switch the order)

// Ascending order:
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   else return -1;
// });
movements.sort((a, b) => a - b);
console.log(movements);

// Descending order:
movements.sort((a, b) => b - a);
console.log(movements);*/

/* ----- More Ways of Creating and Filling Arrays (Theory) ----------------
// So far, we have created arrays in these two ways
const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// This gives us an array with 7 empty slots:
const x = new Array(7);
console.log(x);
// This doesn't fill the array with the number 5
// console.log(x.map(() => 5));

// This does fill the array with the number 1
// console.log(x.fill(1));
// We can also specify a begin parameter and end parameter
x.fill(1, 3, 5);
console.log(x);

// We can also work with already defined arrays
arr.fill(23, 3, 5);
console.log(arr);

// We can also programatically recreate the first array, using Array.from()
const y = Array.from({ length: 7 }, () => 1);
console.log(y);

const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z);*/

////////////////////////////////////////////////
// PROJECT: "Bankist" App
/* // ----- Creating DOM Elements --------------------------------------------
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  // ----- Sorting Arrays (Practice - Part 1) -----------------------------
  const sortedMovements = sort
    ? movements.slice().sort((a, b) => a - b)
    : movements;

  sortedMovements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__value">${mov}€</div>
        </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// ----- Computing Usernames ----------------------------------------------
const createUsernames = function (accounts) {
  accounts.forEach(function (account) {
    account.username = account.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUsernames(accounts);

// ----- The reduce Method (Practice) -------------------------------------
const calcDisplayBalance = function (account) {
  account.balance = account.movements.reduce((acc, cur) => acc + cur, 0);
  labelBalance.textContent = `${account.balance}€`;
};

// ----- The Magic of Chaining Methods (Practice) -------------------------
const calcDisplaySummary = function (account) {
  const incomes = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const outcomes = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outcomes)}€`;

  const interest = account.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    .filter(interest => interest >= 1)
    .reduce((acc, interest) => acc + interest, 0);
  labelSumInterest.textContent = `${interest}€`;
};

// ----- Implementing Login -----------------------------------------------
let currentAccount;
// Event handler
btnLogin.addEventListener('click', function (e) {
  // Prevent form for submitting and reloading the page
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and a welcome message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner
      .split(' ')
      .at(0)}`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginUsername.blur();
    inputLoginPin.blur();

    updateUI(currentAccount);
  }
});

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Dispaly summary
  calcDisplaySummary(acc);
};

// ----- Implementing Transfers -------------------------------------------
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  // Clear the input fields
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the tranfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    updateUI(currentAccount);
  }
});

// ----- The findIndex Method ---------------------------------------------
// Delete user account
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      acc => acc.username === inputCloseUsername.value
    );
    // Delete account from accounts array
    accounts.splice(index, 1);

    // Hide the UI
    containerApp.style.opacity = 0;
    labelWelcome.textContent = 'Log in to get started';
  }

  inputClosePin.value = inputCloseUsername.value = '';
});

// ----- some and every Methods (Practice)---------------------------------
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const loanAmount = Number(inputLoanAmount.value);
  if (
    loanAmount > 0 &&
    currentAccount.movements.some(mov => mov >= loanAmount * 0.1)
  ) {
    // Deposit the loan amount to the current account
    currentAccount.movements.push(loanAmount);

    // Update the UI
    updateUI(currentAccount);
  }

  // Clear input field
  inputLoanAmount.value = '';
});

// ----- Sorting Arrays (Practice - Part 2) -------------------------------
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  // Switches the sorted variable betweem false and true
  sorted = !sorted;
  displayMovements(currentAccount.movements, sorted);
}); */

/* ----- More Ways of Creating and Filling Arrays (Practice) --------------
labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    mov => Number(mov.textContent.replace('€', ''))
  );
  console.log(movementsUI);

  // We can do it also like this (this was the way of doing it before Array.from())
  // const movementsUI2 = [...document.querySelectorAll('.movements__value')].map(
  //   mov => Number(mov.textContent.replace('€', ''))
  // );
  // console.log(movementsUI2);
}); */

////////////////////////////////////////////////
// ARRAY METHODS PRACTICE

/* // EXERCISE #1
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, curMovement) => sum + curMovement, 0);
console.log(bankDepositSum);

// EXERCISE #2
// const numDeposits1000 = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov >= 1000).length;
// console.log(numDeposits1000);

const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  // If used postfix, with operator after operand (for example, x++), the increment operator increments and returns the value before incrementing.
  // If used prefix, with operator before operand (for example, ++x), the increment operator increments and returns the value after incrementing.
  .reduce((sum, mov) => (mov >= 1000 ? ++sum : sum), 0);
console.log(numDeposits1000);

// EXERCISE #3
const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
      return sums;
    },
    {
      deposits: 0,
      withdrawals: 0,
    }
  );
console.log(deposits, withdrawals);

// EXERCISE #4
const convertTitleCase = function (title) {
  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

  const capitalizeWord = str => str[0].toUpperCase() + str.slice(1);

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitalizeWord(word)))
    .join(' ');
  return capitalizeWord(titleCase);
};
console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE')); */
