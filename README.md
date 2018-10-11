## JS设计模式

### 前言

目的是提高代码可读性、复用性、可扩展性。

### 传送门

- [面向对象的JavaScript](https://github.com/careteenL/design-pattern/blob/master/20180921_oop-js.md)
- [单例模式](https://github.com/careteenL/design-pattern/blob/master/20180926_singleton.md)
- [策略模式](https://github.com/careteenL/design-pattern/blob/master/20180926_strategy.md)
- [代理模式](https://github.com/careteenL/design-pattern/blob/master/20180926_proxy.md)
- [发布-订阅模式](https://github.com/careteenL/design-pattern/blob/master/20180928_publish-subscribe.md)
- [命令模式](https://github.com/careteenL/design-pattern/blob/master/20180929_command.md)
- [组合模式](https://github.com/careteenL/design-pattern/blob/master/20180929_composite.md)
- [模板方法模式](https://github.com/careteenL/design-pattern/blob/master/20180930_template.md)
- [享元模式](https://github.com/careteenL/design-pattern/blob/master/20180930_flyweight.md)
- [职责链模式](https://github.com/careteenL/design-pattern/blob/master/20181001_chain-of-resposibility.md)
- [状态模式](https://github.com/careteenL/design-pattern/blob/master/20181003_state.md)
- [适配器模式](https://github.com/careteenL/design-pattern/blob/master/20181003_adapter.md)
...

### 目录

- [单例模式](#单例模式)
- [简单工厂模式](#简单工厂模式)
...

### 引用

- [JavaScript设计模式与开发实践 - 曾探](https://github.com/careteenL/design-pattern/blob/master/pdf)

### 单例模式

#### What

单例模式定义为产生一个类的唯一实例。

#### How & Where

简易单例(创建一个浮层)
```js
let singleton = () => {
  let createMask
  return () => {
    return createMask || (createMask = document.body.appendChild(document.createElement('div')))
  }
}()
// use
singleton() // 执行创建
singleton() // 利用缓存
// 多次调用只会执行一次创建代码
```
利用闭包内使用外部函数的变量不会被垃圾回收机制回收的特性，可缓存`createMask`变量，实现单例模式。

以上实现存在一定缺点，如对`createMask`操作变化，需直接修改`singleton`，那就毫无复用性可言。

优化如下
```js
let singleton = (fn) => {
  let result
  return () => {
    return result || (result = fn.apply(this, arguments))
  }
}
// use
let createMask = singleton(() => {
  return document.body.appendChild(document.createElement('div')))
})
```
真正创建浮层的代码是通过回调函数的方式传入`singleton`包装器中，其实这种方式叫`桥接模式`。往后会介绍此模式。

### 简单工厂模式

#### What

简单工厂模式是由一个方法来决定到底要创建哪个类的实例, 而这些实例经常都拥有相同的接口. 这种模式主要用在所实例化的类型在编译期并不能确定， 而是在执行期决定的情况。 说的通俗点，就像公司茶水间的饮料机，要咖啡还是牛奶取决于你按哪个按钮。

#### How & Where

简单工厂模式在工作中使用十分频繁。比如封装的ajax库，会根据传参确定是调用`get`还是`post`。

ES5中对new的实现使用到了简单工厂模式
```js
function A(name) {
  this.name = name
}

function ObjectFactory() {
  let obj = {},
      Constructor = Array.prototype.shift.call(arguments)
  obj.__proto__ = typeof Constructor.prototype === 'number' ? 
    Object.prototype : 
    Constructor.prototype
  let ret = Constructor.apply(obj, arguments)
  // 返回值取决于传参
  return typeof ret === 'object' ? ret : obj
}

let a = ObjectFactory(A, 'Careteen')
alert(a.name)  // Careteen
```
以上代码可知，所谓的new，本身只是一个对象的复制和改写过程，最终具体生成什么是由调用时传参决定。