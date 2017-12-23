var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var lineWidth = 4;
//1、
auotSetCanvasSize(canvas)
//2、
listenToUser(canvas)

//3、
var eraserIsEnabled = false;
pen.onclick = function(){
  eraserIsEnabled = false;
  pen.classList.add('active');
  eraser.classList.remove('active');
}
eraser.onclick = function(){
  eraserIsEnabled = true;
  eraser.classList.add('active');
  pen.classList.remove('active');
}


//控制colors
red.onclick = function(){
  activeColor('red');
  context.strokeStyle = 'red'
}
green.onclick = function(){
  activeColor('green');
  context.strokeStyle = 'green'
}
blue.onclick = function(){
  activeColor('blue');
  context.strokeStyle = 'blue'
}

//控制colors2
yellow.onclick = function(){
  activeColor('yellow')
  context.strokeStyle = 'yellow'
}
black.onclick = function(){
  activeColor('black')
  context.strokeStyle = 'black'
}
gray.onclick = function(){
  activeColor('gray')
  context.strokeStyle = 'gray'
}

//控制colors3
orange.onclick = function(){
  activeColor('orange')
  context.strokeStyle = 'orange'
}
purple.onclick = function(){
  activeColor('purple')
  context.strokeStyle = 'purple'
}
pink.onclick = function(){
  activeColor('pink')
  context.strokeStyle = 'pink'
}

thin.onclick = function(){
  thin.classList.add('active')
  thick.classList.remove('active')
  lineWidth = 3;
}
thick.onclick = function(){
  thin.classList.remove('active')
  thick.classList.add('active')
  lineWidth = 8;
}

//清屏的功能，把canvas画的图都删掉
clear.onclick = function(){
  context.clearRect(0, 0, canvas.width, canvas.height);
}

//下载图片的功能
download.onclick = function(){
  var url = canvas.toDataURL("image/png");
  //console.log(url);是一串数字和字母的组合，代表的是这幅图
  var a = document.createElement('a');
  document.body.appendChild(a);
  a.href = url;
  a.download = "你画的画";
  a.target = '_blank';
  a.click();
}
use.onclick = function(){
  howuse.classList.add('active')
  use.classList.add('popbox')
}


/**以下是工具函数**/

//绘制圆形的函数
function drawCircle(x, y, radius){
  context.beginPath();
  //context.fillStyle = 'black';
  context.arc(x, y, radius, 0, Math.PI*2);
  context.fill();
}
//目前是前后的点不连续，用下面这个函数使其连续
function drawLine(x1, y1, x2, y2){
  context.beginPath();
  // context.strokeStyle = 'black'
  context.moveTo(x1, y1);
  context.lineWidth = lineWidth;
  context.lineTo(x2, y2);
  context.stroke();
  context.closePath();
}
//自动设置全屏显示
function auotSetCanvasSize(canvas){
  setCanvasSize()

  window.onresize = function(){
    setCanvasSize()
  }
  //保证全屏显示
  function setCanvasSize(){
    var pageWidth = document.documentElement.clientWidth;
    var pageHeight = document.documentElement.clientHeight;
    canvas.width = pageWidth
    canvas.height = pageHeight;
    }
}
//监听事件
function listenToUser(canvas){
  var isUsing = false;//按下鼠标之后为true
  var lastPoint = {'x': undefined, 'y': undefined};

  if(document.body.ontouchstart !== undefined){
    //是手机
    canvas.ontouchstart = function(msg){
      console.log('开始摸我了')
      //console.log(msg)
      var x = msg.touches[0].clientX;
      var y = msg.touches[0].clientY;
      isUsing = true;
      if (eraserIsEnabled){
       context.clearRect(x, y, 14, 14)
      } else {
     
        //drawCircle(x, y, 2);
        lastPoint = {'x': x, 'y': y}
      }
      howuse.classList.remove('active')
      use.classList.remove('popbox')
    }
    canvas.ontouchmove = function(msg){
      console.log('边摸边动')
      var x = msg.touches[0].clientX;
      var y = msg.touches[0].clientY;
      if (!isUsing){return}
      if (eraserIsEnabled){
          context.clearRect(x, y, 14, 14)
      }else{
            var newPoint = {'x': x, 'y': y};
            //drawCircle(x, y, 2);
            drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
            lastPoint = newPoint;
      }
    }
    canvas.ontouchend = function(){
      console.log('摸完了')
      isUsing = false;
      // eraserIsEnabled = false;
      //鼠标一旦抬起，就把所有的颜色的active取消
      orange.classList.remove('active');
      purple.classList.remove('active');
      pink.classList.remove('active');
      black.classList.remove('active');
      yellow.classList.remove('active');
      gray.classList.remove('active');
      red.classList.remove('active');
      green.classList.remove('active');
      blue.classList.remove('active');
      thick.classList.remove('active')
      thin.classList.remove('active')
    }
  }else{
    //是电脑
    canvas.onmousedown = function (msg){
     
      var x = msg.clientX;
      var y = msg.clientY;
      isUsing = true;
      if (eraserIsEnabled){
       context.clearRect(x, y, 14, 14)
      } else {
     
        //drawCircle(x, y, 2);
        lastPoint = {'x': x, 'y': y}
      }
      howuse.classList.remove('active')
      use.classList.remove('popbox')
    };
  
    canvas.onmousemove = function (msg){
      var x = msg.clientX;
      var y = msg.clientY;
      if (!isUsing){return}
      if (eraserIsEnabled){
          context.clearRect(x, y, 14, 14)
      }else{
            var newPoint = {'x': x, 'y': y};
            //drawCircle(x, y, 2);
            drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
            lastPoint = newPoint;
      }
      
    };
  
    canvas.onmouseup = function(){
      isUsing = false;
      // eraserIsEnabled = false;
      //鼠标一旦抬起，就把所有的颜色的active取消
      orange.classList.remove('active');
      purple.classList.remove('active');
      pink.classList.remove('active');
      black.classList.remove('active');
      yellow.classList.remove('active');
      gray.classList.remove('active');
      red.classList.remove('active');
      green.classList.remove('active');
      blue.classList.remove('active');
      thick.classList.remove('active')
      thin.classList.remove('active')
    };
  }
  
 
}

