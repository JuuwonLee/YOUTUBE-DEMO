const express = require('express')
const router = express.Router()

let channelDb = new Map()
var id = 1


router.use(express.json()) // http 외 모듈인 '미들웨어' :json 설정

router
    .route('/')
    .post(function(req, res){ // 채널 생성
    const channelTitle = req.body.channelTitle
    const userId = req.body.userId
    if(userId){
        if(channelTitle) {
            channelDb.set(id++, req.body)
            res.status(201).json({
                message : `${channelDb.get(id-1).channelTitle}님, 채널을 응원합니다.`
            })
                
        } else {
            res.status(400).json({
                message : "채널 명을 제대로 입력해주세요."
            })
        }
    }
    else{ // 채널을 만들때 아이디 정보가 없을 때
        res.status(400).json({
            message : "로그인이 필요한 페이지 입니다."
        })
    }
    

})

// 채널 전체 조회
    .get(function(req, res){
    var channels = []
    
    if(channelDb.size !== 0) {
        var {userId} = req.body
        if(userId == undefined){
            res.status(404).json({
                message : "로그인이 필요한 페이지 입니다."
            })
        } else {
            channelDb.forEach(function (value, key) {
                if(value.userId === userId)
                    channels.push(value)
            })
        }

        // userId가 가진 채널이 없으면
        if(channels.length == 0) {
            res.status(404).json({
                message : `${userId}가 소유한 채널이 없습니다.`
            })
        } else {
            res.status(200).json(channels)
        }
        
    } else {
        res.status(404).json({
            message : "조회할 채널이 없습니다."
        })
    }



})

router
    .route('/:id')
    .get(function(req, res){
        let {id} = req.params
        id = parseInt(id)

        const channel = channelDb.get(id)
        if(channel == undefined) {
            res.status(404).json({
                message : "채널 정보가 없습니다."
            })
        } else {
            res.status(200).json({
                channelTitle : channel.channelTitle
            })
        }
    })
    .put(function(req, res){
        let {id} = req.params
        id = parseInt(id)

        if(channelDb.size < id){
            res.status(404).json({
                message : `수정 요청하신 id : ${id}는 없는 채널입니다.`
            })
        } else {
            const channel = channelDb.get(id)
            var oldTitle = channel.channelTitle

            var newTitle = req.body.channelTitle
            channel.channelTitle = newTitle
    
            channelDb.set(id, channel)
    
            res.status(200).json({
                message : `${oldTitle}님, 채널명이 ${newTitle}로 변경되었습니다.`
            })
        }
        
        
    })
    .delete(function(req, res){
        let {id} = req.params
        id = parseInt(id)
        
        if(channelDb.size < id){
            res.status(404).json({
                message : `삭제 요청하신 id : ${id}는 없는 채널입니다.`
            })
        } else {
            var channel = channelDb.get(id)
            const channelTitle = channel.channelTitle
            
            channelDb.delete(id)
                
            res.status(200).json({
                message : `${channelTitle}님, 채널이 삭제되었습니다.`
            })
            
        }
        
    })

    module.exports = router