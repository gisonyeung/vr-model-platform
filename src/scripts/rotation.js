
let currentDir = '';
let timer = null;
let delta = 0.02;


const show = () => {
  $('.control_panel').show();
};

const hide = () => {
  $('.control_panel').hide();
}


const rotate = (dir) => {

  if (window.cube) {
    if (dir == 'up') {
      window.cube.rotation.x -= delta;
    } else if (dir == 'down') {
      window.cube.rotation.x += delta;
    } else if (dir == 'left') {
      window.cube.rotation.y -= delta;
    } else if (dir == 'right') {
      window.cube.rotation.y += delta;
    }
  }

}

const step = () => {
  timer = setTimeout(() => {
    rotate(currentDir)
    step();
  }, 16);
};

const init = () => {

  $('.control_panel').on('touchstart', '.control_arrow', function() {

    currentDir = $(this).attr('data-target');

    step();
    
  });

  $('body').on('touchend', function() {


    if (currentDir) {
      currentDir = '';
      clearTimeout(timer);
      timer = null;
    }
    
  });

}


export default {
  show,
  hide,
  rotate,
  init,
}