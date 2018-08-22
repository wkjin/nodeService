/**
 * 功能：对于用户路由的处理
 */
const express = require( 'express' )
const router = express.Router()

//登录的post请求
router.post( '/login', ( req, res ) => {
    console.log( req.body )
    res.send( 'login请求已经收到了' )
})

router.post( '/register', ( req, res ) => {
    console.log( req.body )
    res.send( 'regiseter请求已经收到！！！' )
})

module.exports = router
