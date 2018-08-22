const express = require( 'express' )//引入http的封装模块express
const bodyParser = require( 'body-parser' )//对于参数处理
const compression = require( 'compression' )//引入文件压缩文件
const cors = require( 'cors' )//引入跨域处理
const morgan = require( 'morgan' )//引入日志处理

//路由引入
const { baseRouter, errorRouter, orderRouter, userRouter, productRouter } = require( './routers')
const app = express()

//使用body-parser是post参数进行处理
app.use( bodyParser.urlencoded({ extended: false }))
//使用日志
app.use( morgan( 'dev' ))
//使用代码压缩
app.use( compression() )
//使用跨域
app.use( cors({ origin: '*' }))

//引入路由
app.use( baseRouter )
app.use( '/order', orderRouter )
app.use( '/user', userRouter )
app.use( '/product', productRouter )

//使用静态资源
app.use( express.static( __dirname+ '/static' ) )
//错误处理
app.use( errorRouter )

//启动服务器
app.listen(1111,() => {
    console.log('reflesh node service is aready run in 1111');
})