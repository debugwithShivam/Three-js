import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import GUI from 'lil-gui'


let gui = new GUI(
  {
    width:500,
    title:'DeBugUI',
    closeFolders:true
  }
)
// gui.hide()
// gui.close()
let guiProps = {
  val: 12,
  color: '#ff0000',
}

// Folders
// const cubeTweaks gui.addFolder("Awesome cube");
// cubeTweaks.add(mesh.position, "y");
// cubeTweaks.add(mesh, "visible");
// const cubeTweaks = gui.addFolder("Awesome cube");
// cubeTweaks.close();
const scroller = gui.addFolder('folder')


window.addEventListener('keydown',(e)=>{
  if(e.key == 'h'){
    gui.show(gui._hidden)
  }
})

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
const material = new THREE.MeshBasicMaterial({ color: guiProps.color, });
const mesh = new THREE.Mesh(geometry, material);

guiProps.spin = () => {
  gsap.to(mesh.rotation, {
    delay: 1,
    y: mesh.rotation.y + Math.PI * 2,
    duration:2
  })
}


guiProps.segement = 2


// The different types of tweaks
// Range -for numbers with minimum and maximum value
// Color-for colors with various formats
// Text-for simple texts
// Checkbox -for booleans (true or false)
// Select-for a choice from a list of values
// Button -to trigger functions
// Range
// gui.add(mesh.position, "y");
// gul.add(mesh.position, "y", -3, 3, 0.01);
// gui.add(mesh.position, "y").min(-3).max(3).step(0.01);
// gut.add(mesh.position, "y").min(-3).max(3).step(0.01).name("elevation");
// gui.add(mesh.position,'y')

scroller.add(mesh.position, 'y').min(-3).max(1.9).step(0.01).name('PositionY')
scroller.add(guiProps, 'val').min(0).max(100).step(1).name('Value')
gui.add(material, 'wireframe');
gui.add(mesh, 'visible')
gui.addColor(guiProps, 'color').onChange(() => { material.color.set(guiProps.color) })
scroller.add(guiProps,'segement').onChange(()=>{
  // mesh.geometry.dispose()
  mesh.geometry = new THREE.BoxGeometry(1,1,1,guiProps.segement,guiProps.segement,guiProps.segement)
}).min(1).max(20).step(1)
gui.add(guiProps,'spin')

scene.add(mesh);

/**
 * Sizes
 */
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
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

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
