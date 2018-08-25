/**
 * 功能：mysql操作助手
 */

class mysqlHandler {

    constructor(poolConfig, IS_DEV){
        this.setIsDev( IS_DEV );
        this.setPoolConfig( poolConfig );
        this.pool = null;//初始化连接池为空，调用的使用才建立连接池
        this.mysql = require( 'mysql' );//引入mysql操作包

        /* 
        //自动完成sql语句的时候使用（现在暂时不开发）
        this.sqlCondition = null;//sql语句的条件
        this.sqlOrder = null;//sql语句的排序
        this.sqlLimit = null;//sql的限制条数
        this.sqlGroup = null;//sql的分组 
        */
    }

    //设置连接池的配置
    setPoolConfig( poolConfig ){
        (poolConfig === undefined || poolConfig === null ) && ( poolConfig = {});
        let { host, user, password, database, port, connectionLimit, multipleStatements } = poolConfig;
        this.poolConfig = {
            host: host || '127.0.0.1',
            user: user || 'root',
            password: password || '',
            database: database || 'test',
            port: port || 3306,
            connectionLimit: connectionLimit || 10,
            multipleStatements: multipleStatements || true
        };
        return this;            
    }

    //设置是否开发模式
    setIsDev(IS_DEV){
        this.IS_DEV = IS_DEV || false;
        return this;
    }

    //定义返回数据的统一格式
    getReturnData( error, msg, data ){
        return {
            error: ( error === undefined )? 1 : error,
            msg: msg || '',
            data: data || null
        };
    };

    //创建一个连接池
    createMysqlPool( config ) {
        if(this.pool === null){
            this.pool = this.mysql.createPool(config === undefined ? this.poolConfig : config);
        }
        return this;
    }

    //断开pool
    poolClose() {
        return new Promise(( successCallback, errorCallback ) => {
            if( this.pool !== null){
                this.pool.end( error => {
                    if(error){
                        errorCallback( '关闭连接池失败：' + error.toString());
                    }else{
                        this.pool = null;
                        successCallback( '已经关闭连接池' );
                    }
                });
            }
        });
    }

    //原生态查询，并返回结果集（使用Promise进行数据操作）
    query( sql ){
        this.createMysqlPool();
        return new Promise( (successCallback, errorCallback ) => {
            this.pool.getConnection(( error, conn ) => {
                if( error ){
                    errorCallback( '数据库连接出错：' + error.toString());
                }else{
                    conn.release(); //释放连接（防止运行结束无法释放连接）
                    conn.query( sql, ( err, results , fields ) => {
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

    //进行查询数据（按照返回要求）
    sqlFetch( sql ){
        return new Promise( callback => {
            this.query(sql).then(( results)=>{
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
                callback( this.getReturnData( 0, '操作成功', data ));
            }).catch( error => {
                callback( this.getReturnData( 2, this.IS_DEV ? error: '服务器错误' ));
            });
        });
    }
}

module.exports = mysqlHandler
