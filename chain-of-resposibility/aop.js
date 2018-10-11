/**
 * @desc 使用面向切面编程思想实现职责链模式
 */ 
Function.prototype.after = function (fn) {
  var _self = this;
  return function () {
    var ret = _self.apply(this, arguments);
    if (ret === 'nextSuccessor') {
      return fn.apply(this, arguments);
    }
    return ret;
  }
}
// 测试用例
var order = order500.after(order200).after(orderNormal);
order(1, true, 500);
order(2, true, 500);
order(1, false, 500);
// 总结： 使用AOP实现职责链既简单又巧妙，
//       但这种把函数叠在一起的方式，同时也叠加了函数的作用域，
//       如果链条太长，会有性能问题。