/* 
//进行查询数据
var sql = 'insert into user values (null,"wkj10","123456")';
sql = 'update user set email ="wkj11" where id = 1';
sql = ' delete from user where id=1';
sql = ' select * from user';
*/
const mysqlHandler = require('../store/mysqlHandler.js');
var sql = ' select * from user';
const mh = new mysqlHandler({database: 'test_ionic'},true);
mh.sqlFetch(sql).then( data => {
    return new Promise( callback => {
        console.log(data);
        callback();
    });
}).then(()=>{
    mh.poolClose();
});

