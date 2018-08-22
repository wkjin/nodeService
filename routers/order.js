/**
 * 功能：订单路由
 * */
const express = require( 'express' )
const router = express.Router()

router.get( '/create', ( req, res ) => {
    res.send('创建订单')
})

router.get( '/delete', ( req, res )=> {
    res.send('删除订单')
})

router.get( '/update' , ( req, res ) => {
    res.send( '更新订单')
} )

router.get( '/add' , ( req, res )=> {
    res.send( '添加订单')
})

router.get( '/list', ( req, res ) => {
  res.send( '获取订单列表')  
})

module.exports = router