//激活绘图颜色的函数
function activeColor(color){
  if ('red' === color){
    red.classList.add('active');
    green.classList.remove('active');
    blue.classList.remove('active');
    black.classList.remove('active');
    gray.classList.remove('active');
    yellow.classList.remove('active');
    purple.classList.remove('active');
    pink.classList.remove('active');
    orange.classList.remove('active');
  }
  if ('green' === color){
    red.classList.remove('active');
    green.classList.add('active');
    blue.classList.remove('active');
    black.classList.remove('active');
    gray.classList.remove('active');
    yellow.classList.remove('active');
    purple.classList.remove('active');
    pink.classList.remove('active');
    orange.classList.remove('active');
  }
  if ('blue' === color){
    red.classList.remove('active');
    green.classList.remove('active');
    blue.classList.add('active');
    black.classList.remove('active');
    gray.classList.remove('active');
    yellow.classList.remove('active');
    purple.classList.remove('active');
    pink.classList.remove('active');
    orange.classList.remove('active');
  }
  if ('black' === color){
    red.classList.remove('active');
    green.classList.remove('active');
    blue.classList.remove('active');
    black.classList.add('active');
    gray.classList.remove('active');
    yellow.classList.remove('active');
    purple.classList.remove('active');
    pink.classList.remove('active');
    orange.classList.remove('active');
  }
  if ('gray' === color){
    red.classList.remove('active');
    green.classList.remove('active');
    blue.classList.remove('active');
    black.classList.remove('active');
    gray.classList.add('active');
    yellow.classList.remove('active');
    purple.classList.remove('active');
    pink.classList.remove('active');
    orange.classList.remove('active');
  }
  if ('yellow' === color){
    red.classList.remove('active');
    green.classList.remove('active');
    blue.classList.remove('active');
    black.classList.remove('active');
    gray.classList.remove('active');
    yellow.classList.add('active');
    purple.classList.remove('active');
    pink.classList.remove('active');
    orange.classList.remove('active');
  }
  if ('purple' === color){
    red.classList.remove('active');
    green.classList.remove('active');
    blue.classList.remove('active');
    black.classList.remove('active');
    gray.classList.remove('active');
    yellow.classList.remove('active');
    purple.classList.add('active');
    pink.classList.remove('active');
    orange.classList.remove('active');
  }
  if ('orange' === color){
    red.classList.remove('active');
    green.classList.remove('active');
    blue.classList.remove('active');
    black.classList.remove('active');
    gray.classList.remove('active');
    yellow.classList.remove('active');
    purple.classList.remove('active');
    pink.classList.remove('active');
    orange.classList.add('active');
  }
  if ('pink' === color){
    red.classList.remove('active');
    green.classList.remove('active');
    blue.classList.remove('active');
    black.classList.remove('active');
    gray.classList.remove('active');
    yellow.classList.remove('active');
    purple.classList.remove('active');
    pink.classList.add('active');
    orange.classList.remove('active');
  }
 
}
