## 组合模式

### 前言

### 应用

- [使用组合模式实现扫描文件夹 且可添加/删除文件夹/文件](https://github.com/careteenL/webFEDeveloper/tree/master/Front-end-knowledge/design-pattern/composite/composite.js)

### 总结

- 组合模式不是父子关系
  - 而是HAS-A的关系
- 对叶对象操作的一致性
- 双向映射关系
  - 一个叶子节点只有一个父节点
- 使用职责链模式提高组合模式性能

### 使用场景

满足下面两要求即可使用组合模式
- 表示对象的部分-整体层次结构
- 客户希望统一对待树中所有的对象