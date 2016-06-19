
var express = require('express');
// 引入body_parser
var body_parser = require('body-parser');
const app = express();

const port = process.env.PORT || 2222;

app.listen(port, function(err, result) {

  if (err) {
    console.log(err)
  }
})


// use相当于拦截器 将请求的参数转换为 json数据
app.use(body_parser.json({type: 'application/json'}))


// get 请求   ’/‘当前目录下 回调函数，两个参数 request response
app.get('/', function(req, res) {

  var aaa = req.param('aaa');
  console.log(aaa);
  res.json({aaa:'aaa'})
})
