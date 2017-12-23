var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

//1、
auotSetCanvasSize(canvas)
//2、
listenToUser(canvas)

//3、
var eraserIsEnabled = false;
eraser.onclick = function(){
  eraserIsEnabled = true
  actions.className = 'actions x'
 
}
brush.onclick = function(){
  eraserIsEnabled = false
  actions.className = 'actions'
}


/**以下是工具函数**/


//绘制圆形的函数
function drawCircle(x, y, radius){
  context.beginPath();
  context.fillStyle = 'black';
  context.arc(x, y, radius, 0, Math.PI*2);
  context.fill();
}
//目前是前后的点不连续，用下面这个函数使其连续
function drawLine(x1, y1, x2, y2){
  context.beginPath();
  context.strokeStyle = 'black'
  context.moveTo(x1, y1);
  context.lineWidth = 5;
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
       context.clearRect(x, y, 10, 10)
      } else {
     
        //drawCircle(x, y, 2);
        lastPoint = {'x': x, 'y': y}
      }
    }
    canvas.ontouchmove = function(msg){
      console.log('边摸边动')
      var x = msg.touches[0].clientX;
      var y = msg.touches[0].clientY;
      if (!isUsing){return}
      if (eraserIsEnabled){
          context.clearRect(x, y, 10, 10)
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
    }
  }else{
    //是电脑
    canvas.onmousedown = function (msg){
     
      var x = msg.clientX;
      var y = msg.clientY;
      isUsing = true;
      if (eraserIsEnabled){
       context.clearRect(x, y, 10, 10)
      } else {
     
        //drawCircle(x, y, 2);
        lastPoint = {'x': x, 'y': y}
      }
    
    };
  
    canvas.onmousemove = function (msg){
      var x = msg.clientX;
      var y = msg.clientY;
      if (!isUsing){return}
      if (eraserIsEnabled){
          context.clearRect(x, y, 10, 10)
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
    };
  }
  
 
}
