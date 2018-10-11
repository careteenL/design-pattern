/**
 * @desc 策略类。封装各种具体算法，并负责具体计算过程。
 *       存放校验规则，可根据需求扩展
 */ 
var Strategies = {
  // 必填项
  isNonEmpty: function (value, errorMsg) {
    if (value === '') {
      return errorMsg || '请填写';
    }
  },
  // 最小长度控制
  minLength: function (value, length, errorMsg) {
    if (value.length < length) {
      return errorMsg || '最小长度为' + length;
    }
  },
  // 最大长度控制
  maxLength: function (value, length, errorMsg) {
    if (value.length > length) {
      return errorMsg || '最小长度为' + length;
    }
  },
  // 是否为手机号
  isMobile: function (value, errorMsg) {
    if (!/^((13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])+\d{8})$/.test(value)) {
      return errorMsg || '请填写正确手机号';
    }
  }
};
// module.exports = Strategies;