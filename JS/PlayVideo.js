//JavaScript 部分:
//<script type="text/javascript">
//获取对象
var video = document.querySelector("video");
var play = document.querySelector(".fa-play");
var current = document.querySelector(".current");
var total = document.querySelector(".total");
var progress = document.querySelector(".progress");
var line = document.querySelector(".line");
var volume = document.querySelector(".volume");
var expand = document.querySelector(".fa-expand");
var lightbulb = document.querySelector(".fa-lightbulb");
var current_time;
var light = true;
//通过 addiventListener 方法给对象 video 添加事件处理句柄,此视频加载完成后,绑定处理函数,
//用户单击 play 播放或者暂停
video.addEventListener("canplay", function () {
 video.style.display = "block";
 //单击播放
 play.onclick = function () {
   if (video.paused) {
     video.play();
   } else {
     video.pause();
   }
   this.classList.toggle("fa-play");
   this.classList.toggle("fa-pause");
 };
 lightbulb.onclick = function () {
   this.classList.toggle("fa-lightbulb");
   light
     ? ((document.body.style.cssText += "background-color: black;"),
       (light = false))
     : ((document.body.style.cssText -= "background-color: black;"),
       (light = true));
 };
 //单击静音
 volume.onclick = function () {
   this.classList.toggle("fa-volume-off");
   this.classList.toggle("fa-volume-up");
   //如果不是静音
   if (!video.muted) {
     video.muted = true;
   } else {
     video.muted = false;
   }
 };
 //计算视频总时长,以时分秒表示
 var total_time = video.duration;
 var h = parseInt(total_time / 3600);
 var m = parseInt((total_time % 3600) / 60);
 var s = parseInt(total_time % 60);
 h = h >= 10 ? h : "0" + h;
 m = m >= 10 ? m : "0" + m;
 s = s >= 10 ? s : "0" + s;
 total.innerHTML = h + ":" + m + ":" + s;
 //监听当前播放时间
 video.addEventListener("timeupdate", function () {
   current_time = this.currentTime;
   var h = parseInt(current_time / 3600);
   var m = parseInt((current_time % 3600) / 60);
   var s = parseInt(current_time % 60);
   h = h >= 10 ? h : "0" + h;
   m = m >= 10 ? m : "0" + m;
   s = s >= 10 ? s : "0" + s;
   current.innerHTML = h + ":" + m + ":" + s;
   var new_width = (current_time / total_time) * 100 + "%";
   line.style.width = new_width;
 });
 //跳转至指定位置播放
 progress.onclick = function (e) {
   var percent = e.offsetX / this.getAttribute("width");
   video.currentTime = percent * total_time;
 };
 //视频播放器窗口最大化
 expand.onclick = function () {
   video.webkitRequestFullScreen();
 };
});
