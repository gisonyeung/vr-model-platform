require('../styles/index.scss');

import menu from './menu';

// var stats;
var controls;
var scene, renderer, camera;
var light;


scene = new THREE.Scene();

renderer = new THREE.WebGLRenderer();
renderer.setClearColor(new THREE.Color(0xFFFFFF));
renderer.setClearAlpha(0);
renderer.setSize(window.innerWidth, window.innerHeight);

camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.x = 10;
camera.position.y = 15;
camera.position.z = 300;
camera.lookAt(new THREE.Vector3(0, 0, 0));

document.getElementById("webgl-output").appendChild(renderer.domElement);

// stats
// stats = new Stats();
// document.getElementById("stats-output").appendChild(stats.domElement);


light = new THREE.HemisphereLight(0xffffff, 0x444444, 1.0);
light.position.set(0, 1, 0);
scene.add(light);

light = new THREE.HemisphereLight(0xCC0055, 0x1B00CC, 0.1);
light.position.set(0, 1, 0);
scene.add(light);



light = new THREE.DirectionalLight(0xffffff, 1.0);
light.position.set(0, 1, 0);
scene.add(light);


function init() {
  controls = new THREE.TrackballControls( camera ); 

  controls.rotateSpeed = 1.0;
  controls.zoomSpeed = 1.2;
  controls.panSpeed = 0.8;

  controls.noZoom = false;
  controls.noPan = true;

  controls.staticMoving = true;
  controls.dynamicDampingFactor = 0.3;

  controls.keys = [ 65, 83, 68 ];

  menu.initHandler(scene);

  controls.addEventListener( 'change', render );

  render();

}



function animate() {
  // renderer.autoClear = true;
  

  requestAnimationFrame(animate);
  controls.update();
}

function render() {

  // stats.update();
  renderer.render(scene, camera);

}

window.onload = function() {
  init();
  animate();
  render();
}

window.onresize = function() {
  $('body').width(window.innerWidth);
  $('body').height(window.innerHeight);

  camera.aspect = window.innerWidth / window.innerHeight;

  // camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );
  controls.handleResize();
  render();
};