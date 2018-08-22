/**
 * 功能：对路由做错误信息处理
 */
const express = require( 'express' )
const router = express.Router()

router.get( '*', ( req ,res ) =>{
    res.send('路由错误处理')
})

module.exports = router

