
export default {
  resize() {
    const width = document.documentElement.clientWidth;
    const height = document.documentElement.clientHeight;

    let $container = $('#container');

    // 竖屏浏览，通过 rotate 转成横向显示
    if (width < height) {
      window._aspect = 90;
      $container
        .css('position', 'absolute')
        .css('width', height)
        .css('height', width)
        .css('top', (height - width) / 2)
        .css('left', 0 - (height - width) / 2)
        .css('transform', 'rotate(90deg)');
    } else {
      window._aspect = 0;
      $container
        .css('position', 'static')
        .css('width', width)
        .css('height', height)
        .css('transform', 'none');
    }
  },
}
