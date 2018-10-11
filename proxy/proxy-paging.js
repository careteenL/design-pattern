/**
 * @desc 代理模式实践 - 缓存代理 - 异步
 */ 

// 拉取分页数据
const getListData = function (pageSize, pageNum, cb) {
  // 可能的真实请求
  // ajax({
  //   url: 'http://api.careteen.wang/bookList',
  //   method: 'GET',
  //   data: {
  //     pageSize: pageSize,
  //     pageNum: pageNum
  //   },
  //   success: function (res) {
  //     if (typeof cb === 'function') {
  //       cb(res)
  //     }
  //   }
  // })

  // 模拟异步过程
  setTimeout(function () {
    // debugger
    console.log('Exe getListData function ...')
    var res = {
      name: 'Careteen',
      age: 23
    };
    if (typeof cb === 'function') {
      cb(res)
    }    
  }, 2000)
}

// 缓存代理函数
proxyGetListData = (function () {
  var cache = {};
  return function (pageSize, pageNum, cb) {
    var args = `${pageSize},${pageNum}`;
    // 有缓存直接读取
    if (args in cache) {
       if (typeof cb === 'function') {
         cb(cache[args])
       }
       return 
    }
    // 由于拉取分页数据函数是一步过程，需要通过回调方式
    getListData.call(this, pageSize, pageNum, function (res) {
      cache[args] = res;
      if (typeof cb === 'function') {
        cb(cache[args])
      }
    });
  }
})()

// 测试用例
proxyGetListData(10, 1, function (res) {
  console.log(res); // 会执行`getListData`函数 并返回
})
proxyGetListData(10, 1, function (res) {
  console.log(res); // 拉取缓存 不会执行`getListData`函数
})