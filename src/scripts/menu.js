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

        object.children[0].material.color.set(0x222222);


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
      loader.load( '/assets/models/obj/rectifier.obj', function( group  ) {


        group.children.forEach((item) => {
          if (item.name.indexOf('Text') < 0) {
            item.material.color.set(0x000000);
          } else {
            item.material.color.set(0xeeeeee);
          }
        });

        window.cube = group.clone();




        cube.scale.set(15,15,15)
        cube.rotation.set(0.5,0,0)
        scene.add(cube);
        
        window.cube_vr = group.clone();
        cube_vr.position.set(0, controls_vr.userHeight || 0, -1)
        cube_vr.rotation.set(0.5,0,0)
        cube_vr.scale.set(0.04,0.04,0.04)
        scene_vr.add(cube_vr);

        resolve();

      }, onProgress, onError);
    });

    return loaderPromise;
  },
  model_mixtable() {

    let loaderPromise = new Promise((resolve, reject) => {
      let loader = new THREE.OBJLoader(manager);
      loader.load( '/assets/models/obj/mixtable.obj', function( group ) {

        group.children.forEach((item) => {

          if (!item.material.color) {
            item.material.forEach((materialItem) => {
              materialItem.color.set(0x000000);
            })
          }
          
          if (item.name.indexOf('Text') < 0) {
            item.material.color && item.material.color.set(0x000000);
          } else {
            item.material.color && item.material.color.set(0xeeeeee);
          }
        });

        group.children.splice(0,13);

        window.cube = group.clone();

        cube.scale.set(30,30,30)
        cube.rotation.set(0.7,0,0)
        scene.add(cube);
        
        window.cube_vr = group.clone();
        cube_vr.position.set(0, controls_vr.userHeight || 0, -1)
        cube_vr.rotation.set(0.5,0,0)
        cube_vr.scale.set(0.08,0.08,0.08)
        scene_vr.add(cube_vr);

        resolve();

      }, onProgress, onError);
    });

    return loaderPromise;
  },
  model_cymometer() {

    let loaderPromise = new Promise((resolve, reject) => {
      let loader = new THREE.OBJLoader(manager);
      loader.load( '/assets/models/obj/cymometer.obj', function( group ) {

        group.children.forEach((item) => {

          if (item.name.indexOf('Box') >= 0 || item.name.indexOf('Cylinder') >= 0) {
            item.material.color.set(0x222222);
          } else if (item.name.indexOf('Text') >= 0) {
            item.material.color.set(0xffffff);
          } else {
            item.material.color.set(0xBE2D45);
          }
        });


        window.cube = group.clone();

        cube.scale.set(30,30,30)
        cube.rotation.set(0.5,-0.3,0.05)
        scene.add(cube);
        
        window.cube_vr = group.clone();
        cube_vr.position.set(0, controls_vr.userHeight || 0, -1)
        cube_vr.rotation.set(0.5,-0.3,0.05)
        cube_vr.scale.set(0.1,0.1,0.1)
        scene_vr.add(cube_vr);

        resolve();

      }, onProgress, onError);
    });

    return loaderPromise;
  },
  model_vintageRouter() {

    let loaderPromise = new Promise((resolve, reject) => {
      let loader = new THREE.OBJLoader(manager);
      loader.load( '/assets/models/obj/vintageRouter.obj', function( group ) {

        window.cube = group.clone();




        cube.scale.set(25,25,25)
        cube.rotation.set(0.5,0,0)
        scene.add(cube);
        
        window.cube_vr = group.clone();
        cube_vr.position.set(0, controls_vr.userHeight || 0, -1)
        cube_vr.rotation.set(0.5,0,0)
        cube_vr.scale.set(0.06,0.06,0.06)
        scene_vr.add(cube_vr);

        resolve();

      }, onProgress, onError);
    });

    return loaderPromise;
  },
  model_QMeter() {

    let loaderPromise = new Promise((resolve, reject) => {
      let loader = new THREE.OBJLoader(manager);
      loader.load( '/assets/models/obj/QMeter.obj', function( group ) {

        group.children.forEach((item) => {
          if (item.name.indexOf('Box') >= 0) {
            item.material.color.set(0x92A178);
          } else if (item.name.indexOf('Cylinder') >= 0 || item.name.indexOf('Text') >= 0 ) {
            item.material.color.set(0x333333);
          } else if (item.name == 'Object') {
            item.material.color.set(0xCCCCCC);
          } else {
            item.material.color.set(0x333333);
          }
        });

        group.children[0].material.color.set(0xffffff)
        group.children[14].material.color.set(0xffffff)
        group.children[16].material.color.set(0xffffff)
        group.children[17].material.color.set(0xffffff)
        group.children[22].material.color.set(0xffffff)
        group.children[24].material.color.set(0xffffff)
        group.children[2].material.color.set(0xffffff)
        group.children[4].material.color.set(0x333333);
        group.children[6].material.color.set(0xcccccc)
        group.children[9].material.color.set(0xcccccc)
        group.children[12].material.color.set(0xcccccc)
        group.children[13].material.color.set(0xcccccc)
        group.children[18].material.color.set(0xcccccc)
        group.children[23].material.color.set(0xcccccc)

        
        window.cube = group.clone();

        cube.scale.set(35,35,35)
        cube.rotation.set(0,-1.5,-0.3)
        scene.add(cube);
        
        window.cube_vr = group.clone();
        cube_vr.position.set(0, controls_vr.userHeight || 0, -1)
        cube_vr.rotation.set(0,-1.5,-0.3)
        cube_vr.scale.set(0.1,0.1,0.1)
        scene_vr.add(cube_vr);

        resolve();

      }, onProgress, onError);
    });

    return loaderPromise;
  },
  model_DB101() {

    let loaderPromise = new Promise((resolve, reject) => {
      let loader = new THREE.OBJLoader(manager);
      loader.load( '/assets/models/obj/DB101.obj', function( group ) {


        group.children[0].material.forEach((item) => {
          item.color.set(0x333333);
        });

        group.children[0].material[3].color.set(0x999999)
        group.children[0].material[4].color.set(0x999999)
        group.children[0].material[5].color.set(0x5F45D3)
        group.children[0].material[6].color.set(0x999999)
        group.children[0].material[7].color.set(0xffffff)
        group.children[0].material[8].color.set(0xD39845)
        group.children[0].material[10].color.set(0xD33131)
        group.children[0].material[11].color.set(0xffffff)
        group.children[0].material[12].color.set(0xD6DC28)



        
        window.cube = group.clone();

        cube.scale.set(500,500,500)
        cube.rotation.set(0.4,0,0)
        scene.add(cube);
        
        window.cube_vr = group.clone();
        cube_vr.position.set(0, controls_vr.userHeight || 0, -1)
        cube_vr.rotation.set(0.4,0,0)
        cube_vr.scale.set(1.5,1.5,1.5)
        scene_vr.add(cube_vr);

        resolve();

      }, onProgress, onError);
    });

    return loaderPromise;
  },
  model_keyboard() {

    let loaderPromise = new Promise((resolve, reject) => {
      let loader = new THREE.OBJLoader(manager);
      loader.load( '/assets/models/obj/keyboard.obj', function( group ) {

        group.children.forEach((item) => {
          if (item.name.indexOf('key') >= 0) {
            item.material.color.set(0xeeeeee);
          } else {
            item.material.color.set(0xE3457C);
          }
        });

        
        window.cube = group.clone();

        cube.scale.set(20,20,20)
        cube.rotation.set(-0.5,0,0)
        cube.position.set(-20,-50,0)
        scene.add(cube);
        
        window.cube_vr = group.clone();
        cube_vr.position.set(0, controls_vr.userHeight || 0, -1)
        cube_vr.rotation.set(-0.5,0,0)
        cube_vr.scale.set(0.06,0.06,0.06)
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
  },


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
            mode.updateWire();
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