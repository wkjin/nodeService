const mysql = require( 'mysql' )

//建立连接池
const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'myfresh',
    port: 3306,
    connectionLimi: 100,
    multipleStatements: true//允许一次执行多个sql
})

//导出查询相关  
const query = function( sql, callback ){    
    pool.getConnection( function( err, conn ){    
        if( err ){    
            callback( err, null, null);    
        }else{    
            conn.query( sql, function( qerr, vals, fields ){    
                //释放连接    
                conn.release();    
                //事件驱动回调    
                callback( qerr, vals, fields);    
            });    
        }    
    });    
};    

//获取一个列表

//获取一条数据

//删除数据

//修改数据

//添加数据

module.exports= {
    query,

}
