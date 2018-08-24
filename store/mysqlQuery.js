const mysql  = require( 'mysql' );

var IS_DEV = true;

//定义返回数据的统一格式
const getReturnData = function( error, msg, data ){
    ( error === undefined ) && ( error = 1 );
    return {
        error,
        msg: msg || '',
        data: data || null
    };
};

const setIsDev = function(status){
    IS_DEV = (status === undefined) ? true : status;
};


//连接池配置文件
var poolConfig = {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'test_ionic',
    port: 3306,
    connectionLimit: 10,
    multipleStatements: true
};

var pool = null;//保存连接池

//创建一个连接池
const createMysqlPool = function(config){
    if(pool === null){
        pool = mysql.createPool(poolConfig);
    }
};

//断开pool
const poolClose = function() {
    return new Promise(( successCallback, errorCallback ) => {
        if( pool !== null){
            pool.end( error => {
                if(error){
                    errorCallback('关闭连接池失败：'+error.toString());
                }else{
                    pool = null;
                    successCallback('已经关闭连接池');
                }
            });
        }
    });
}


//原生态查询，并返回结果集（使用Promise进行数据操作）
const query = function(sql ){
    createMysqlPool();
    return new Promise( (successCallback, errorCallback ) => {
        pool.getConnection(( error, conn ) => {
            if( error ){
                errorCallback( '数据库连接出错：' + error.toString());
            }else{
                conn.release(); //释放连接（防止运行结束无法释放连接）
                conn.query( sql, function( err, results , fields ){
                    if(err){
                        errorCallback("查询出错：" + err.toString());
                    }else{
                        successCallback(results,fields);
                    }
                });
            }
        });
    });
};

//进行查询数据（按照）
const sqlFetch = function( sql ){
    return new Promise( callback => {
        query(sql).then(( results, fields )=>{
            var data = [];
            switch(sql.trim().substr(0,6).toUpperCase()){
                case 'SELECT':{
                   data = JSON.parse(JSON.stringify(results));
                }break;
                case 'INSERT':{
                   data['insertId'] = results.insertId;
                   data['affectedRows'] = results.affectedRows
                }break;
                case 'UPDATE':{
                   data['affectedRows'] = results.affectedRows
                }break;
                case 'DELETE':{
                   data['affectedRows'] = results.affectedRows
                }break;
                default:{
                    data = '数据库查询错误';
                }
            }
            callback(getReturnData(0,'操作成功',data));
        }).catch( error => {
            callback( getReturnData( 1, IS_DEV ? error: '服务器错误' ));
        });
    });
};

module.exports = {
    query,
    sqlFetch,
    setIsDev,
    poolClose
}
