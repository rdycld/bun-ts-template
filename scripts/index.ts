/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

const root = document.getElementById('root');

if (!root) throw new Error('xd');

type BarChartOptions = {
  barWidth: string;
  barSpace: string;
  entrySpace: string;
};

class BarChart {
  #series: number[][];
  #normalizedSeries: number[][];
  #maxLength: number;
  #barWidth = '10px';
  #barSpace = '10px';
  #entrySpace = '20px';
  #chart: HTMLDivElement;
  #container: HTMLDivElement;
  #containerPadding = '20px';

  constructor(series: number[][]) {
    this.#series = series;
    this.#normalizedSeries = normalizeSeries(series);
    this.#maxLength = series.map((s) => s.length).sort((a, b) => b - a)[0] ?? 0;

    this.#chart = document.createElement('div');
    this.#chart.classList.add('bar-chart');

    this.#container = document.createElement('div');
    this.#container.classList.add('bar-container');

    this.#chart.appendChild(this.#container);
  }

  plot() {
    for (let i = 0; i < this.#maxLength; ++i) {
      const entry = document.createElement('div');
      entry.classList.add('bar-entry');
      entry.classList.add(`bar-entry-${i}`);

      entry.style.columnGap = this.#barSpace;
      entry.style.flexShrink = '0';

      for (let j = 0; j < this.#normalizedSeries.length; ++j) {
        const val = this.#normalizedSeries[j]?.[i] ?? 0;

        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.classList.add(`bar-${j}`);

        bar.style.height = `${val}%`;
        bar.style.width = this.#barWidth;

        const colorBase = (Math.floor(255 / this.#series.length) * j).toString(16);
        const color = colorBase.padEnd(2, colorBase);
        bar.style.backgroundColor = `#${color}${color}ff`;

        entry.appendChild(bar);
      }
      this.#container.appendChild(entry);
    }
    root?.appendChild(this.#chart);
  }
}

const seriesA = [110, 231, 44, 11, 343];
const seriesB = [11, 131, 444, 211, 33];
const seriesC = [211, 31, 1, 51, 233];

const chart = new BarChart([seriesA, seriesB, seriesC]);

chart.plot();

function normalizeSeries(series: number[][]) {
  const max = Math.max(...series.flatMap((x) => x));

  return series.map((s) => s.map((val) => Number((val / max).toFixed(3)) * 100));
}
