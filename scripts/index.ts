/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

const loader = document.createElement('div');
loader.classList.add('loader', 'hide');
loader.innerText = 'LOADING.... LOADING...';

const body = document.querySelector('body');
assert(body);
body.appendChild(loader);

const gallery = document.querySelectorAll('img.photo');

for (const photo of gallery) {
  if (!(photo instanceof HTMLImageElement)) continue;

  photo.addEventListener('click', onPhotoClick);
}

function onPhotoClick(this: HTMLImageElement) {
  addBackdrop();
  addLoader();
  openImage.bind(this)();
}

function addLoader() {
  assert(loader);
  loader.classList.remove('hide');
}

function openImage(this: HTMLImageElement) {
  const img = new Image();

  img.classList.add('highlight-img');
  img.src = this.src;

  img.onload = function () {
    assert(body);
    body.appendChild(img);
    loader.classList.add('hide');
  };
}

function addBackdrop() {
  const backdrop = document.createElement('div');
  backdrop.classList.add('backdrop');

  backdrop.addEventListener('click', removeMe);
  document.querySelector('body')?.appendChild(backdrop);
}

function assert(val: unknown): asserts val {
  if (!val) {
    throw new Error('foo');
  }
}

function removeMe(this: HTMLElement) {
  if (!(this instanceof HTMLElement)) return;
  // this.parentNode?.removeChild(this);
  this.remove();
}
