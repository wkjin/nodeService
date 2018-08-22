//统一route的所有文件

//对于基础的路由进行加载
const baseRouter = require( './base' )

//对路由错误处理
const errorRouter = require( './error')

//订单路由
const orderRouter = require( './order' )

//用户路由
const userRouter = require( './user' )

//商品路由
const productRouter = require( './product' )

module.exports = {
    baseRouter,
    errorRouter,
    orderRouter,
    userRouter,
    productRouter
}
