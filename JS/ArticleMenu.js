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
// """"""根据文章中的标题元素，创建文章导航""""""
//尝试用了递归和贪心思想，不理想。但最后还是死磕递归写出来的，技艺不精需要完善。
//用栈或队列处理，在遇到高级元素时重置栈时更好的写法。
//所有parent都应该时ul元素
// import { creatMyELE } from "./UniversalFunctions.js";
var root_articleMenu = document.querySelector(".articleMenu_Ul0"); //创建导航的根，应为ul
var root_article = document.querySelector("article"); //对应的文章内容
var headingElements = Array.from(
 root_article.querySelectorAll(`h1,h2,h3,h4,h5,h6`)
); //一次性获取所有标题元素
var num = 0; //代表处理到第几个标题元素，作为全局变量，方便递归回头后再处理
//查找所有标题
const addArticleMenu = {
 ///创建li或ul和其中的a标签，传入：父节点、标题等级（设置class，方便css样式）、ID用来设置a标签和段落id、a内容，是否只建li
 addUlLi(parent, hNum, aID, aInnerText, ifLi = false) {
   let li_a = creatMyELE("a");
   let articleMenu_li = creatMyELE("li");
   li_a.href = "#" + aID;
   headingElements[num].id = aID;
   li_a.innerText = aInnerText;
   parent.append(articleMenu_li);
   articleMenu_li.append(li_a);
   parent = articleMenu_li;
   if (!ifLi) {
     let articleMenu_ul = creatMyELE("ul");
     articleMenu_ul.type = "none";
     articleMenu_ul.classList.add(`articleMenu_Ul${hNum}`);
     parent.append(articleMenu_ul);
     parent = articleMenu_ul;
   }
   return parent; //用做之后的父元素
 },
 ///开始创建导航
 addStart(perparent, parent) {
   if (num >= headingElements.length) return 0; //递归出口，涉及前后节点判断的时候，当前与下一个更合适，可以借助出口判断，简单很多
   let thisDOM = headingElements[num],
     hNum = thisDOM.tagName.match(/[0-9]+/)[0],
     next,
     perparentIN = perparent,
     parentIN = parent;
   //没有下一个节点的话，就不初始化next直接添加为li
   if (num < headingElements.length - 1) next = headingElements[num + 1];
   if (num >= headingElements.length - 1 || next.tagName <= thisDOM.tagName) {
     //下一个节点数字小于等于（等级大于等于）这个时，当前添加为li
     addArticleMenu.addUlLi(parent, hNum, "p" + num, thisDOM.innerText, true);
     if (
       parent != root_articleMenu &&
       num < headingElements.length - 1 &&
       next.tagName != thisDOM.tagName
     ) {
       num++;
       return -1;
     } //回头，使下个元素父节点在上级，等于的话就不用了
   } else {
     //下一个节点数字大于（等级小于）这个时，当前添加为ul
     perparentIN = parent;
     parentIN = addArticleMenu.addUlLi(
       parent,
       hNum,
       "p" + num,
       thisDOM.innerText
     );
   }
   num++; //自增后递归
   if (addArticleMenu.addStart(perparentIN, parentIN) == -1) {
     if (
       parent.className.match(/articleMenu_Ul(\d+)/)[1] <
       headingElements[num].tagName.match(/[0-9]+/)[0]
     )
       //靠对ul的class命名中的数字确定标题等级，然后与要处理的标题等级对比，没到层次就回头
       addArticleMenu.addStart(perparent, parent);
     else {
       if (parent == root_articleMenu)
         addArticleMenu.addStart(perparent, parent);
       return -1;
     } //回头
   }
 },
};
///HTML加载完毕后调用
function ArticleMenu() {
 while (addArticleMenu.addStart(root_articleMenu, root_articleMenu) != 0); //一定要这么写，不然栈空了之后就不能再创建之后的了（即：两次逆序标题且突破原有最小标签）
}
