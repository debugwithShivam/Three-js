// THREE एक बहुत बड़ा JavaScript object है जिसमें Three.js की सारी classes और tools होते हैं
// console.log(THREE) <-- es ma three.js kar na ka sara tools hai 


// Scene Three.js की सबसे important class है।
// यह पूरी 3D stage / container होती है जहाँ तुम objects रखते हो।
let scene = new THREE.Scene() // <-- 3D module ka container 


// यह object की shape / structure define करता है।
// BoxGeometry(width, height, depth)
// width = 2
// height = 2
// depth = 2
const geometry = new THREE.BoxGeometry(2,2,2); // object ko hight with depth data hai  

// Material बताता है कि object दिखेगा कैसे।
const materil = new THREE.MeshBasicMaterial({color:'red'}) //<- object ko color data hai 

// geometry ,materil ko combine kar ta hai 
const box = new THREE.Mesh(geometry,materil)

scene.add(box) // <-- scene ma object add kar raha hai  

// तो तुम 3D scene को देखने के लिए virtual camera बना रहे हो। यह camera आता है Three.js से।
// const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)

// parameter 1
// fov = camera का view angle (degree में) मतलब camera कितना area देख सकता है।
// 30°  → zoomed camera
// 75°  → normal camera
// 120° → wide angle camera

// parameter 2
// aspect = width / height मतलब screen का ratio 
// window.innerWidth / window.innerHeight
// 16:9 monitor
// 1920 / 1080

// parameter 3
// near = 0.1 यह minimum distance है जहाँ से camera objects देखना शुरू करेगा।
// अगर object camera के बहुत पास है और near से छोटा distance है तो वह render नहीं होगा।

// parameter 4
// far = 1000 यह maximum distance है। 
// तो 1000 units से दूर object दिखाई नहीं देगा।
// मतलब camera कितनी दूर तक objects render करेगा।
//           far
//         ________
//        /        \
//       /          \
//      /            \
//     /              \
//    /                \
//   /__________________\
//         near
//          camera
const camera = new THREE.PerspectiveCamera(  75,700 / 500,0.1,1000) // <-- camera 
    //     Y // → up / down
    //     ↑
    //     |
    //     |
    //     |
        // O --------→ X // → left right
    //    /
    //   /
    //  Z  // → forward / backward
camera.position.z = 4;
camera.position.x = 2;
camera.position.y = 1;
scene.add(camera)

// rendering
// अगर renderer नहीं होगा तो कुछ भी दिखाई नहीं देगा, चाहे scene और objects सही हों।
// const renderer = new THREE.WebGLRenderer({
//   antialias: true,
//   alpha: true,
//   canvas: myCanvas
// })

// 1) antialias
// यह edges को smooth करता है।
// अगर false होगा:
// cube edges jagged दिखेंगे
// अगर true:
// edges smooth दिखेंगे

// 2) alpha
// alpha: true
// इसका मतलब:
// canvas background transparent होगा
// अगर false:
// background solid color होगा

//  3) canvas
// अगर तुम खुद का canvas use करना चाहते हो:
// const renderer = new THREE.WebGLRenderer({
//   canvas: document.querySelector("#myCanvas")
// })
// तब Three.js नया canvas नहीं बनाएगा।

// > Renderer के important methods
// 1️⃣ setSize()
// renderer.setSize(width, height)
// Example: renderer.setSize(window.innerWidth, window.innerHeight)
// यह canvas का size set करता है।

// 2️⃣ render()
// सबसे important method।
// renderer.render(scene, camera)
// मतलब:
// scene को camera से देखो
// और screen पर draw करो

const target = document.querySelector('#webgl')

const renderer = new THREE.WebGLRenderer({canvas:target}) //तो तुम renderer object बना रहे हो जो 3D scene को स्क्रीन पर draw करता है।
renderer.setSize(window.innerWidth,window.innerHeight)
renderer.render(scene,camera)
// Scene = 3D world data
// Camera = कहाँ से देखना है
// Renderer = उस world को स्क्रीन पर draw करना