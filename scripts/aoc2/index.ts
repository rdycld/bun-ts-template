const target = {
  red: 12,
  green: 13,
  blue: 14,
};

function parseGame(game) {
  const gameInfo = {
    max: {},
    power: 0,
    rounds: [],
  };
  const colonIndex = game.indexOf(':');
  const rawRounds = game.substring(colonIndex + 1);
  const rounds = rawRounds.split(';');
  for (let i = 0; i < rounds.length; i++) {
    const results = rounds[i].split(',');
    const outcomes = {
      red: 0,
      green: 0,
      blue: 0,
    };
    for (let j = 0; j < results.length; j++) {
      const result = results[j].trim().split(' ');
      const count = Number(result[0]);
      outcomes[result[1]] = count;
      if (gameInfo.max[result[1]]) {
        if (count > gameInfo.max[result[1]]) {
          gameInfo.max[result[1]] = count;
        }
      } else {
        gameInfo.max[result[1]] = count;
      }
    }
    gameInfo.rounds.push(outcomes);
  }

  gameInfo.power = gameInfo.max.red * gameInfo.max.green * gameInfo.max.blue;

  return gameInfo;
}

function isGamePossible(game, target) {
  let possible = true;
  for (const key in target) {
    if (game.max[key] > target[key]) {
      possible = false;
      break;
    }
  }

  return possible;
}
const input = await Bun.file('./input.txt').text();

//Read each line in the file named fileName
const file = input;
const games = file.split(/\r?\n/).filter(Boolean);

const possibleGames = [];
const totalPower = [];
const impossibleGames = [];

for (let i = 0; i < games.length; i++) {
  const game = parseGame(games[i]);
  totalPower.push(game.power);
  const gamePossible = isGamePossible(game, target);
  if (gamePossible) {
    possibleGames.push(i + 1);
  } else {
    impossibleGames.push(i + 1);
  }
}

const sumPossibleGames = possibleGames.reduce((a, b) => a + b, 0);
const sumTotalPower = totalPower.reduce((a, b) => a + b, 0);
const sumImpossibleGames = impossibleGames.reduce((a, b) => a + b, 0);

console.log(`Possible games sum: ${sumPossibleGames}`);
console.log(`Total power sum: ${sumTotalPower}`);
console.log(`Impossible games sum: ${sumImpossibleGames}`);
