// require 可以引入一个模块并赋值给一个局部变量
var studten =  require('./studten');
var teacher =  require('./teacher');

// 所有被引入的脚本都会向当前脚本暴露被exports暴露的api
// studten.add('Scott');
// teacher.add('德山');

// 传入一个 teacherName 老师字符串 和 teacherName 学生数组
function add(teacherName,studtens) {
  teacher.add(teacherName)
  // 循环数组
  studtens.forEach(function(item, index) {
    // 调用studten模块的add方法
    studten.add(item);
  })
}

// exports 挂载属性与方法
exports.cs = add
// 浮动方法 将exports 的值赋值给module.exports
// 如果module.exports 已经有值，exports的值会被忽略
// 推荐使用exports
// module.exports = add
