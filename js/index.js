(function () {
    tab();

    autoCreateImg();
})();

function autoCreateImg() {
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
        var htmlStr = '<div class="box">' +
                            <!--图片-->
                            '<div class="pic">' +
                                '<img src=' + pic + '  alt="">' +
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
        for (var k = 0; k<wrapBox.length; k++) {
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


function tab() {
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
                aItems[i].style.display = 'block';
                this.className = 'current';
                lastOne = i;
            }
        })(i);

    }
    
}


