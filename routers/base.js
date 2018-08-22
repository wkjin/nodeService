/**
 * 功能：基本路由（对于首页的处理、对于错误页面的处理）
 */
const express = require( 'express' )
const router = express.Router()

 //配置根目录的访问
 router.get('/',(req,res)=>{
    console.log(req.url,'+++++++++++++++++')
    userList = [
        { username : 'wkj' , age: 0 }
    ]
    console.log(req.url)
    console.log(req.method)
    console.log(req.params)
    console.log(req.query)
    res.send(userList)
})

module.exports = router


