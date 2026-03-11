import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from 'l'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// how to create own Geometries
// creating your own buffer geomerty

let group = new THREE.Group()
// Object

const geomerty = new THREE.BufferGeometry()
const count = 50
const array = new Float32Array(50*9);
for(let i = 0;i<=count*3*3;i++){
  array[i] = (Math.random()-0.5)*4
  
}

const positionAttribute = new THREE.BufferAttribute(array,3)
geomerty.setAttribute('position',positionAttribute)
// const array = new Float32Array([0,0,0,0,1,0,1,0,0]);
// const positionAttribute = new THREE.BufferAttribute(array,3)

// geomerty.setAttribute('position',positionAttribute)

// index  0 , 1 , 2 XYZ
// array[0] = 0
// array[1] = 0
// array[2] = 0

// index 0,1,0 vertex
// array[3] = 0
// array[4] = 1
// array[5] = 0

// index tringle 
// array[6] = 1
// array[7] = 0
// array[8] = 0
// console.log(array);



// const mesh1 = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1,3,3,3),
//   new THREE.MeshBasicMaterial({ color: 0xff0000 ,wireframe:true})
// );
// const mesh2 = new THREE.Mesh(
//   new THREE.SphereGeometry(1, 32,32),
//   new THREE.MeshBasicMaterial({ color: 0xff0000 ,wireframe:true})
// );
// group.add(mesh1)
// group.add(mesh2)
// mesh2.position.x = 1
// mesh1.position.x = -1.3

const material = new THREE.MeshBasicMaterial({
  color:0xff000,
  wireframe:true
})

const mesh = new THREE.Mesh(geomerty,material)

scene.add(mesh);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Animate
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

// its a controler of the geomerty
// npm i lil-gui