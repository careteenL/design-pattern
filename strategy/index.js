/**
 * @desc 由于浏览器下不支持require，需要支持模块打包
 *       故模块引入在`index.html`处理
 *       请打开控制台查看效果
 * @note 优点：新增或修改校验规则和新增表单项需在`validataFnc`函数修改；
 *            和`strategies.js`修改。
 *        ps：相比于传统简单处理方式，增加了不少代码量和理解难度，
 *            但是使用策略模式更符合开放-封闭原则。
 *       缺点：使用时需了解策略模式，理解`strategies.js`每一个校验规则并进行选择，
 *            其实违背了最少知识原则，但并不太影响。
 */ 

// 校验处理器
// var Validator = require('./validator.js');
// require('./function-aop.js');

var registerForm = document.getElementById('registerForm');
var userName = document.getElementById('userName');
var userNameError = document.getElementById('userNameError');
var password = document.getElementById('password');
var passwordError = document.getElementById('passwordError');
var phoneNumber = document.getElementById('phoneNumber');
var phoneNumberError = document.getElementById('phoneNumberError');

var isSubmiting = document.getElementById('isSubmiting');

var validator;
// ----------------检验函数添加校验规则-------------------------
var validataFnc = function () {  
  validator = new Validator();
  // 增加校验规则
  validator.add('userName', registerForm.userName.value, [{
    strategy: 'isNonEmpty',
    errorMsg: '用户名不能为空'
  }, {
    strategy: 'minLength:6',
    errorMsg: '用户名长度不能小于6位'
  }]);
  validator.add('password', registerForm.password.value, [{
    strategy: 'minLength:6',
    errorMsg: '密码长度不能小于6位'
  }]);
  validator.add('phoneNumber', registerForm.phoneNumber.value, [{
    strategy: 'isMobile',
    errorMsg: '请填写正确的手机号'
  }]);
  // 遍历规则校验
  var error = validator.start();
  return error;
}
// ----------------表单实时输入-------------------------
userName.addEventListener('input', function (val) {
  var error = validator && validator.start('userName', registerForm.userName.value);
  if (error) {
    console.error(error);
    return false;
  } else {
    userNameError.innerHTML = '';
  }
})
password.addEventListener('input', function (val) {
  var error = validator && validator.start('password', registerForm.password.value);
  if (error) {
    console.error(error);
    return false;
  } else {
    passwordError.innerHTML = '';
  }
})
phoneNumber.addEventListener('input', function (val) {
  var error = validator && validator.start('phoneNumber', registerForm.phoneNumber.value);
  if (error) {
    console.error(error);
    return false;
  } else {
    phoneNumberError.innerHTML = '';
  }
})

// ----------------检验函数执行-------------------------
var _validate = function () {
  var error = validataFnc();
  if (error) {
    console.error(error);
    if (error.key === 'userName') { // 定位到具体项
      userNameError.innerHTML = error.errorMsg;
    }
    if (error.key === 'password') { 
      passwordError.innerHTML = error.errorMsg;
    }
    if (error.key === 'phoneNumber') { 
      phoneNumberError.innerHTML = error.errorMsg;
    }     
    isSubmiting.style.display = 'none';   
    return false; // 终止后续逻辑
  }
  // ...
}

// ----------------真实表单提交-------------------------
var _onSumbit = function () {
  // 提交表单正常逻辑👇
  // ...
  isSubmiting.style.display = 'block';
  console.warn('start submit form ...');
}

// ----------------拆分粒度，提交之前先校验-------------------------
registerForm.onsubmit = function () {
  _onSumbit.before(_validate)();
  // debugger
  if (true) {
    return false;
  }
}