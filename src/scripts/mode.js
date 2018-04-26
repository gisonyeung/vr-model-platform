import tip from './tip';

window.currentMode = 'mobile';

const show = () => {
  $('.mode_selector').show();
};

const hide = () => {
  $('.mode_selector').hide();
}

const toggle = (mode) => {

  if (window.currentMode == mode) return;

  window.currentMode = mode;

  if (mode == 'mobile') {
    tip.show({ text: '已切换到手机浏览模式' });

    $('.model_panel').fadeIn(200);
    $('.mode_item').removeClass('active');
    $('.mode_item.mobile').addClass('active');

    $('#mobile-output').show();
    $('#vr-output').hide();

  } else if (mode == 'vr') {
    tip.show({ text: '已切换到VR展示模式' });

    $('.model_panel').fadeOut(200);
    $('.mode_item').removeClass('active');
    $('.mode_item.vr').addClass('active');

    $('#vr-output').show();
    $('#mobile-output').hide();

    effect.requestPresent();
    
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
  init,
}