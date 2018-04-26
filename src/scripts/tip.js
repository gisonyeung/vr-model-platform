const $tip = $('.tip');
const $tipText = $('.tip_text');

let timer = null;


const show = ({ text = '正在操作中...', duration = 1000 }) => {
  $tipText.text(text);
  $tip.fadeIn(150);

  if (timer) {
    clearTimeout(timer);
  }

  timer = setTimeout(() => {
    $tip.fadeOut(150);
    timer = null;
  }, duration);
};

const hide = () => {
  $tip.hide();
}

export default {
  show,
  hide
}