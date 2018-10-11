/**
 * @desc 对象池工厂
 */ 
var objectPoolFactory = function (createObjFn) {
  var objectPool = [];
  return {
    create: function () {
      var obj = objectPool.length === 0 ?
        createObjFn.apply(this, arguments) :
        objectPool.shift();
      return obj;
    },
    recover: function (obj) {
      objectPool.push(obj);
    }
  }
}

// 测试用例
var iframeFactory = objectPoolFactory(function () {
  var iframe = document.createElement('iframe');
  document.body.appendChild(iframe);
  iframe.onload = function () {
    iframe.onload = null; // 防止iframe 重复加载的bug
    iframeFactory.recover(iframe); // iframe 加载完成之后回收节点
  }
  return iframe;
})

var iframe1 = iframeFactory.create();
iframe1.src = 'http://blog.careteen.wang';
var iframe2 = iframeFactory.create();
iframe2.src = 'http://movie.careteen.wang';
setTimeout(function () {
  var iframe3 = iframeFactory.create();
  iframe3.src = 'http://ui.careteen.wang';
}, 3000)