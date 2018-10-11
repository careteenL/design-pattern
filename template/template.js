/**
 * @desc 使用面向对象的思想 实现 模板方法模式
 * @note 真的需要继承吗？？？？
 *       改造移步 `template-optimization.js`
 */ 
var Beverage = function () {};
Beverage.prototype.boilWater = function () {
  console.log('把水煮沸');
};
Beverage.prototype.brew = function () {
  throw new Error('子类必须重写brew方法');
};
Beverage.prototype.pourInCup = function () {
  throw new Error('子类必须重写pourInCup方法');
};
Beverage.prototype.addCondiments = function () {
  throw new Error('子类必须重写addCondiments方法');
};
Beverage.prototype.init = function () {
  this.boilWater();
  this.brew();
  this.pourInCup();
  this.addCondiments();
};

// Coffee
var Coffee = function () {};
Coffee.prototype = new Beverage();
Coffee.prototype.constructor = Coffee;

Coffee.prototype.brew = function () {
  console.log( '用沸水冲泡咖啡' );
};
Coffee.prototype.pourInCup = function () {
  console.log( '把咖啡倒进杯子' );
};
Coffee.prototype.addCondiments = function () {
  console.log( '加糖和牛奶' );
};
var coffee = new Coffee();
coffee.init();
// 输出
// 把水煮沸
// 用沸水冲泡咖啡
// 把咖啡倒进杯子
// 加糖和牛奶

// Tea
var Tea = function () {};
Tea.prototype = new Beverage();
Tea.prototype.constructor = Tea;

Tea.prototype.brew = function () {
  console.log( '用沸水浸泡茶叶' );
};
Tea.prototype.pourInCup = function () {
  console.log( '把茶倒进杯子' );
};
Tea.prototype.addCondiments = function () {
  console.log( '加柠檬' );
};
var tea = new Tea();
Tea.init();
// 输出
// 把水煮沸
// 用沸水浸泡茶叶
// 把茶倒进杯子
// 加柠檬