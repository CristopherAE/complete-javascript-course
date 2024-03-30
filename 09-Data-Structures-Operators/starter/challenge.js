'use strict';

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

/* ------------------------- Coding Challenge #1 ---------------------------------
// 1. Create one player array for each team (variables 'players1' and 'players2')
const [players1, players2] = game.players;
// console.log(players1, players2);

// 2. The first player in any player array is the goalkeeper and the others are field
// players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name,
// and one array ('fieldPlayers') with all the remaining 10 field players
const [gk, ...fieldPlayers] = players1;
// console.log(gk, fieldPlayers);

// 3. Create an array 'allPlayers' containing all players of both teams (22 players)
const allPlayers = [...players1, ...players2];
// console.log(allPlayers);

// 4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a
// new array ('players1Final') containing all the original team1 players plus
// 'Thiago', 'Coutinho' and 'Perisic'
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
// console.log(players1Final);

// 5. Based on the game.odds object, create one variable for each odd (called
// 'team1', 'draw' and 'team2')
const { team1, x: draw, team2 } = game.odds;
// console.log(team1, draw, team2);

// 6. Write a function ('printGoals') that receives an arbitrary number of player
// names (not an array) and prints each of them to the console, along with the
// number of goals that were scored in total (number of player names passed in)
game.printGoals = function (...names) {
  for (let i = 0; i < names.length; i++) {
    console.log(names[i]);
  }
  console.log(`Goals: ${names.length}`);
};

game.printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
game.printGoals(...game.scored);

// 7. The team with the lower odd is more likely to win. Print to the console which
// team is more likely to win, without using an if/else statement or the ternary operator.
console.log(
  (team1 < team2 && 'Team 1 is more likely to win') ||
    'Team 2 is more likely to win'
); */

/* ------------------------- Coding Challenge #2 ---------------------------------
// 1. Loop over the game.scored array and print each player name to the console,
//    along with the goal number (Example: "Goal 1: Lewandowski")
for (const [i, name] of game.scored.entries()) {
  console.log(`Goal ${i + 1}: ${name}`);
}

// 2. Use a loop to calculate the average odd and log it to the console (We already
//    studied how to calculate averages, you can go check if you don't remember)
const odds = Object.values(game.odds);
let avg = 0;
for (const odd of odds) {
  avg += odd;
}
console.log(`Average odd: ${avg / odds.length}`);

// 3. Print the 3 odds to the console, but in a nice formatted way, exactly like this:
//    Odd of victory Bayern Munich: 1.33
//    Odd of draw: 3.25
//    Odd of victory Borrussia Dortmund: 6.5
//    Get the team names directly from the game object, don't hardcode them
//    (except for "draw"). Hint: Note how the odds and the game objects have the
//    same property names 😉
for (const [team, value] of Object.entries(game.odds)) {
  console.log(
    `Odd of ${team === 'x' ? 'draw' : 'victory'} ${
      game?.[team] ?? ''
    }: ${value}`
  );
}

// 4. Bonus: Create an object called 'scorers' which contains the names of the
//    players who scored as properties, and the number of goals as the value. In this
//    game, it will look like this:
//    const scorers = {
//      Gnarby: 1,
//      Hummels: 1,
//      Lewandowski: 2,
//    };
const scorers = {};
for (const name of game.scored) {
  scorers[name] ? scorers[name]++ : (scorers[name] = 1);
}
console.log(scorers); */

/* ------------------------- Coding Challenge #3 ---------------------------------
const gameEvents = new Map([
  [17, '⚽ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽ GOAL'],
  [80, '⚽ GOAL'],
  [92, '🔶 Yellow card'],
]);

// 1. Create an array 'events' of the different game events that happened (no
//   duplicates)
const events = [...new Set(gameEvents.values())];
console.log(events);

// 2. After the game has finished, is was found that the yellow card from minute 64
//    was unfair. So remove this event from the game events log.
gameEvents.delete(64);

// 3. Compute and log the following string to the console: "An event happened, on
//    average, every 9 minutes" (keep in mind that a game has 90 minutes)
console.log(
  `An event happened, on average, every ${90 / gameEvents.size} minutes`
);

// 4. Loop over 'gameEvents' and log each element to the console, marking
//    whether it's in the first half or second half (after 45 min) of the game, like this:
// [FIRST HALF] 17: ⚽ GOAL
for (const [minute, event] of gameEvents) {
  console.log(
    `${minute < 45 ? '[FIRST HALF]' : '[SECOND HALF]'} ${minute}: ${event}`
  );
} */

/* ------------------------- Coding Challenge #4 ---------------------------------
// Write a program that receives a list of variable names written in underscore_case
// and convert them to camelCase. The input will come from a textarea inserted into
// the DOM (see code below to insert the elements), and conversion will happen when the
// button is pressed. Test data (pasted to textarea, including spaces):
// underscore_case
//  first_name
// Some_Variable
//   calculate_AGE
// delayed_departure
// Should produce this output (5 separate console.log outputs):
// underscoreCase     ✅
// firstName          ✅✅
// someVariable       ✅✅✅
// calculateAge       ✅✅✅✅
// delayedDeparture   ✅✅✅✅✅
// Hints:
// - Remember which character defines a new line in the textarea 😉
// - The solution only needs to work for a variable made out of 2 words, like a_b
// - Start without worrying about the ✅. Tackle that only after you have the variable
//   name conversion working 😉
// - This challenge is difficult on purpose, so start watching the solution in case
//   you're stuck. Then pause and continue!
// Afterwards, test with your own test data!

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

const txtArea = document.querySelector('textarea');
const btn = document.querySelector('button');

const toCamelCase = function (str) {
  const words = str.toLowerCase().split('_');
  return words[0] + words[1].replace(words[1][0], words[1][0].toUpperCase());
};

btn.addEventListener('click', e => {
  const variableNames = txtArea.value.split('\n');
  for (const [i, name] of variableNames.entries()) {
    console.log(toCamelCase(name.trim()).padEnd(20) + '✅'.repeat(i + 1));
  }
}); */
