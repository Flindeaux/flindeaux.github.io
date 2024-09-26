//""""""判断body和视窗高度差，保证footer始终在最底部""""""
///判断body高度是否大于窗口内部高度
let bodyAndWindow_heightJudge = function (windowHeight, bodyHeight) {
 if (bodyHeight <= windowHeight) document.body.style.height = "100vh";
};
var backHome = document.getElementById("backHome");
///一个高阶函数，简写方法，整合调用有关重设窗口大小相关函数们，延迟若干秒后执行代码，避免高速触发
const bodyAndWindow_heightJudge_Timer = (delay) => {
 //一种新的简洁函数定义方法:变量声明 = (参数) => {函数体}
 let timer;
 return function () {
   if (timer) clearTimeout(timer);
   timer = setTimeout(() => {
     let windowHeight = innerHeight;
     document.body.style.height = null;
     let bodyHeight = document.body.offsetHeight;
     bodyAndWindow_heightJudge(windowHeight, bodyHeight);
   }, delay);
 };
};
///监听窗口大小的改变，执行相关代码
window.addEventListener("resize", function () {
 bodyAndWindow_heightJudge_Timer(70)();
});
///当html加载完成后就执行此部分代码
document.addEventListener("DOMContentLoaded", function () {
 bodyAndWindow_heightJudge_Timer(0)();
 let homeLogo = document.createElement("i");
 homeLogo.className = "fas fa-home";
 backHome.append(homeLogo);
 backHome.addEventListener("click", () => {
   window.open("../index.html", "_self");
 });
});
