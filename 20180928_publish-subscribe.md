## 发布订阅模式

### 前言

### 应用

- [实现一个支持1.先发布后调用 2.命名空间 两个功能的发布-订阅模式](https://github.com/careteenL/webFEDeveloper/tree/master/Front-end-knowledge/design-pattern/publish-subscribe/publish-subscribe.js)

### 总结

#### 优点

- 时间解耦
- 对象之间解耦
- 还能实现一些别的设计模式，比如中介者模式

#### 缺点

- 创建订阅者需要消耗时间和内存，当订阅一个消息后，可能这个消息到最后都没有发生过，但这个订阅者始终存在于内存中。
- 对于多个发布者和订阅者嵌套时，很难追踪一个bug。