/// <reference lib="dom" />
// /// <reference lib="dom.iterable" />
//
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
//
// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);
//
// camera.position.z = 5;
//
// const raycaster = new THREE.Raycaster();
// const pointer = new THREE.Vector2(-1, -1);
//
// function onPointerMove(event: MouseEvent) {
//   // calculate pointer position in normalized device coordinates
//   // (-1 to +1) for both components
//
//   pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
//   pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
// }
//
// function intersects() {
//   raycaster.setFromCamera(pointer, camera);
//   const intersections = raycaster.intersectObjects(scene.children);
//
//   for (const child of scene.children) {
//     if (raycaster.intersectObject(child, false).length === 0) {
//       child.material.color.set(0x00ff00);
//     }
//   }
//
//   for (const obj of intersections) {
//     obj.object.material.color.set(0xff0000);
//   }
// }
//
// function click(e: MouseEvent) {
//   const pointer = new THREE.Vector2(
//     (e.clientX / window.innerWidth) * 2 - 1,
//     -(e.clientY / window.innerHeight) * 2 + 1,
//   );
//   raycaster.setFromCamera(pointer, camera);
//
//   const intersections = raycaster.intersectObjects(scene.children);
//   for (const i of intersections) {
//     console.log(i.point);
//   }
// }
//
// //controls.update() must be called after any manual changes to the camera's transform
// camera.position.set(0, 20, 100);
// //
// //
// //
// //
// //
// const controls = new OrbitControls(camera, renderer.domElement);
// controls.update();
// controls.listenToKeyEvents(window); // optional
//
// // controls.addEventListener('change', render); // call this only in static scenes (i.e., if there is no animation loop)
// //
// controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
// controls.dampingFactor = 0.05;
// //
// controls.screenSpacePanning = false;
// //
// controls.minDistance = 100;
// controls.maxDistance = 500;
// //
// controls.maxPolarAngle = Math.PI / 2;
// function animate() {
//   requestAnimationFrame(animate);
//   intersects();
//
//   controls.update();
//   renderer.render(scene, camera);
// }
// animate();
// window.addEventListener('click', click);
// window.addEventListener('pointermove', onPointerMove);
//

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);

const controls = new OrbitControls(camera, renderer.domElement);

//controls.update() must be called after any manual changes to the camera's transform
camera.position.set(0, 20, 100);
controls.update();

function animate() {
  requestAnimationFrame(animate);

  // required if controls.enableDamping or controls.autoRotate are set to true
  controls.update();

  renderer.render(scene, camera);
}
