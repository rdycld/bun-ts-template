const input = await Bun.file('./graph.txt').text();

const graph = JSON.parse(input);

const testGraph = {
  '0,1': {
    '5,3': 15,
  },
  '3,11': {
    '11,21': 30,
    '13,13': 24,
    '5,3': 22,
  },
  '5,3': {
    '0,1': 15,
    '3,11': 22,
    '13,5': 22,
  },
  '11,21': {
    '3,11': 30,
    '19,19': 10,
    '13,13': 18,
  },
  '13,5': {
    '5,3': 22,
    '13,13': 12,
    '19,13': 38,
  },
  '13,13': {
    '3,11': 24,
    '11,21': 18,
    '19,13': 10,
    '13,5': 12,
  },
  '19,13': {
    '13,13': 10,
    '19,19': 10,
    '13,5': 38,
  },
  '19,19': {
    '11,21': 10,
    '22,21': 5,
    '19,13': 10,
  },
  '22,21': {
    '19,19': 5,
  },
};

const start = '0,1';

const paths = [[start, 0, new Set()]];
paths[0][2].add(start);
const answ = [];

while (paths.length) {
  let [node, length, seen] = paths.pop();
  if (node === '140,139') {
    answ.push([node, length, seen]);
  }

  for (let v in graph[node]) {
    if (seen.has(v)) {
      continue;
    }
    let newCache = new Set(seen);
    newCache.add(v);

    paths.push([v, length + graph[node][v], new Set(newCache)]);
  }
}
console.log(answ.sort((a, b) => -a[1] + b[1])[0]);
