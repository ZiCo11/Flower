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
                alert('登录失败');
            }
        });
    });
});
