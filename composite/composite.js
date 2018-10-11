/**
 * @desc 组合模式实践 - 扫描文件夹
 */ 
// Folder
var Folder = function (name) {
  this.name = name;
  this.parent = null;
  this.files = [];
}
Folder.prototype.add = function (file) {
  file.parent = this;
  this.files.push(file);
}
Folder.prototype.remove = function () {
  if (!this.parent) {
    return;
  }
  for (var files = this.parent.files, l = files.length - 1; l >= 0; l--) {
    var file = files[l];
    if (file === this) {
      files.splice(l, 1);
    }    
  }
}
Folder.prototype.scan = function () {
  console.log('start sacn: ' + this.name);
  for (var i = 0, file, files = this.files; file = files[i++];) {
    file.scan();
  }  
}

// File
var File = function (name) {
  this.name = name;
  this.parent = null;
}
File.prototype.add = function () {
  throw new Error('Can not be added at leaf nodes !');
}
File.prototype.remove = function () {
  if (!this.parent) {
    return;
  }
  for (var files = this.parent.files, l = files.length - 1; l >= 0; l--) {
    var file = files[l];
    if (file === this) {
      files.splice(l, 1);
    }    
  }  
}
File.prototype.scan = function () {
  console.log('\t start sacn: ' + this.name);
}

// 测试用例
var folder = new Folder('FE-Tree');
var folderJs = new Folder('JavaScript');
var folderJsDesign = new Folder('Design-Pattern');
var folderNode = new Folder('NodeJs');

var fileJsOne = new File('Closure');
var fileJsTwo = new File('Prototype-Linked');

var fileJsSingleton = new File('singleton');
var fileJsObserver = new File('observer');

var fileNodeIO = new File('IO');
var fileCss = new File('CSS');

folderJs.add(fileJsOne);
folderJs.add(fileJsTwo);

folderJsDesign.add(fileJsSingleton);
folderJsDesign.add(fileJsObserver);

folderNode.add(fileNodeIO);

folder.add(folderJs);
folder.add(folderJsDesign);
folder.add(folderNode);
folder.add(fileCss);

folderJsDesign.remove(); // 移除文件夹
// scan
folder.scan();

