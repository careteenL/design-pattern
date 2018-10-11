/**
 * @desc 使用面向对象编程的思维 编写一个状态模式
 *       灯的开关：关闭->弱光->强光->关闭
 */
// ---------------灯对象-----------------------
var Light = function () {
  this.offLightState = new OffLightState(this);
  this.weakLightState = new WeakLightState(this);
  this.strongLightState = new StrongLightState(this);
  this.button = null;
}
Light.prototype.init = function () {
  var button = document.createElement('button');
  this.button = document.body.appendChild(button);
  this.button.innerHTML = '开关';
  this.currState = this.offLightState;
  this.bindEvent();
}
Light.prototype.bindEvent = function () {
  var _self = this;
  this.button.onclick = function () {
    _self.currState.buttonWasPressed();
  }
}
Light.prototype.setState = function (state) {
  this.currState = state;
}

// -----------------各种状态---------------------
// 关闭
var OffLightState = function (light) {
  this.light = light;
} 
OffLightState.prototype.buttonWasPressed = function () {
  console.log('弱光');
  this.light.setState(this.light.weakLightState);
}
// 弱光
var WeakLightState = function (light) {
  this.light = light;
} 
WeakLightState.prototype.buttonWasPressed = function () {
  console.log('强光');
  this.light.setState(this.light.strongLightState);
}
// 强光
var StrongLightState = function (light) {
  this.light = light;
} 
StrongLightState.prototype.buttonWasPressed = function () {
  console.log('关闭');
  this.light.setState(this.light.offLightState);
}

// -------------------测试用例----------------------------
var light = new Light();
light.init();