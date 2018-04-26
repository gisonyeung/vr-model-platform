/*
 * 控制进度条组件
 */



export default {

  /*
   * opt.percent { Number } 0~100
   * opt.text { String } [optional] 进度条文字，传入此项后则只显示文字
   */
  show(opt = {}) {

    if (opt.text) {
      $('.progress_line').hide();
      $('.progress_text').text(opt.text);
    } else {
      $('.progress_line').show();
      $('.progress_text').text(`加载模型中：${opt.percent || 0}%`);
      $('.progress_line-current').width(`${opt.percent}%` || 0);
    }

    $('.progress_container').show();
  },

  hide() {
    $('.progress_container').fadeOut(200);
  },
}
