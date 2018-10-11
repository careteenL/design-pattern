/**
 * @desc 缓存代理工厂函数
 */

// ---------------各种算法 start-----------------------
// 乘法运算函数
const mult = function () {
  // debugger
  console.log('Exe mult function ...');
  let product = 1;
  for (let i = 0; i < arguments.length; i++) {
    product = product * arguments[i];    
  }
  return product;
}
// 加法运算函数
const plus = function () {
  // debugger
  console.log('Exe mult function ...');
  let sum = 0;
  for (let i = 0; i < arguments.length; i++) {
    sum = sum + arguments[i];    
  }
  return sum;
}
// ---------------各种算法 end-----------------------

// ---------------缓存代理工厂函数 start-----------------------
// 缓存代理函数
const createProxyFactory = function (fn) {
  // 闭包缓存
  let cache = {};
  return function () {
    let args = Array.prototype.join.call(arguments, ',');
    // 有缓存直接使用
    if (args in cache) {
      return cache[args];
    }
    // 否则调用函数
    return cache[args] = fn.apply(this, arguments);
  }
}
// ---------------缓存代理工厂函数 end-----------------------


// 测试用例
const proxyMult = createProxyFactory(mult);
console.log(proxyMult(1,2,3,4)); // 24 
console.log(proxyMult(1,2,3,4)); // 24 读取缓存

const proxyPlus = createProxyFactory(plus);
console.log(proxyPlus(1,2,3,4)); // 10
console.log(proxyPlus(1,2,3,4)); // 10 读取缓存