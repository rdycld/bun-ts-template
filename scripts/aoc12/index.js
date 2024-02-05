const { info } = require('console');
const { pbkdf2 } = require('crypto');

const input = await Bun.file('./input.txt').text();
function combinations(collection, combinationLength) {
  let head,
    tail,
    result = [];
  if (combinationLength > collection.length || combinationLength < 1) {
    return [];
  }
  if (combinationLength === collection.length) {
    return [collection];
  }
  if (combinationLength === 1) {
    return collection.map((element) => [element]);
  }
  for (let i = 0; i < collection.length - combinationLength + 1; i++) {
    head = collection.slice(i, i + 1);
    tail = combinations(collection.slice(i + 1), combinationLength - 1);
    for (let j = 0; j < tail.length; j++) {
      result.push(head.concat(tail[j]));
    }
  }
  return result;
}

const formatedInput = input
  .split('\n')
  .filter(Boolean)
  .map((l) => l.split(' '))
  .map(([m, v]) => [m, v.split(',').map((x) => +x)]);
// .map(([map, info]) => {
//   return [map + map + map + map + map, [...info, ...info, ...info, ...info, ...info]];
// });

function range(val) {
  const _range = Array(val);
  for (let i = 0; i < val; ++i) _range[i] = i;

  return _range;
}

function incrementFrom(arr, from, by) {
  for (let i = from; i < arr.length; ++i) arr[i] += by;
}

function sumArr(arr) {
  return arr.reduce((s, c) => s + c);
}

function getAvailable(line) {
  const [map, info] = line;

  const combs = combinations(range(map.length - sumArr(info) + 1), info.length);

  const results = [];

  for (let comb of combs) {
    let next = Array(map.length).fill('.');
    for (let i = 0; i < comb.length; ++i) {
      for (let j = 0; j < next.length; ++j) {
        if (comb[i] === j) {
          for (let k = j; k < j + info[i]; ++k) {
            next[k] = '#';
          }

          incrementFrom(comb, i + 1, info[i]);
          j += info[i];
        }
      }
    }

    results.push(next.join(''));
  }
  return results;
}

function compare(guess, map) {
  let hit = 1;

  for (let i = 0; i < map.length; ++i) {
    hit = map[i] === '?' || map[i] === guess[i];
    if (!hit) break;
  }

  return hit;
}

const cache = {};

function count(config, vals) {
  if (config === '') return vals.length === 0 ? 1 : 0;

  if (vals.length === 0) return /#/.test(config) ? 0 : 1;

  const key = config + String(vals);
  if (key in cache) return cache[key];

  let result = 0;

  if (/[.?]/.test(config[0])) result += count(config.substring(1), vals);

  if (/[#?]/.test(config[0]))
    if (
      vals[0] <= config.length &&
      !/\./.test(config.substring(0, vals[0])) &&
      (vals[0] === config.length || config[vals[0]] !== '#')
    ) {
      result += count(config.substring(vals[0] + 1), vals.slice(1));
    }
  cache[key] = result;
  return result;
}

let lol = 0;

const p2Input = formatedInput.map(([map, config]) => {
  return [
    map + '?' + map + '?' + map + '?' + map + '?' + map,
    [...config, ...config, ...config, ...config, ...config],
  ];
});

p2Input.forEach((line) => {
  console.log(line);
  const sum = count(...line);
  lol += sum;
});

console.log(lol);

// cache = {}
//
// def count(cfg, nums):
//
//     if cfg[0] in "#?":
//         if nums[0] <= len(cfg) and "." not in cfg[:nums[0]] and (nums[0] == len(cfg) or cfg[nums[0]] != "#"):
//             result += count(cfg[nums[0] + 1:], nums[1:])
//
//     cache[key] = result
//     return result
//
// total = 0
//
// for line in open(0):
//     cfg, nums = line.split()
//     nums = tuple(map(int, nums.split(",")))
//
//     cfg = "?".join([cfg] * 5)
//     nums *= 5
//
//     total += count(cfg, nums)
//
// print(total)
