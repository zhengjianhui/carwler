function add(teacher) {
  console.log('add teacher:' + teacher);
}


// 将模块暴露 exports 可以声明模块
// exports 可以挂载合法的js 对象
exports.add = add
