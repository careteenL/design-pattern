/**
 * @desc 职责链模式实践
 */ 
var Chain = function (fn) {
  this.fn = fn;
  this.successor = null;
}
// 设置下一个继承者
Chain.prototype.setNextSuccessor = function (successor) {
  return this.successor = successor;
}
// 传递请求
Chain.prototype.passRequest = function () {
  // 执行函数返回值 若是约定的 nextSuccessor 即进行传递
  var ret = this.fn.apply(this, arguments);
  if ('nextSuccessor' === ret) {
    return this.successor &&
      this.successor.passRequest.apply(this.successor, arguments);
  }
  return ret;
}
// 手动设置下一个节点 为异步情况服务
Chain.prototype.next = function () {
  return this.successor &&
  this.successor.passRequest.apply(this.successor, arguments);  
}

// 测试用例
/**
 * @desc 场景：一个售卖手机的电商网站，
 *            交纳500元定金和200元定金，可分别获得150元和50元的商城优惠券；
 *            否则只能进行普通购买模式，即无任何优惠。
 *  和后端约定返回以下三个字段：      
 *            1、orderType：订单类型；值1为表示交纳500元定金用户；
 *                                  值为2表示交纳200元定金用户；
 *                                  值为3表示普通用户。
 *            2、isPay：表示是否已经支付定金；若没支付则作为普通用户处理。
 *            3、stock：普通用户下的手机库存；若为普通用户无库存则不能购买；
 *                                        交纳定金用户不受此限制。
 */ 
// 同步情况
// 各个策略函数
var order500 = function (orderType, isPay, stock) {
  if (orderType === 1 && isPay === true) {
    // TODO
    console.log('500元定金预购，得到150元优惠券');
  } else {
    return 'nextSuccessor';
  }
}
var order200 = function (orderType, isPay, stock) {
  if (orderType === 2 && isPay === true) {
    // TODO
    console.log('200元定金预购，得到50元优惠券');
  } else {
    return 'nextSuccessor';
  }
}
var orderNormal = function (orderType, isPay, stock) {
  if (stock > 0) {
    // TODO
    console.log('普通购买，无优惠券');
  } else {
    console.log('手机库存不足');
  }
}
// 将各个策略用职责链 链接
var chainOrder500 = new Chain(order500);
var chainOrder200 = new Chain(order200);
var chainOrderNormal = new Chain(orderNormal);
// 指定职责链中的顺序
chainOrder500.setNextSuccessor(chainOrder200);
chainOrder200.setNextSuccessor(chainOrderNormal);
// 最后把请求传递给第一个节点
chainOrder500.passRequest(1, true, 500); // -> 500元定金预购，得到150元优惠券
chainOrder500.passRequest(2, true, 500); // -> 200元定金预购，得到50元优惠券
chainOrder500.passRequest(3, true, 500); // -> 普通购买，无优惠券
chainOrder500.passRequest(1, false, 0); // -> 手机库存不足

// 若某一天需求改动，增加一项 交纳定金300元，送70优惠券；
// 只需在职责链中新增和删除节点即可。
var order300 = function () {
  // TODO
}
var chainOrder300 = new Chain(order300);
chainOrder500.setNextSuccessor(chainOrder300);
chainOrder300.setNextSuccessor(chainOrder200);


// 异步情况
var fn1 = new Chain(function () {
  console.log(1);
  return 'nextSuccessor';
})
var fn2 = new Chain(function () {
  console.log(2);
  var _self = this;
  setTimeout(function () {
    _self.next();
  }, 1000);
})
var fn3 = new Chain(function () {
  console.log(3);
})
// 调用
fn1.setNextSuccessor(fn2).setNextSuccessor(fn3);
fn1.passRequest();

// 总结：需要一个链类，设置下一个继承者，和传递请求的函数；
//      有下一个继承者需遵循约定的规则。
//      符合开闭原则；添加一个规则，直接添加一个节点，并设置下一个继承者即可。