/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

const root = document.getElementById('root');

if (!root) throw new Error('xd');

const container = document.createElement('div');

container.style.width = '100%';
container.style.height = '100%';
container.style.display = 'flex';
container.style.justifyContent = 'space-evenly';
container.style.alignItems = 'flex-end';

class BarChart {
  #series: number[][];
  #normalizedSeries: number[][];
  #maxLength: number;

  constructor(series: number[][]) {
    this.#series = series;
    this.#normalizedSeries = normalizeSeries(series);

    this.#maxLength = series.map((s) => s.length).sort((a, b) => b - a)[0] ?? 0;
  }

  plot() {
    for (let i = 0; i < this.#maxLength; ++i) {
      const entry = document.createElement('div');

      entry.style.display = 'flex';
      entry.style.height = '100%';
      entry.style.alignItems = 'flex-end';

      for (let j = 0; j < this.#normalizedSeries.length; ++j) {
        const val = this.#normalizedSeries[j]?.[i] ?? 0;

        const bar = document.createElement('div');

        bar.style.height = `${val}%`;
        bar.style.width = '10px';

        const colorBase = (Math.floor(255 / this.#series.length) * j).toString(16);
        const color = colorBase.padEnd(2, colorBase);
        bar.style.backgroundColor = `#${color}${color}ff`;

        entry.appendChild(bar);
      }
      container.appendChild(entry);
    }
  }
}

const seriesA = [110, 231, 44, 11, 343];
const seriesB = [11, 131, 444, 211, 33];
const seriesC = [211, 31, 1, 51, 233];

const chart = new BarChart([seriesA, seriesB, seriesC]);

chart.plot();

root.appendChild(container);

function normalizeSeries(series: number[][]) {
  const max = Math.max(...series.flatMap((x) => x));

  return series.map((s) => s.map((val) => Number((val / max).toFixed(3)) * 100));
}
