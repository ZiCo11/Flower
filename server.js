//引入http模块
const http=require('http');
//引入fs模块 fs是文件操作系统 专门用于处理文件读取等
const fs=require('fs');
//引入url模块 处理url
const url=require('url');
//引入数据库模块 用于数据库连接
const mysql=require('mysql');

//数据库
let db=mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: '20181019'
});

//1.http服务器
let httpServer=http.createServer((req, res)=>{
    //req.url=>'/reg?user=blue&pass=xxx'
    //如果 parse（req.url后面参数为true） 则会解析地址后面的数据 query
    // 这也是解构赋值 pathname query是解析地址后对应的值
    let {pathname, query}=url.parse(req.url, true);
    //1.注册接口
    if(pathname=='/reg'){
        //这是解构赋值user pass这些数据都在query里面
        let {user, pass}=query;

        //1.校验数据
        //正则 检测用户名username匹配所有字母数字下划线 长度6-32
        if(!/^\w{6,32}$/.test(user)){
            //JSON.stringify是解析json数据为字符串
            //res.write里面的参数只能是字符串或者buffer
            //code为1 表示失败  code为0 表示成功
            res.write(JSON.stringify({code: 1, msg: '用户名不符合规范'}));
            //res.write后 必须接上res.end（）
            res.end();
            // 正则 调用test方法 检测密码username匹配所有字符 长度6-32
        }else if(!/^.{6,32}$/.test(pass)){
            res.write(JSON.stringify({code: 1, msg: '密码不符合规范'}));
            res.end();
        }else{
            //2.数据库登录进去，检验用户名是否重复
            //数据库的query 方法 参数是sql语句 这里是查找语句
            db.query(`SELECT ID FROM user_register WHERE username='${user}'`, (err, data)=>{
                if(err){
                    console.log(err);
                    res.write(JSON.stringify({code: 1, msg: '数据库有错'}));
                    res.end();
                }else if(data.length>0){
                    res.write(JSON.stringify({code: 1, msg: '此用户名已存在'}));
                    res.end();
                }else{
                    //3.插入
                    //这里是数据库增加语句
                    db.query(`INSERT INTO user_register (username,password) VALUES('${user}','${pass}')`, err=>{
                        if(err){
                            res.write(JSON.stringify({code: 1, msg: '数据库有错'}));
                            res.end();
                        }else{
                            res.write(JSON.stringify({code: 0, msg: '注册成功'}));
                            res.end();
                        }
                    });
                }
            });
        }
    //  登录接口
    }else if(pathname=='/login'){
        //用户输入的username 和password 解构赋值给user  和pass
        let {user,pass}=query;

        //1.校验数据 正则检测
        if(!/^\w{6,32}$/.test(user)){
            res.write(JSON.stringify({code: 1, msg: '用户名不符合规范'}));
            res.end();
        }else if(!/^.{6,32}$/.test(pass)){
            res.write(JSON.stringify({code: 1, msg: '密码不符合规范'}));
            res.end();
        }else{
            //2.取数据
            // sql 查找语句
            db.query(`SELECT ID,password FROM user_register WHERE username='${user}'`, (err, data)=>{
                if(err){
                    console.log(err);
                    res.write(JSON.stringify({code: 1, msg: '数据库有错'}));
                    res.end();
                //    查找的用户名 如果长度为0 则表示用户名不存在
                }else if(data.length==0){
                    res.write(JSON.stringify({code: 1, msg: '此用户名不存在'}));
                    res.end();
                }else if(data[0].password!=pass){
                    res.write(JSON.stringify({code: 1, msg: '用户名或密码有误'}));
                    res.end();
                }else{
                    res.write(JSON.stringify({code: 0, msg: '登陆成功'}));
                    res.end();
                }
            });
        }
    }else{
        fs.readFile(`www${pathname}`, (err, data)=>{
            if(err){
                //writeHeader 是给机器看的 表示失败 404错误
                res.writeHeader(404);
                //这是给用户看的  表示请求数据有误等
                res.write('Not Found');
            }else{
                res.write(data);
            }
            res.end();
        });
    }
    console.log('服务器启动成功');
});
//绑定接口
httpServer.listen(1090);
