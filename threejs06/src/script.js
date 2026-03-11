import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();


// Fullscrene
window.addEventListener('dblclick', (e) => {

  if (!document.fullscreenElement) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
})
/**
 * Object
 */

const group = new THREE.Group()

const box1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);

const box2 = new THREE.Mesh(
  // ConeGeometry(radius, height, radialSegments, heightSegments)
  new THREE.ConeGeometry(0.5, 1, 32, 1),
  new THREE.MeshBasicMaterial({ color: 'yellow' })
);

const box3 = new THREE.Mesh(
  //   CylinderGeometry(
  //   radiusTop,
  //   radiusBottom,
  //   height,
  //   radialSegments
  // )
  new THREE.CylinderGeometry(0.5, 0.5, 1.5, 32),
  new THREE.MeshBasicMaterial({ color: 'pink' })
);
const box4 = new THREE.Mesh(
  //   SphereGeometry(
  //   radius,
  //   widthSegments,
  //   heightSegments
  // )
  new THREE.SphereGeometry(0.5, 32, 32),
  new THREE.MeshBasicMaterial({ color: 'blue' })
);

box2.position.x = -2.9
box1.position.x = -1.2
box3.position.x = 0.09
box4.position.x = 2

group.add(box2)
group.add(box1)
group.add(box3)
group.add(box4)
scene.add(group);


/**
 * Sizes
 */
let sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

/**
 * Camera
 */
// Base camera
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


//resizing
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  // update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // update renderer
  renderer.setSize(sizes.width, sizes.height)

})

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.max(window.devicePixelRatio, 2))
/**
 * Animate
 */
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
