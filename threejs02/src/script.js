import * as THREE from "three";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

const group = new THREE.Group()

scene.add(group)

const box1 = new THREE.Mesh(
  new THREE.BoxGeometry(1,1,1),
  new THREE.MeshBasicMaterial({color:'green'})
)
group.add(box1)

const box2 = new THREE.Mesh(
  new THREE.BoxGeometry(1,1,1),
  new THREE.MeshBasicMaterial({color:'yellow'})
)
group.add(box2)

const box3 = new THREE.Mesh(
  new THREE.BoxGeometry(1,1,1),
  new THREE.MeshBasicMaterial({color:'blue'})
)
group.add(box3)

box1.position.x = -1.9
box2.position.x = 0
box3.position.x = 1.9

group.position.y = 1


/**
 * Objects
 */
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// const mesh = new THREE.Mesh(geometry, material);

//  size of mesh
// mesh.scale.set(2,0.25,0.5)

// mesh.rotation.y = Math.PI * 0.25
// mesh.rotation.x = Math.PI * 0.25
// Default rotation order
// XYZ
// 3D object जब rotate होता है तो वह एक ही समय में तीन axes पर rotate हो सकता है:
// mesh.rotation.reorder('zyx')
// अब rotation order बदल जाएगा:
// mesh.position.x = 1 ------\
// mesh.position.y = -0.6 -------> mesh.position.set(1,-0.6,1)
// mesh.position.z = 1 ------/

// mesh.scale.x = 1 ------\
// mesh.scale.y = -0.6 -------> mesh.scale.set(1,-0.6,1)
// mesh.scale.z = 1 ------/

// mesh.position.set(2,-8,3)
// scene.add(mesh);
// mesh.position.normalize()
// console.log(mesh.position.length());



/**
 * Sizes
*/
const sizes = {
  width: 800,
  height: 600,
};

/**
 * Camera
*/
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
// camera.position.z = 3;
camera.position.set(0,0,3)
// camera.lookAt(mesh.position)

// const axisHelper = new THREE.AxesHelper()
scene.add(camera);
// scene.add(axisHelper)


// क्या करता है: मेश के पोजिशन का ओरिजिन से दूरी बताता है।
// वैल्यू: मेश का ओरिजिन से स्केलर दूरी। (0,0,0) sa kit na dur hai 
// console.log(mesh.position.length());
// क्या करता है: मेश के पोजिशन वेक्टर को यूनिट वектор में बदल देता है, यानी उसकी लंबाई 1 हो जाती है।
// // वैल्यू: नया वektor जिसकी लंबाई 1 होती है।
// यह vector को normalize करता है।
// Normalize का मतलब:
// vector की length = 1 कर देना
// Formula:
// x / length
// y / length
// z / length
// अगर vector है:
// (3,4,0)
// length = 5
// Normalized vector:
// (3/5 , 4/5 , 0)
// (0.6 , 0.8 , 0)
// Console output:
// Vector3 {x:0.6, y:0.8, z:0}
// ⚠️ Important:
// normalize() original vector को modify कर देता है।
// मतलब:
// console.log(mesh.position.normalize());
// यह mesh और camera के बीच distance बताता है।
// console.log(mesh.position.distanceTo(camera.position));
// console.log(mesh.position.distanceTo(new THREE.Vector3()));


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
