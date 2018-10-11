## 代码重构

### 前言

设计模式的目的就是为许多重构行为提供目标。

### 目录

- [提炼函数](#提炼函数)
- [合并重复的条件片段](#合并重复的条件片段)
- [把条件分支语句提炼成函数](#把条件分支语句提炼成函数)
- [合理使用循环](#合理使用循环)
- [提前让函数退出代替嵌套条件分支](#提前让函数退出代替嵌套条件分支)
- [传递对象参数取代过长的参数列表](#传递对象参数取代过长的参数列表)
- [尽量减少参数数量](#尽量减少参数数量)
- [少用三目运算符](#少用三目运算符)
- [合理使用链式调用](#合理使用链式调用)
- [分解大型类](#分解大型类)
- [用return退出多重循环](#用return退出多重循环)

### 提炼函数

如果在函数中有一段代码可以被独立出来，那我们最好把这些代码放进另一个独立的函数中。优点如下：
- 避免出现超大函数
- 独立出来的函数有助于代码复用
- 独立出来的函数更容易被覆写
- 独立出来的函数如果拥有一个良好的命名，它本身就起到注释的作用

### 合并重复的条件片段

如果一个函数体内有一些条件分支语句，而这些条件分支语句内部分散了一些重复的代码，name就有必要进行合并去重工作。

### 把条件分支语句提炼成函数

在程序设计中，复杂的条件分支语句是倒置程序难以阅读和理解的重要原因，而且容易倒置一个庞大的函数。

### 合理使用循环

在函数体内，如果有些代码实际上负责的是一些重复性的工作，name合理利用循环不仅可以完成同样的工作，还可以使代码量更少。

### 提前让函数退出代替嵌套条件分支

“函数只有一个出口”是很多程序猿的观念，但是现代编程语言中有些不同的看法。

如下伪代码是遵循”函数只有一个出口“：
```js
var del = function (obj) {
  var ret;
  if (!obj.isReadOnly) { // 不为只读的才能被删除
    if (obj.isFolder) { // 如果是文件夹
      ret = deleteFolder(obj);
    } else if (obj.isFile) { // 如果是文件
      ret = deleteFile(obj);
    }
  }
  return ret;
}
```
如上嵌套的if else简直是代码维护者的噩梦，可以进行改造，挑选一些条件分支，在进入条件分支之前，就立即让这个函数退出。
```js
var del = function (obj) {
  if (obj.isReadOnly) { // 反转if表达式
    return;
  }
  if (obj.isFolder) {
    return deleteFolder(obj);
  }
  if (obj.isFile) {
    return deleteFile(obj);
  }  
}
```

### 传递对象参数取代过长的参数列表

使用对象作为参数，可以让代码维护者在使用时不再关心参数的数量和顺序，只要保证参数对应的key值不变就可以了。

### 尽量减少参数数量

函数的参数尽可能少。

### 少用三目运算符

三目运算符看起来可以减少代码量、性能高，但实际上它所节省的代码量完全可以忽略不计，让JS文件加载更快的办法有很多种，如压缩、缓存、使用CDN和分域名等。没必要强行让自己大量使用三目运算符。

如果条件分支逻辑简单，那可以适量使用；如若条件分支逻辑复杂，程序维护者绝壁会问候你全家，所以最好还是按部就班的使用if else。

### 合理使用链式调用

使用jQuery的同学相当习惯于链式调用的方式，在JS中，我们也能很简单实现链式调用，无非就是让方法调用结束后返回对象自身。
```js
var User = function () {
  this.name = null;
  this.age = null;
}
User.prototype.setName = function (name) {
  this.name = name;
  return this;
}
User.prototype.setAge = function (age) {
  this.age = age;
  return this;
}
// use
new User().setName('Careteen').setAge(23);
```
or 
```js
var User = {
  name: null,
  age: null,
  setName: function (name) {
    this.name = name;
    return this;
  },
  setAge: function (age) {
    this.age = age;
    return this;
  }
}
// use
User.setName('Lanlan').setAge(24);
```

### 分解大型类

面向对象设计鼓励将行为分布在合理数量的更小对象之中。

### 用return退出多重循环

假设在函数体内有一个两重循环语句，我们需要再内层循环中判断，当达到某个临界条件是退出外层循环。我们大多数时候会引入一个控制标记变量实现。

这种做法无疑让人头晕目眩，更简单的做法是在需要终止循环的时候直接退出整个方法，如果在循环之后还有一些代码会执行，那么封装成一个函数，然后返回这个函数即可。