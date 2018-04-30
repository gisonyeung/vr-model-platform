import progress from './progress';
import mode from './mode';
import rotation from './rotation';
import tip from './tip';


let currentModel;

var manager = new THREE.LoadingManager();
manager.onProgress = function( item, loaded, total ) {

  console.log( item, loaded, total );
  progress.hide();

};

function onProgress(xhr) {
  if ( xhr.lengthComputable ) {

    var percentComplete = xhr.loaded / xhr.total * 100;

    let percent = Math.round( percentComplete, 2 );

    console.log( percent + '% downloaded' );
    
    progress.show({ percent });

  }

}

function onError(xhr) {
  progress.show({ text: '加载 ${currentModel} 模型时出现未知错误' });
  console.log(xhr);
};

let modelList = {
  model_4P() {
    let loaderPromise = new Promise((resolve, reject) => {
      let loader = new THREE.OBJLoader(manager);
      loader.load( '/assets/models/obj/4P_50x.obj', function( object ) {

        window.cube = object.children[0].clone();
        if (window._aspect == 90) {
          cube.position.set(0,20,-20)
          cube.rotation.set(0,0,90)
        } else {
          cube.position.set(165,0,0)
          cube.rotation.set(0,0,0)
        }
        cube.scale.set(20,20,20)

        scene.add(cube);
        
        window.cube_vr = object.children[0].clone();
        cube_vr.position.set(0, controls_vr.userHeight || 0, -1)
        cube_vr.rotation.set(0,0,0)
        cube_vr.scale.set(0.08,0.08,0.08)
        scene_vr.add(cube_vr);

        resolve();

      }, onProgress, onError);
    });

    return loaderPromise;

  },
  model_rectifier() {

    let loaderPromise = new Promise((resolve, reject) => {
      let loader = new THREE.OBJLoader(manager);
      loader.load( '/assets/models/obj/rectifier.obj', function( object ) {

        window.cube = object.children[0].clone();

        cube.scale.set(15,15,15)
        cube.rotation.set(0.5,0,0)
        scene.add(cube);
        
        window.cube_vr = object.children[0].clone();
        cube_vr.position.set(0, controls_vr.userHeight || 0, -1)
        cube_vr.rotation.set(0.5,0,0)
        cube_vr.scale.set(0.04,0.04,0.04)
        scene_vr.add(cube_vr);

        resolve();

      }, onProgress, onError);
    });

    return loaderPromise;
  },
  model_chair() {

    let loaderPromise = new Promise((resolve, reject) => {
      let loader = new THREE.JSONLoader(manager);
      loader.load('/assets/models/json/chair.js', function (geometry, mat) {
        var mesh = new THREE.Mesh(geometry, mat[0]);

        window.cube = mesh.clone();
        cube.scale.set(100,100,100);
        cube.position.set(0, -80, 0)
        scene.add(cube);

        window.cube_vr = mesh.clone();
        cube_vr.position.set(0, controls_vr.userHeight / 1.3 || 0, -1)
        cube_vr.rotation.set(0,0,0)
        cube_vr.scale.set(0.3,0.3,0.3)
        scene_vr.add(cube_vr);

        resolve();

      }, onProgress, onError);
    });

    return loaderPromise;
  }
}


/*
 * 模型列表菜单事件初始化
 */
const initHandler = () => {

  $('.model_list').on('click', '.model_item', function(e) {

    e.stopPropagation();

    let modelName = $(this).attr('data-name');

    if (modelName && typeof(modelList[modelName]) == 'function') {

      camera.lookAt(new THREE.Vector3(0, 0, 0));
      camera.position.set(10,15,300);
      camera.rotation.set(0,0,0);
      camera.up.set(0,1,0);
      camera.scale.set(1,1,1);

      if (currentModel !== modelName) {

        if (window.cube_vr) {
          scene_vr.remove(window.cube_vr);
          window.cube_vr = null;
        } 

        if (window.cube) {
          scene.remove(window.cube);
          window.cube = null;
        }

        tip.hide();

        currentModel = modelName;

        modelList[modelName](scene)
          .then(() => {
            if (window.isLineMode) {
              window.cube.material.wireframe = true;
            } else {
              window.cube.material.wireframe = false;
            }
          });

        mode.show();
        rotation.show();
        
        $('.model_item.active').removeClass('active');
        $(this).addClass('active');
      }
    } else {
      tip.show({ text: '暂未适配此模型' });
    }


  });

}


export default {
  initHandler
}