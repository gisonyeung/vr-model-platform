require('../styles/index.scss');

import menu from './menu';
import orientation from './orientation';
import mode from './mode';

// var stats;
window.controls = null;;
window.controls_vr = null;;
window.camera = null;
window.camera_vr = null;
window.effect = null;
window.renderer = null;
window.renderer_vr = null;
window.scene = null;
window.scene_vr = null;
var light;
var lastRenderTime;
var skybox;
var boxSize = 5;
var vrDisplay;
var vrButton;


scene = new THREE.Scene();

renderer = new THREE.WebGLRenderer();
renderer.setClearColor(new THREE.Color(0xFFFFFF));
renderer.setClearAlpha(0);
renderer.setSize(window.innerWidth, window.innerHeight);

camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.set(10,15,300);
camera.lookAt(new THREE.Vector3(0, 0, 0));

document.getElementById("mobile-output").appendChild(renderer.domElement);



scene_vr = new THREE.Scene();

renderer_vr = new THREE.WebGLRenderer();
renderer_vr.setClearColor(new THREE.Color(0xFFFFFF));
renderer_vr.setClearAlpha(0);
renderer_vr.setSize(window.innerWidth, window.innerHeight);

camera_vr = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
camera_vr.position.set(0,0,0);

document.getElementById("vr-output").appendChild(renderer_vr.domElement);


// stats
// stats = new Stats();
// document.getElementById("stats-output").appendChild(stats.domElement);


light = new THREE.HemisphereLight(0xffffff, 0x444444, 1.0);
light.position.set(0, 1, 0);
scene.add(light.clone());
scene_vr.add(light.clone());

light = new THREE.HemisphereLight(0xCC0055, 0x1B00CC, 0.1);
light.position.set(0, 1, 0);
scene.add(light.clone());
scene_vr.add(light.clone());


light = new THREE.DirectionalLight(0xffffff, 1.0);
light.position.set(0, 1, 0);
scene.add(light.clone());
scene_vr.add(light.clone());


function init() {
  controls = new THREE.TrackballControls(camera);

  controls.rotateSpeed = 1.0;
  controls.zoomSpeed = 1.2;
  controls.panSpeed = 0.8;
  controls.noZoom = false;
  controls.noPan = true;
  controls.staticMoving = true;
  controls.dynamicDampingFactor = 0.3;
  controls.keys = [ 65, 83, 68 ];
  controls.addEventListener('change', render);


  controls_vr = new THREE.VRControls(camera_vr);

  controls_vr.standing = true;
  camera_vr.position.y = controls_vr.userHeight;

  effect = new THREE.VREffect(renderer_vr);
  effect.setSize(window.innerWidth, window.innerHeight);



  menu.initHandler();

  var uiOptions = {
    color: 'black',
    background: 'white',
    corners: 'square'
  };

  vrButton = new webvrui.EnterVRButton(renderer_vr.domElement, uiOptions);
  vrButton.on('exit', function() {
    
    mode.toggle('mobile');

    camera_vr.quaternion.set(0, 0, 0, 1);
    camera_vr.position.set(0, controls_vr.userHeight, 0);
  });

  var loader1 = new THREE.TextureLoader();
  loader1.load('/assets/images/box.png', onTextureLoaded);

  window.addEventListener('resize', onResize, true);
  window.addEventListener('vrdisplaypresentchange', onResize, true);

  render();

}

// function init() {
//   controls = new THREE.VRControls(camera);

//   window.controls = controls;

//   controls.standing = true;
//   camera.position.y = controls.userHeight;

//   effect = new THREE.VREffect(renderer);

//   effect.setSize(window.innerWidth, window.innerHeight);

//   menu.initHandler(scene);

//   var uiOptions = {
//     color: 'black',
//     background: 'white',
//     corners: 'square'
//   };

//   vrButton = new webvrui.EnterVRButton(renderer.domElement, uiOptions);
//   vrButton.on('exit', function() {
    
//     mode.toggle('mobile')

//     camera.quaternion.set(0, 0, 0, 1);
//     camera.position.set(0, controls.userHeight, 0);
//   });


//   var loader1 = new THREE.TextureLoader();
//   loader1.load('/assets/images/box.png', onTextureLoaded);


//   window.addEventListener('resize', onResize, true);
//   window.addEventListener('vrdisplaypresentchange', onResize, true);


//   render();

// }

function onTextureLoaded(texture) {
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(boxSize, boxSize);

  var geometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
  var material = new THREE.MeshBasicMaterial({
    map: texture,
    color: 0x0037DB,
    side: THREE.BackSide
  });

  // Align the skybox to the floor (which is at y=0).
  skybox = new THREE.Mesh(geometry, material);
  skybox.position.y = boxSize/2;

  scene_vr.add(skybox);

  // For high end VR devices like Vive and Oculus, take into account the stage
  // parameters provided.
  setupStage();
}

window.setupStage = function() {
  navigator.getVRDisplays().then(function(displays) {
    if (displays.length > 0) {
      vrDisplay = displays[0];
      if (vrDisplay.stageParameters) {
        setStageDimensions(vrDisplay.stageParameters);
      }
      vrDisplay.requestAnimationFrame(animate);
    }
  });
}

window.setStageDimensions = function(stage) {
  // Make the skybox fit the stage.
  var material = skybox.material;
  scene_vr.remove(skybox);

  // Size the skybox according to the size of the actual stage.
  var geometry = new THREE.BoxGeometry(stage.sizeX, boxSize, stage.sizeZ);
  skybox = new THREE.Mesh(geometry, material);

  // Place it on the floor.
  skybox.position.y = boxSize/2;
  scene_vr.add(skybox);

  // Place the cube in the middle of the scene, at user height.
  if (window.cube_vr && controls_vr.userHeight) {
    window.cube_vr.position.set(0, controls_vr.userHeight, 0);
  }
  
}



var lastRenderTime = 0;
function animate(timestamp) {
  // renderer.autoClear = true;

  if (window.currentMode == 'mobile') {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  } else {

    var delta = Math.min(timestamp - lastRenderTime, 500);
    lastRenderTime = timestamp;

    if (window.cube_vr) {
      window.cube_vr.rotation.y += delta * 0.0006;
    }

    if (vrButton.isPresenting()) {
      controls_vr.update();
    }

    if (effect) {
      effect.render(scene_vr, camera_vr);
    }

    if (vrDisplay) {
      vrDisplay.requestAnimationFrame(animate);
    }
  }


}

window.render = function() {

  // stats.update();

  if (currentMode == 'mobile') {
    renderer.render(scene, camera);
  } else {
    renderer_vr.render(scene_vr, camera_vr);
  }


}

window.onload = function() {
  init();
  animate();
  render();

  mode.init();

  orientation.resize();
}


function onResize() {
  $('body').width(window.innerWidth);
  $('body').height(window.innerHeight);


  if (effect) {
    effect.setSize(window.innerWidth, window.innerHeight);
  }

  camera.aspect = window.innerWidth / window.innerHeight;
  camera_vr.aspect = window.innerWidth / window.innerHeight;

  // camera.updateProjectionMatrix();
  orientation.resize();
  camera.updateProjectionMatrix();
  camera_vr.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer_vr.setSize( window.innerWidth, window.innerHeight );

  if (window.currentMode == 'mobile') {
    controls.handleResize();
  }

  render();
}