var http = require('http');
var cheerio = require('cheerio');
// 目标url
var url = 'http://www.imooc.com/learn/348';

// 爬取html
http.get(url,function(res){
  // 定义一个空字符串
  var html = '';
  // 触发data事件
  res.on('data', function(data) {
    html += data;
  });

  // end 结束事件 处理信息的过滤
  res.on('end', function() {
    // 获取返回值
    var courseData = filterChapers(html);

    // 打印出结果
    printCoursData(courseData);

  });
}).on('error',  function() { // get的回调函数
  console.log('爬取资源失败');
});


function printCoursData(courseData) {
  console.log(courseData);
  // 遍历
  courseData.forEach(function(item) {
    var chapterTitle = item.chapterTitle;
    console.log(chapterTitle + '\n');

    item.videos.forEach(function(video) {
      var videoTitle = video.videoTitle;
      var id = video.videoId;

      console.log('['+ id + ']' + videoTitle + '\n');
    });

  });
}


// 定义一个方法 用于过滤信息
function filterChapers(html) {
  // 装载html 内容  以jquery的$风格
  var $ = cheerio.load(html);

  // 通过.classs 获取样式为 .chapter 的所有div
  var chapters = $('.chapter')

  // chapterTitle 大的章节名
  // videos 保存大章节下的 没个小节的信息
  // 结构如下
  // [{
  //   chapterTitle:"",
  //   videos:[
  //     title:"",
  //     id: ""
  //   ]
  // }]

  var courseData = []

  // 遍历chapters 数组
  chapters.each(function(item) {
    // 获取数组中的当前对象
    var chapter = $(this);

    // 选取strong 标签 获取 标签中的文本
    var chapterTitle = chapter.find('strong').text();
    // 获取ul 对象 下的所有li对象
    var videos = chapter.find('.video').children('li');


    // 声明一个对象 用于保存数据
    var chapterDate = {
      chapterTitle:chapterTitle,
      videos:[]
    }


    // 遍历videos 从li数组中获取数据
    videos.each(function(item) {
      var video = $(this);

      // 通过 class 获取a标签对象
      var a = video.find('.studyvideo');
      var videoTitle = a.text();
      // 以 /video 为分隔 获取 /video/6687 中的第二段字符串
      var videoId = a.attr('href').split('/')[2];

      // 为 chapterDate 中的 videos[] 添加元素
      chapterDate.videos.push({
        videoTitle:videoTitle,
        videoId:videoId
      })
    })

    // 将过滤后的内容保存进 courseData 数组
    courseData.push(chapterDate)
  })

  return courseData;

}
