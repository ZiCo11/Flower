const http = require('http');
const fs = require('fs');
const url = require('url');
const mysql = require('mysql');
// 数据库连接
let db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: "root",
    database: '20181017'
});
// http服务器
let httpServer = http.createServer((req,res) => {
   let {pathname, query} = url.parse(req.url, true);
   if (pathname == '/reg'){
       // 在req.ulr里面 query是包含用户传过来的数据
       let {user, psaa} = query;
       // 检验数据
       // 检验用户名格式长度是否满足6-32
       if (!/^\w{6,32}$/.test(user)){
           res.write(JSON.parse({code:1, msg: '用户名不符合规范'}));
           res.end();
       }  else if (!/^\w{6,32}$/.test(pass)){
           res.write(JSON.parse({code:1, msg:'用户名或密码不规范'}));
           res.end();
       } else {
           db.query(`SELECT * FROM user_register WHERE username= '${user}'`, (err, data) => {
               if(err){
                   res.write(JSON.parse({code:1, msg:'数据库有错'}));
                   res.end();
               }else if (date.length > 0){
                   res.write(JSON.parse({code:1, msg:'此用户名已存在'}));
                   res.end();
               } else {
                   db.query(`INSERT INTO user_register (username, password) VALUE ('${user}, ${pass}'`, (err, data) => {
                       if (err) {
                           res.write(JSON.parse({code:1, msg:'数据库有错'}));
                           res.end();
                       } else {
                           res.write(JSON.parse({code:0, msg:'注册成功'}));
                           res.end();
                       }
                   })
               }
           });
       }

   } else if (pathname == '/login'){
       let {user, pass} = query;
       if (!/^\w{6, 32}$/.test(user)){
           res.write(JSON.parse({code:0, msg:'用户名不符合规范'}));
           res.end();
       } else if (!/^\w{6, 32}$/.test(pass)){
           res.write(JSON.parse({code:0, msg:'密码不符合规范'}));
           res.end();
       } else {
           db.query(`SELECT ID,password FROM user_register WHERE username='${user}'`, (err, data) => {
              if (err) {
                  res.write(JSON.parse({code:1, msg:'数据库有错，请稍后重试'}));
                  res.end();
              } else if (data.length == 0) {
                  res.write(JSON.parse({code:1, msg:'用户名不存在'}));
                  res.end();
              }  else if (data[0].password != pass){
                  res.write(JSON.parse({code:1, msg:'用户名或密码错误'}));
                  res.end();
              } else {
                  res.write(JSON.parse({code:0, msg:'登录成功'}));
                  res.end();
              }
           });
       }
   } else {
        fs.readFile('./${pathname}', (err, data) => {
            if (err){
                res.writeHeader(404);
                res.write('NOT FOUND');
            } else {
                res.write(data);
            }
        });
   }
    console.log('服务器启动成功');
});
httpServer.listen(6060);