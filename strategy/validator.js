/**
 * @desc 校验类，执行时校验过程及结果委托给Strategies策略类
 */ 

// var Strategies = require('./strategies.js');

var Validator = function () {  
  this.cache = []; // 存储单个实例所有校验规则
};

/**
 * @desc 增加校验规则
 * @param {String} key 
 * @param {String|Number} value 
 * @param {Array} rules 
 *            [{strategy: '', errorMsg: ''}]
 */ 
Validator.prototype.add = function (key, value, rules) {
  var self = this;
  for (var i = 0, rule; rule = rules[ i++ ];) {
    (function (rule){
      var single = {
        key: key,
        fn: function (val) {     
          value = val || value; // 可传值为了实现校验单个          
          var strategyAry = rule.strategy.split(':'); // 将strategy和参数分开
          var errorMsg = rule.errorMsg;          
          var strategy = strategyAry.shift(); // 用户指定的strategy          
          strategyAry.unshift(value); // 将被校验值加入参数列表          
          strategyAry.push(errorMsg); // 将errorMsg也加入参数列表
          // 容错处理
          if (!Strategies[strategy]) {
            throw new Error('请在strategies.js中添加策略：' + strategy);
            return false;
          }
          console.log('strategyAry', strategyAry);
          // 委托 策略类封装的校验规则 进行校验
          return Strategies[strategy].apply(null, strategyAry);
        }
      };
      // 将校验步骤用空函数包装起来，并且存储在cache中
      self.cache.push(single);
    })(rule)
  }
};

/**
 * @desc 校验规则
 * @param {String} key 传则只校验某一个，否则校验所有
 * @return {Boolean|Object} 返回false表示通过校验，为对象则表示未通过
 *                    Object: {key: 'key', errorMsg: 'errorMsg'}
 */ 
Validator.prototype.start = function (key, value) {
  // 校验某个规则
  if (key) {
    for (var i = 0, validator; validator = this.cache[i++];) {
      if (key === validator.key) {
        var errorMsg = validator.fn(value);
        if (errorMsg) {
          return {
            key: key,
            errorMsg: errorMsg
          }          
        }
      }
    }
    return false;
  }
  // 遍历所有加入的校验规则
  for (var i = 0, validator; validator = this.cache[i++];) {
    var errorMsg = validator.fn();
    // 若没通过校验则终止遍历并返回当前错误信息
    if (errorMsg){
      return {
        key: validator.key,
        errorMsg: errorMsg
      }
    }    
  }
  return false;
};

// module.exports = Validator;