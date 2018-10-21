window.onload = function (ev) {
    //获取scroll
    scroll();
    //tab选项卡
    tab();
    // 轮播图
    bannerAutoPlay();
    //所有图片样式设置
    autoCreateImg();
    //瀑布流
    waterFall('item_pull', 'box');
    //滚动加载图片
    window.onscroll = function () {
        var up = document.getElementById('up');
        var scrollTop = scroll().top;
        var oTop = document.getElementById('top_nav');


        if(checkWillLoadImage()){
            autoCreateImg();
            waterFall('item_pull', 'box');
        }
        //回到顶部
        up.onclick = function () {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        };
        if (scrollTop >= 150) {
            oTop.style.display = 'block';
            up.style.display = 'block';
        } else {
            oTop.style.display = 'none';
            up.style.display = 'none';
        }
    };
    //登陆注册按钮
    loginBtn();
};

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
                txt:'活在世上，不必什么都知道，只知道最好的就够了。——王小波',
                src:'images/pic1.jpg'
            },
            {
                txt:'很多人不需要再见，只是路过而已。——《彼岸花》',
                src:'images/pic2.jpg'
            },
            {
                txt:'我总是在日暮时分,书影与书影之间,宁静的悲哀里,最想念你。——亦舒',
                src:'images/pic3.jpg'
            },{
                txt:'信任的深浅，不在于会不会对你笑，而在于愿不愿意在你面前哭。',
                src:'images/pic4.jpg'
            },{
                txt:'不乱于心，不困于情。不畏将来，不念过往。如此，安好。',
                src:'images/pic5.jpg'
            },{
                txt:'你如果认识从前的我，也许你会原谅现在的我。——张爱玲',
                src:'images/pic6.jpg'
            },{
                txt:'水来，我在水中等你；火来，我在灰烬中等你。——《你是我的独家记忆》',
                src:'images/pic7.jpg'
            },{
                txt:'梦里出现的人，醒来时就该去见她，生活就是这么简单。——《新桥恋人》',
                src:'images/pic8.jpg'
            },{
                txt:'天下就没有偶然，那不过是化了妆的，戴了面具的必然。——钱钟书',
                src:'images/pic9.jpg'
            }
        ];
    //2 遍历
    for(var i=0;i<10;i++) {
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

// 瀑布流函数
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
            console.log("父盒字完成")
        }
    }
    // 更新父盒子的高度
    var parentHeight = allBox[allBox.length - 1].offsetTop + allBox[allBox.length - 1].offsetHeight;
    oParent.style.height = parentHeight;
    console.log("父盒字高度完成");
}

//获取最小下标函数
function getMinBoxIndex(arr, min) {
    for(var i=0;i<arr.length;i++){
        if(arr[i] === min){
            return i;
        }
    }
}

// scrool函数
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

//检查图片加载
function checkWillLoadImage() {
    console.log('图片加载完成');
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

//登陆注册按钮
function loginBtn() {
    var loginBtn = document.getElementById('login');
    var regBtn = document.getElementById('register');
    var oBtn11 = document.getElementById('btn11');
    var oBtn12 = document.getElementById('btn12');
    var mask = document.getElementById('mask');
    var closeBtn = document.getElementById('close_btn');
    loginBtn.onclick = function () {
        mask.style.display = 'block';
        oBtn11.style.display = 'block';
        oBtn12.style.display = 'none';
    };
    regBtn.onclick = function(){
        mask.style.display = 'block';
        oBtn12.style.display = 'block';
        oBtn11.style.display = 'none';
    };
    closeBtn.onclick = function () {
        mask.style.display = 'none';
    };
}

//轮播
function bannerAutoPlay() {
//    获取所有的li标签
    var aBanner = document.getElementById('slider_banner');
    var aLis = aBanner.getElementsByTagName('li');
    var index = 0;
//    设置定时器
    setInterval(function () {
        // 1.改变透明度
        for (var i=0;i<aLis.length;i++) {
            var singleLi = aLis[i];
            // 动画
            buffer(singleLi, {opacity:0}, null);
        }
        buffer(aLis[index],{opacity:1}, null);
        // 索引++
        index++;
        if(index === aLis.length){
            index = 0;
        }
    },2000);
}
/**
 * 缓动动画函数
 * @param {Object}obj
 * @param {Object}json
 * @param {function}fn
 */
function buffer(obj, json, fn) {
    // 1. 清除定时器
    clearInterval(obj.timer);
    var begin = 0, end = 0;

    // 2. 设置定时器
    obj.timer = setInterval(function () {
        // 2.0 旗帜, 决定动画是否结束
        var flag = true;
        // 2.1 遍历
        for(var k in json){
            // 2.2.-1 求出起始值 和 结束值
            if(k === 'opacity'){ // 透明度
                //console.log(typeof(getCssAttr(obj, k)));
                begin = parseInt( parseFloat(getCssAttr(obj, k)) * 100);
                end = parseInt(parseFloat(json[k]) * 100);
            }else if(k === 'scrollTop'){ // 滚动到头部
                begin = obj.scrollTop;
                end = parseInt(json[k]);
            }else { // 正常情况
                begin = parseInt(getCssAttr(obj, k));
                end = parseInt(json[k]);
            }
            // 2.2.0 求出步长
            var step = (end - begin) * 0.2;
            step = step >=0 ? Math.ceil(step) : Math.floor(step);
            // 2.2.1 计算起始位置
            if(k === 'opacity'){
                obj.style.opacity = (begin + step) / 100;
                obj.style.filter = 'alpha(opacity=' + (begin + end)+')'; // 针对IE
            }else if(k === 'scrollTop'){
                obj.scrollTop = begin + step;
            }else if(k === 'zIndex'){
                obj.style[k] = json[k];
            }else {
                obj.style[k] = begin + step + 'px';
            }

            // 2.2.2 判断
            if(begin !== end){
                flag = false;
            }
        }

        // 3.0 结束动画
        if(flag){
            clearInterval(obj.timer);
            // 开启动画组中的下一组动画
            if(fn){ // 判断有没有这个函数
                fn();
            }
        }
    }, 60);
}
/**
 * 获取css的样式属性值
 * @param {Object}obj
 * @param {string}attr
 * @returns {*}
 */
function getCssAttr(obj, attr) {
    if(obj.currentStyle){ // IE 和 Opera
        return obj.currentStyle[attr];
    }else { // 遵循W3C的
        return window.getComputedStyle(obj, null)[attr];
    }
}
