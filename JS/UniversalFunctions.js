// """"""自行封装的常用函数们，为了尽可能避免静态网页启动后的安全违规，此文件内容直接复制而不再引入""""""
//在html中，引入和被引入js文件都在原有引入语句基础上加：type="module" 即可。
///创建新元素并返回
///(元素标签，元素id，元素类)，后两者为空应传“0”，最后的空可缺省
export function creatMyELE(newElement, newId = 0, newClass = 0) {
  let newOBJ = document.createElement(newElement);
  newId = newId || 0;
  if (newId)
    //为空则不设置
    newOBJ.id = newId;
  newClass = newClass || 0;
  if (newClass) newOBJ.className = newClass;
  return newOBJ;
}
