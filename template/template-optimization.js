/**
 * @desc 前置知识 好莱坞模式 ’不要来找我，我会给你打电话‘
 *       好莱坞模式改造模板方法模式
 *    ps:在JS语言中，没有必要依葫芦画瓢去实现一个模板方法模式，
 *       高阶函数是更好的选择
 */ 
var Beverage = function (config) {
  var boilWater = function () {
    console.log('把水煮沸');
  };
  var brew = config.brew || function () {
    throw new Error('必须传递brew方法');
  };
  var pourInCup = config.pourInCup || function () {
    throw new Error('必须传递pourInCup方法');
  };
  var addCondiments = config.addCondiments || function () {
    throw new Error('必须传递addCondiments方法');
  };
  // 
  var F = function () {};
  F.prototype.init = function () {
    boilWater();
    brew();
    pourInCup();
    addCondiments();
  }
  return F;
}


// Coffee
var Coffee = Beverage({
  brew: function () {
    console.log( '用沸水冲泡咖啡' );
  },
  pourInCup: function () {
    console.log( '把咖啡倒进杯子' );
  },
  addCondiments: function () {
    console.log( '加糖和牛奶' );
  }  
});
var coffee = new Coffee();
coffee.init();
// 输出
// 把水煮沸
// 用沸水冲泡咖啡
// 把咖啡倒进杯子
// 加糖和牛奶

// Tea
var tea = new Tea();
Tea.init();
var Tea = Beverage({
  brew: function () {
    console.log( '用沸水浸泡茶叶' );
  },
  pourInCup: function () {
    console.log( '把茶倒进杯子' );
  },
  addCondiments: function () {
    console.log( '加柠檬' );
  }  
});
var tea = new Tea();
tea.init();
// 输出
// 把水煮沸
// 用沸水浸泡茶叶
// 把茶倒进杯子
// 加柠檬