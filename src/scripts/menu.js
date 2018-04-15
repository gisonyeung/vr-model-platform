import progress from './progress';


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
  model_4P(scene) {
    var loader = new THREE.OBJLoader(manager);
    loader.load( '/assets/models/obj/4P_50x.obj', function( object ) {

      // object.scale.set(100,100,100)
      // object.position.set(-100,-100,100)

      var mesh = object.children[0];

      console.log(mesh);

    
      // let meshMaterial = new THREE.MeshPhongMaterial({ color: 0xCCCCCC });

      // let cube = new THREE.Mesh(mesh, meshMaterial);


      // console.log(cube)

      mesh.scale.set(20,20,20)
      mesh.position.set(165,0,0)
      scene.add(mesh);

    }, onProgress, onError);
  },
}


/*
 * 模型列表菜单事件初始化
 */
const initHandler = (scene) => {

  $('.model_list').on('click', '.model_item', function(e) {
    let modelName = $(this).attr('data-name');

    if (modelName && typeof(modelList[modelName]) == 'function') {
      if (currentModel !== modelName) {
        currentModel = modelName;

        modelList[modelName](scene);
        
        $('.model_item.active').removeClass('active');
        $(this).addClass('active');
      }
    } else {
      alert('暂未适配此模型');
    }


  });

}


export default {
  initHandler
}