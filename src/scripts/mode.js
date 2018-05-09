import tip from './tip';

window.currentMode = 'mobile';

const show = () => {
  $('.mode_selector').show();
};

const hide = () => {
  $('.mode_selector').hide();
}

const toggleWire = (isOpen) => {

  window.isLineMode = isOpen;
  if (window.cube.material) {
    window.cube.material.wireframe = isOpen;
  } else {
    window.cube.children.forEach((item) => {
      item.material.wireframe = isOpen;
    });
  }

}

const updateWire = () => {
  toggleWire(window.isLineMode);
}



const toggle = (mode) => {

  if (window.currentMode == mode) return;

  if (mode !== 'line') {
    window.currentMode = mode;
  }

  if (mode == 'mobile') {
    tip.show({ text: '已切换到手机浏览模式' });

    $('.model_panel').fadeIn(200);
    $('.mode_item.radio').removeClass('active');
    $('.mode_item.mobile').addClass('active');

    $('#mobile-output').show();
    $('#vr-output').hide();

  } else if (mode == 'vr') {
    tip.show({ text: '已切换到VR展示模式' });

    $('.model_panel').fadeOut(200);
    $('.mode_item.radio').removeClass('active');
    $('.mode_item.vr').addClass('active');

    $('#vr-output').show();
    $('#mobile-output').hide();

    effect.requestPresent();
    
  } else if (mode == 'line') {
    if (window.isLineMode) {
      $('.mode_item.line').removeClass('active');


      toggleWire(false);
      
    } else {
      $('.mode_item.line').addClass('active');
      toggleWire(true)
    }

  }

  render();
}


const init = () => {

  $('.mode_selector').on('click', '.mode_item', function() {

    toggle($(this).attr('data-target'));
  });
  
}


export default {
  show,
  hide,
  toggle,
  toggleWire,
  updateWire,
  init,
}