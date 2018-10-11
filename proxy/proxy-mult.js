/**
 * @desc 代理模式实践 - 缓存代理 - 同步
 */ 

// 乘法运算函数
const mult = function () {
  // debugger
  console.log('exe mult function...');
  let product = 1;
  for (let i = 0; i < arguments.length; i++) {
    product = product * arguments[i];    
  }
  return product;
}

// 缓存代理函数
const proxyMult = (function () {
  // 闭包缓存
  let cache = {};
  return function () {
    let args = Array.prototype.join.call(arguments, ',');
    // 有缓存直接使用
    if (args in cache) {
      return cache[args];
    }
    // 否则调用乘积运算函数
    return cache[args] = mult.apply(this, arguments);
  }
})()

// 测试用例
proxyMult(1,2,3,4); // 24
proxyMult(1,2,3,4); // 24 读取缓存，不进行`mult`函数运算
