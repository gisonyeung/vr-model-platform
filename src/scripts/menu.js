import progress from './progress';
import mode from './mode';
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
    var loader = new THREE.OBJLoader(manager);
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

    }, onProgress, onError);
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
      if (currentModel !== modelName) {
        tip.hide();
        currentModel = modelName;

        modelList[modelName](scene);

        mode.show();
        
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