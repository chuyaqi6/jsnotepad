var $dlgGoto = (function(){
  var html = ''
    + '<div class="notepad-dlg-goto">'
      + '<div class="dialogbox">'
        + '<div class="titlebar">'
          + '<p class="title">转到指定行</p>'
          + '<span class="close-btn">✖</span>'
        + '</div>'
        + '<div class="main">'
          + '<label>行号(L):</label>'
          + '<br>'
          + '<input class="txt-line-num" type="text" autofocus>'
          + '<br>'
          + '<input class="btn-goto" type="button" value="转到">'
          + '<input class="btn-cancel" type="button" value="取消">'
        + '</div>'
      + '</div>'
    + '</div>',
  $dlg = $(html),
  cfg = {
    lineNum:1,
    totalLine:1,
    //gotoHandler:null
  },
  $btnClose = $dlg.find('.close-btn'),
  $btnCancel = $dlg.find('.btn-cancel'),
  $btnGoto  = $dlg.find('.btn-goto'),
  $txtLineNum = $dlg.find('.txt-line-num'),
  $titleBar = $dlg.find('.titlebar');
  
  // 文本数据校验
  function validate(){
    if($txtLineNum.val()===''){
      alert('行号不能为空');
      return false;
    }
    var num = Number($txtLineNum.val());
    if(isNaN(num)){
      alert('行号必须是数字');
      return false;
    }
    if(num===0){
      alert('行号必须大于等于1');
      return false;
    }
    if(num>cfg.totalLine){
      alert('行号超过了总行数');
      return false;
    }
    return true;
  }
  
  //关闭和撤销
  function closeDlg(){
    $dlg.remove();
  }

  //gotoHandler
  function gotoHandler(){
    if(!validate())return;
    cfg.gotoHandler($txtLineNum.val());
    closeDlg();
  }
  function show(conf){
    $('body').append($dlg);
    $.extend(cfg,conf);
    $txtLineNum.focus();
    $txtLineNum.select();
    $btnClose.click(closeDlg);
    $btnCancel.click(closeDlg);
    $btnGoto.click(gotoHandler);

    $txtLineNum.val(cfg.lineNum);
    $txtLineNum.select();
  }

  return {
    show: show
  } 
}());


// 不用 page load event

// 封装成对象，有几种方案
/*
 * 1.简单对象字面量，不完全是面向对象，不能包括私有方法
 * var timerBtn = function(){
 *  show:function()
 * }
 * 2.工厂函数，一个函数返回值是一个简单对象
 * var timerBtn = function(){
 *  return {
 *    show:function(){}
 *  }
 * }
 * 3.构造函数，function TimerBtn(){
 *
 * }
 * var tb = new TimerBtn();
 * */
