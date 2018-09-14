window.onload = function () {
    alert(11);
    //tab选项卡
    tab();
    //所有图片样式设置
    autoCreateImg();
    //瀑布流
    waterFall('item_pull', 'box');
    //滚动加载图片
    window.onmousemove = function () {
        alert("00000");
        var up = document.getElementById('up');

        if(checkWillLoadImage()){
            autoCreateImg();
            waterFall('item_pull', 'box');
        }
        //回到顶部
        up.onclick = function () {
            // document.body.scrollTop = document.documentElement.scrollTop = 0;
            console.log(9);
        }
    };
//     登陆按钮绑定事件
    var login = document.getElementById('login');
    var mask = document.getElementById('mask');
    login.onclick = function (ev) {
        mask.style.display = 'block';
    }
}

//所有图片样式设置
function autoCreateImg() {
    console.log('这里是子盒子图片样式设置，出现文字表明所有图片盒子样式设置成功');
    //1.数据 json
    var json = [
        {
            txt:'当我们正在为生活疲于奔命的时候，生活已经离我们却去',
            src:'images/pic.jpg'
        },
        {
            txt:'当我们正在为生活疲于奔命的时候，生活已经离我们却去',
            src:'images/pic1.jpg'
        },
        {
            txt:'当我们正在为生活疲于奔命的时候，生活已经离我们却去',
            src:'images/pic2.jpg'
        },
        {
            txt:'当我们正在为生活疲于奔命的时候，生活已经离我们却去',
            src:'images/pic3.jpg'
        },{
            txt:'当我们正在为生活疲于奔命的时候，生活已经离我们却去',
            src:'images/pic4.jpg'
        },{
            txt:'当我们正在为生活疲于奔命的时候，生活已经离我们却去',
            src:'images/pic5.jpg'
        },{
            txt:'当我们正在为生活疲于奔命的时候，生活已经离我们却去',
            src:'images/pic6.jpg'
        },{
            txt:'当我们正在为生活疲于奔命的时候，生活已经离我们却去',
            src:'images/pic7.jpg'
        },{
            txt:'当我们正在为生活疲于奔命的时候，生活已经离我们却去',
            src:'images/pic8.jpg'
        },{
            txt:'当我们正在为生活疲于奔命的时候，生活已经离我们却去',
            src:'images/pic9.jpg'
        }
    ];
    //2 遍历
    for(var i=0;i<30;i++) {
        //    获取父标签文本
        var itemPull = document.getElementById('item_pull');
        var str = itemPull.innerHTML;
        //    取出图片地址和对应的文字
        var txt = json[i].txt;
        var pic = json[i].src;
        //    创建子标
        var htmlStr = "<div class='box'>" +
            <!--图片-->
            "<div class='pic'>" +
            "<img src=" + pic + " alt=''>" +
            <!--图片蒙版-->
            "<div class='cover'></div>" +
            "</div>" +
            <!--文字-->
            "<p>" + txt + "</p>" +
            <!--图片蒙版 按钮-->
            "<div class='btn-box'>" +
            "<a href='' class='collection'>采集</a>" +
            "<a href='' class='like'>" +
            "<span class='heart'></span>" +
            "</a>" +
            "</div>" +
            "</div>";

        //        拼接
        str += htmlStr;
        itemPull.innerHTML = str;

        //    蒙版效果--绑定事件
        //获取所有的 类为box的子元素
        var wrapBox = itemPull.getElementsByClassName('box');
        var wrapPic = itemPull.getElementsByClassName('pic');
        //获取所有 类为pic 的子元素
        for (var k = 0; k< wrapBox.length; k++) {
            //所有子元素的 按钮绑定事件
            wrapBox[k].onmouseover =function () {
                this.childNodes[2].style.display = 'block'
            };
            wrapBox[k].onmouseout =function () {
                this.childNodes[2].style.display = 'none'
            };
            // 所有子元素的蒙版 绑定事件
            wrapPic[k].onmouseover =function () {
                this.childNodes[1].style.display = 'block'
            };
            wrapPic[k].onmouseout =function () {
                this.childNodes[1].style.display = 'none'
            };
        }
    }
}

//选项卡
function tab() {
    console.log('这里是选项卡，如果出现 则表示选项卡调用成功');
    //选项卡/获取选项卡头部head值
    var tHead = document.getElementById('tab_header');
//获得选项卡头部下面的li集合
    var aLis = tHead.getElementsByTagName('li');
//获取内容区值
    var tCont = document.getElementById('tab_cont');
    var aItems = tCont.getElementsByClassName('item');
    var lastOne = 0;

//遍历监听
    for(var i=0; i<aLis.length; i++){
        var li = aLis[i];
        (function (i) {
            li.onmouseover = function () {
                aLis[lastOne].className = '';
                aItems[lastOne].style.display = 'none';
                //设置选中
                aItems[i].style.display = 'block';
                this.className = 'current';
                lastOne = i;
            }
        })(i);
    }
}
//瀑布流
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
//获取最矮盒子索引
function getMinBoxIndex(arr, min) {
    for(var i=0;i<arr.length;i++){
        if(arr[i] === min){
            return i;
        }
    }
}

//判断是否具备加载图片的条件
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
//scroll
function scroll() {
    if(window.pageYOffset){ // IE9+ 和最新的浏览器
        return {
            top: window.pageYOffset,
            left: window.pageXOffset
        }
    }else if(document.compatMode === 'CSS1Compat'){ //  标准兼容模式开启(严格模式)
        return {
            top: document.documentElement.scrollTop,
            left: document.documentElement.scrollLeft
        }
    }

    return {
        top: document.body.scrollTop,
        left: document.body.scrollLeft
    }

}

