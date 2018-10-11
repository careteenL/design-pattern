/**
 * @desc 使用AOP装饰函数
 */  
// 新函数在原函数之前执行
Function.prototype.before = function (beforeFn) {
  // 保存原函数的引用
  var _self = this;
  // 返回包含了原函数和新函数的代理函数
  return function () {
    // 执行新函数，且保证this不被劫持，新函数接受的参数也会被原封不动的传入原函数，
    // 新函数在原函数之前执行
    beforeFn.apply(this, arguments);
    // 执行原函数并返回原函数的执行结果，并且保证this不被劫持
    return _self.apply(this, arguments);
  }
}
// 原函数在新函数之前执行
Function.prototype.after = function (afterFn) {
  var _self = this;
  return function () {
    var ret = _self.apply(this, arguments);
    afterFn.apply(this, arguments);
    return ret;
  }
}

// 测试用例
window.onload = function () {
  console.log(2);
}
// 为onload函数添加装饰函数
window.onload = (window.onload || function () {}).before(function() {
  console.log(1);
}).after(function () {
  console.log(3);
})
// 输出 => 1 2 3


// ---------------变通----------
// 我不是很喜欢这种污染原型的方式
// 将原函数和新函数都当做参数的 改进如下
var before = function (fn, beforeFn) {
  return function () {
    beforeFn.apply(this, arguments);
    return fn.apply(this, arguments);
  }
}
var after = function (fn, afterFn) {
  return function () {
    var ret = fn.apply(this, arguments);
    afterFn.apply(this, arguments);
    return ret;
  }
}
var careteen = before(
  function() {
    console.log(2)
  },
  function () {
    console.log(1)
  }
);
careteen = after(
  careteen,
  function () {
    console.log(3);
  }
)
careteen();
// 输出 => 1 2 3