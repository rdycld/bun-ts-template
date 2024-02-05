const input = await Bun.file('./input.txt').text();

const grid = input
  .split('\n')
  .filter(Boolean)
  .map((l) => l.split(''));

function keygen([y, x]) {
  return `${y},${x}`;
}

let sy,
  sx = 0;

for (let i = 0; i < grid.length; ++i)
  for (let j = 0; j < grid[i].length; ++j)
    if (grid[i][j] === 'S') {
      sy = i;
      sx = j;
      break;
    }

const seen = new Set();

seen.add(keygen([sy, sx]));

const ans = [];

const q = [[131, 0, 64 + 131]];

while (q.length) {
  let next = q.shift();
  let [y, x, s] = next;

  if (s % 2 === 0) ans.push([y, x]);
  if (s === 0) continue;

  for (let [ny, nx] of [
    [y + 1, x],
    [y, x + 1],
    [y - 1, x],
    [y, x - 1],
  ])
    if (
      0 <= ny &&
      ny < grid.length &&
      0 <= nx &&
      nx < grid[ny].length &&
      grid[ny][nx] !== '#' &&
      !seen.has(keygen([ny, nx]))
    ) {
      seen.add(keygen([ny, nx]));
      q.push([ny, nx, s - 1]);
    }
}

console.log(ans.length);

const xd = grid
  .map((r, ri) =>
    r.map((c, ci) => (ans.some((el) => el[0] === ri && el[1] === ci) ? 'O' : c)).join(''),
  )
  .join('\n');
Bun.write('xd.txt', xd);
