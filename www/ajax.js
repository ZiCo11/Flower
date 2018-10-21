$(function () {
    $('#btn11').click(function () {
        $.ajax({
            url: '/login',
            data: {user:$('#user').val(), pass:$('#pass').val()},
            dataType: 'json',
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
        });
    });
    $('#btn12').click(function () {
        $.ajax({
            url: '/reg',
            data: {user:$('#user').val(), pass:$('#pass').val()},
            dataType: 'json',
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
        });
    });
});
