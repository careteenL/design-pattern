/**
 * @desc 使用面向切面编程的思维 编写一个状态模式。
 *       为对`./state-oop.js`的优化；
 *       主要是为了增加抽象类的变通方式，保证开发人员编程时编写必要的方法。
 *       灯的开关：关闭->弱光->强光->关闭。
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

// -----------------状态工厂---------------------
var State = function () {}
State.prototype.buttonWasPressed = function () {
  throw new Error('父类的buttonWasPressed方法必须被重写');
}

// -----------------各种状态---------------------
// 关闭
var OffLightState = function (light) {
  this.light = light;
} 
OffLightState.prototype = new State(); // 继承状态工厂抽象父类
OffLightState.prototype.buttonWasPressed = function () {
  console.log('弱光');
  this.light.setState(this.light.weakLightState);
}
// 弱光
var WeakLightState = function (light) {
  this.light = light;
} 
WeakLightState.prototype = new State();
WeakLightState.prototype.buttonWasPressed = function () {
  console.log('强光');
  this.light.setState(this.light.strongLightState);
}
// 强光
var StrongLightState = function (light) {
  this.light = light;
} 
StrongLightState.prototype = new State();
StrongLightState.prototype.buttonWasPressed = function () {
  console.log('关闭');
  this.light.setState(this.light.offLightState);
}

// -------------------测试用例----------------------------
var light = new Light();
light.init();
// 在新增状态时，若没有编写buttonWasPressed方法，
// 在程序运行时会报错，通知开发者编写必要的方法。