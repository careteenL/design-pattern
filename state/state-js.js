/**
 * @desc JS版本的状态模式
 *    ps:1、由于JS无类，没有规定让状态对象一定要从类中创建而来；
 *       2、JS可以非常方便的使用委托技术，并不需要事先让一个对象持有另一个对象。
 */ 
var Light = function () {
  this.currState = FSM.off; // 设置当前状态
  this.button = null;
}
Light.prototype.init = function () {
  var button = document.createElement('button');  
  this.button = document.body.appendChild(button);
  this.button.innerHTML = '开关';
  this.bindEvent();
}
Light.prototype.bindEvent = function () {
  var _self = this;
  this.button.onclick = function () {
    // 把请求委托给FSM状态机
    _self.currState.buttonWasPressed.call(_self);
  }
}
var FSM = {
  off: {
    buttonWasPressed: function () {
      console.log('关灯');
      this.button.innerHTML = '下一次按我是弱光';
      this.currState = FSM.weak;
    }
  },
  weak: {
    buttonWasPressed: function () {
      console.log('弱光');
      this.button.innerHTML = '下一次按我是强光';
      this.currState = FSM.strong;
    }
  },
  strong: {
    buttonWasPressed: function () {
      console.log('强光');
      this.button.innerHTML = '下一次按我是关灯';
      this.currState = FSM.off;
    }
  }
}

// 测试用例
var light = new Light();
light.init();