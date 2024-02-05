const example = await Bun.file('./example.txt').text();

const data = example
  .split('\n')
  .filter(Boolean)
  .map((line) => line.split(' ').map(Number).reverse());
//            for part2 add .reverse() here ^

let sum = 0;

for (const line of data) {
  const graph = [line];

  do {
    const last = graph[graph.length - 1];
    graph.push([]);
    for (let i = last.length - 1; i > 0; --i) {
      graph[graph.length - 1].unshift(graph[graph.length - 2][i] - graph[graph.length - 2][i - 1]);
    }
  } while (graph[graph.length - 1].reduce((s, v) => s + v, 0) !== 0);
  console.log(graph);
  sum += graph.reduce((s, v) => s + +v[v.length - 1], 0);
}

console.log(sum);
// const data = example
//   .split('\n')
//   .filter(Boolean)
//   .map((line) => line.split(' ').reverse());
// // for part2 remove .reverse()   ^^^^^^^^
//
// let sum = 0;
//
// for (const line of data) {
//   const g = [line];
//
//   do {
//     const gl = g.length;
//     const last = g[gl - 1];
//     g.push([]);
//     for (let i = 0; i < last.length - 1; ++i) {
//       g[gl].push(g[gl - 1][i] - g[gl - 1][i + 1]);
//     }
//   } while (g[g.length - 1].reduce((s, v) => s + v, 0) !== 0);
//   sum += g.reduce((s, v) => s + +v[0], 0);
// }
//
// console.log(sum);
