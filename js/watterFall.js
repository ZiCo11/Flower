/**
* 实现瀑布流布局
 **/
function waterFall(parent, child) {
    // 父盒子居中，取得所有父盒字
    //先获得父元素及其底下所有的子元素
    var oParent = document.getElementById(parent);
    var allBox = oParent.getElementsByClassName(child);
//    获取子盒子高度
    var boxWidth = allBox[0].offsetWidth;
    // 获取屏幕宽度
    var screenW = document.documentElement.clientWidth;
    // 求出列数
    var cols = parseInt( screenW / boxWidth);
    var xyMargin = 16;
//    父盒子居中
//     oParent.style.width = cols * boxWidth + 'px';
    // oParent.style.margin = '0 auto';

    //子盒子定位
//    定义高度数组
    var arrH = [];

    // var boxHeight = 0;
    // var minBoxHeight = 0;
    // var minBoxIndex = 0;
    // 遍历盒子
    for(var i =0;i<allBox.length;i++){
        // 求出每个盒子的高度
        console.log(1);
        var boxH = allBox[i].offsetHeight + xyMargin;
        if(i < cols){
            // heightArr.push(boxHeight); //第一行
            arrH.push(boxH );
            allBox[i].style.position = "absolute";
            allBox[i].style.left = i * (boxWidth + xyMargin)+ 'px';
            allBox[i].style.top =  xyMargin + 'px';
        }else{
            // 取出最矮的盒子高度
            // minBoxHeight = Math.min.apply(null, heightArr);
            var minH = Math.min.apply(null, arrH);
            //求出最矮盒子的对应所引
            // minBoxIndex = getMinBoxIndex(heightArr, minBoxHeight);
            var minIndex = getMinBoxIndex(arrH, minH);
            //子盒子定位
            allBox[i].style.position = 'absolute';
            // allBox[i].style.left = minBoxIndex * boxWidth + 'px';
            // allBox[i].style.top = minBoxHeight + 'px';
            allBox[i].style.left = minIndex * (boxWidth + xyMargin) + 'px';
            allBox[i].style.top = minH + xyMargin + 'px';
            //更新数组
            // heightArr[minBoxIndex]+= boxHeight;
            arrH[minIndex] += boxH;
        }
    }
    // 更新父盒子的高度
    var parentHeight = allBox[allBox.length - 1].offsetTop + allBox[allBox.length - 1].offsetHeight;
    oParent.style.height = parentHeight;
    console.log(1);
}
/**
* 获取最矮盒子索引
 * */
function getMinBoxIndex(arr, min) {
    for(var i=0;i<arr.length;i++){
        if(arr[i] === min){
            return i;
        }
    }
}

/**
*判断是否具备加载图片的条件
*
 */
function checkWillLoadImage() {
    console.log('判断是否具备加载图片的条件');
    // 1. 获取最后一个盒子
    var allBox = document.getElementsByClassName("box");
    var lastBox = allBox[allBox.length - 1];

    // 2. 求出最后一个盒子自身高度的一半 + offsetTop
    var lastBoxDis = lastBox.offsetHeight * 0.5 + lastBox.offsetTop;

    // 3. 求出屏幕的高度
    var screenW = document.body.clientHeight || document.documentElement.clientHeight;

    // 4. 求出页面偏离浏览器的高度
    var scrollTop = scroll().top;

    return lastBoxDis <= screenW + scrollTop;
}
