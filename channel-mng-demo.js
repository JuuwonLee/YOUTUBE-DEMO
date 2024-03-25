const express = require('express')
const app = express()
app.listen(1234)

let channelDb = new Map()
var idx = 1

// 채널 생성
app.use(express.json()) // http 외 모듈인 '미들웨어' :json 설정
app.post('/channel', function(req, res){
    const channelTitle = req.body.channelTitle
    
    // console.log(channelTitle)
    if(channelTitle) {
        channelDb.set(idx++, req.body)
        res.status(201).json({
            message : `${channelDb.get(idx-1).channelTitle}님, 채널을 응원합니다.`
        })
            
    } else {
        res.status(400).json({
            message : "채널 명을 제대로 입력해주세요."
        })
    }
})

// 채널 전체 조회
app.get('/channels', function(req, res){
    var channels ={}
    if(channelDb.size !== 0) {
        channelDb.forEach(function(value,key){
            channels[key] = value
        })    
        res.status(200).json(channels)
    } else{
        res.status(404).json({
            message : "조회할 채널이 없습니다."
        })
    }
})
app
    .route('/channels/:id')
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

        const channel = channelDb.get(id)
        var oldTitle = channel.channelTitle
        if(channel == undefined){
            res.status(404).json({
                message : `수정 요청하신 ${channelTitle}는 없는 채널입니다.`
            })
        } else{
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
        
        var channel = channelDb.get(id)
        if(channel){
            const channelTitle = channel.channelTitle
            channelDb.delete(id)
            
            res.status(200).json({
                message : `${channelTitle}님, 채널이 삭제되었습니다.`
            })
        } else{
            res.status(404).json({
                message : `삭제 요청하신 ${channelTitle}는 없는 채널입니다.`
            })
        }
    })
