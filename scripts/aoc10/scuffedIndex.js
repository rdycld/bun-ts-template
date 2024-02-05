let input = await Bun.file('./output.txt').text();

let dots = 0;
for (let letter of input) {
  dots += letter === '.';
}
console.log(dots);
