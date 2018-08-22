/**
 * 功能：对于商品路由的处理
 */
const express = require( 'express' )
const router = express.Router()

//新增商品
router.post( '/add', ( req, res ) => {
    res.send( '添加商品' )
})

router.post( '/update', ( req, res ) => {
    res.send('修改商品')
})

router.get( '/delete', ( req, res ) => {
    res.send( '删除商品' )
})

router.get( '/list' ,( req, res ) => {
    res.send('获取商品的信息')
})

module.exports = router
