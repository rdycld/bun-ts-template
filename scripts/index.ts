/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
//
setInterval(function () {
  // Call a function repetatively with 2 Second interval
  getData();
}, 2000); //2000mSeconds update rate

function getData() {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById('ADCValue').innerHTML = this.responseText;
    }
  };
  xhttp.open('GET', 'readADC', true);
  xhttp.send();
}
