var oBtn11 = document.getElementById('btn11');
var oBtn12 = document.getElementById('btn12');
var oUser = document.getElementById('user');
var oPass = document.getElementById('pass');

oBtn11.onclick = function () {
    if (!/^\w{6,32}$/.test(oUser.value)){
        alert('用户名格式不正确！');
    } else if (!/^.{6,32}$/.test(oPass.value)){
        alert('密码格式不正确！');
    } else {
        ajax({
            method: 'get',
            url: '/login',
            data: 'user='+oUser.value+'&pass='+oPass.value,
            success(res){
                if (res.code){
                    alert('登录失败' + res.msg);
                } else {
                    alert('登录成功' + res.msg);
                }
            },
            error(err){
                console.log(err);
                alert('登录失败，请稍后重试');
            }
        })
    }
};
oBtn12.onclick = function () {
    if (!/^\w{6,32}$/.test(oUser.value)){
        alert('用户名格式不正确！');
    } else if (!/^.{6,32}$/.test(oPass.value)){
        alert('密码格式不正确！');
    } else {
        ajax({
            method: 'get',
            url: '/reg',
            data: 'user='+oUser.value+'&pass='+oPass.value,
            success(res){
                if (res.code){
                    alert('注册失败' + res.msg);
                } else {
                    alert('注册成功' + res.msg);
                }
            },
            error(err){
                console.log(err);
                alert('注册失败，请稍后重试');
            }
        })
    }
};


//ajax 封装
function ajax(options) {
    var xhr = null;
    var methods = options.method || 'get';

    try {
        xhr = new XMLHttpRequest();
    }catch (e) {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    if (methods.toLowerCase() === 'get'){
        xhr.open('get', options.url + '?' + options.data, true);
        xhr.send();
    } else if (methods.toLowerCase() === 'post'){
        xhr.open('post', options.url, true);
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        xhr.send(options.data);
    } else {
        console.log('请求方式不正确');
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200){
            var arr = JSON.parse(xhr.responseText);
            options.success(arr);
            options.error(err);
        }
    }

}