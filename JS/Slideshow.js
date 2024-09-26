///创建新元素并返回
///(元素标签，元素id，元素类)，后两者为空应传“0”，最后的空可缺省
function creatMyELE(newElement, newId = 0, newClass = 0) {
 let newOBJ = document.createElement(newElement);
 newId = newId || 0;
 if (newId)
   //为空则不设置
   newOBJ.id = newId;
 newClass = newClass || 0;
 if (newClass) newOBJ.className = newClass;
 return newOBJ;
}
//""""""带翻页键和选择点的轮播图，只绑定一个根元素，其余全部生成""""""
//还可以再加个点击链接和标题之类
var root_slideshow = document.querySelector(".lunbo"); //根dom元素
var slideshowIMG; //显示图片的容器
var dots = []; //存放点的数组，在给数组添加内容前，必须用这步初始化！
var prev_button; //前后翻页按钮
var next_button;
var i = 0, //当前图片编号
 imgNumber = 5, //图片总数
 delayTime = 2000, //图片更换延迟时间
 imgInterval; //计时器
///图片替换对象,对象字面量方法：不方便共享和管理公共变量（适合用构造函数方法）
const changeBGI = {
 ///立即更新图片并处理正常状态下点的样式
 changeRightNow: function () {
   //改点的样式
   dots[i > 0 ? i - 1 : imgNumber - 1].style.cssText -= "border-color: red";
   dots[(i %= imgNumber)].style.cssText += "border-color: red";
   //改图片
   slideshowIMG.style.cssText += `
     background: url(../IMG/index_img/${i++}.png) no-repeat center;
     background-size: cover;
   `; //定义图片文件夹路径，为确保自增，必须放在函数内
 }, //如果再联动一下后端，就能自动读取所有文件夹内图片了，有文件就会显示（前端因安全设计不允许那么做）
  ///开始计时自动播放
 startTicktack(delay) {
   imgInterval = setInterval(() => {
     //箭头函数会继承定义箭头函数的上下文中的 this 值
     this.changeRightNow(); // 使用箭头函数确保 this 指向正确
   }, delay);
 },
  ///一次性点的样式全清。非顺序情况需要先：清除之后的点的样式
 clearAllPointsStyle() {
   for (let j = 0; j < dots.length; j++)
     dots[j].style.cssText -= "border-color: red";
 },
};
///当html加载完成后就执行此部分代码
function Slideshow() {
 slideshowIMG = creatMyELE("div", 0, "slideshowIMG"); //创建图片空间
 let dotsGroup = creatMyELE("div", 0, "dotsGroup"); //创建点组
 prev_button = creatMyELE("div", 0, "prev  fas fa-angle-left"); //加入了fontawesome字体
 next_button = creatMyELE("div", 0, "next  fas fa-angle-right");
 root_slideshow.append(slideshowIMG);
 root_slideshow.append(prev_button);
 root_slideshow.append(next_button);
 root_slideshow.append(dotsGroup);
 //一次性创建对应数量的点并把监听器全部加上
 for (let j = 0; j < imgNumber; j++) {
   let inButtom = creatMyELE("div", 0, "dot"); //创建单个点
   dots[j] = inButtom;
   dotsGroup.append(inButtom);
   inButtom.addEventListener("click", function () {
     i = j;
     clearInterval(imgInterval); //监听点击来换图
     changeBGI.clearAllPointsStyle();
     changeBGI.changeRightNow();
     changeBGI.startTicktack(delayTime);
   });
 }
  /// 两个按钮的点击监听器
 prev_button.addEventListener("click", function () {
   clearInterval(imgInterval); //清除计时器
   changeBGI.clearAllPointsStyle(); //清除所有点的样式
   i >= 2 ? (i -= 2) : i == 0 ? (i = imgNumber - 2) : (i = imgNumber - 1);
   changeBGI.changeRightNow();
   changeBGI.startTicktack(delayTime);
 });
 next_button.addEventListener("click", function () {
   clearInterval(imgInterval);
   changeBGI.changeRightNow();
   changeBGI.startTicktack(delayTime);
 });
 changeBGI.changeRightNow(); //打开页面初次唤醒
 changeBGI.startTicktack(delayTime);
}
