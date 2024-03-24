// express 모듈 셋팅
const express = require('express')
const app = express()
app.listen(1234)

let user1 = {
    id : "abc111",
    pwd : "pwd1",
    name : "LeeJuwon"
}
let user2 = {
    id : "bcd222",
    pwd : "pwd2",
    name : "Wonju"
}
let user3 = {
    id : "cde333",
    pwd : "pwd3",
    name : "Sohee"
}

let db = new Map()
var idx = 1

db.set(idx++, user1)
db.set(idx++, user2)
db.set(idx++, user3)

app.post('/join',  (req, res) =>  {
    const id = req.body.id
    const pwd = req.body.pwd
    const name = req.body.name
    if(id) {
        if(pwd) {
            if(name) {
                db.set(idx++, req.body)
                res.status(201).json({
                    message : `${db.get(idx-1).name}님, 회원 가입을 환영합니다.`
                })
            } else {
                res.status(400).json({
                    message : "이름을 제대로 입력해주세요."
                })
            }
            
        } else {
            res.status(400).json({
                message : "비밀번호를 제대로 입력해주세요."
            })
        } 
    } else {
        res.status(400).json({
            message : "id를 제대로 입력해주세요."
        })
    }
  // 등록 : map(db)에 저장(put) 해야 함    
})

app.use(express.json()) // http 외 모듈인 '미들웨어' :json 설정
app.post('/login',  (req, res) =>  {
    const id = req.body.id
    const pwd = req.body.pwd
    
    db.forEach(function(a, b, c){
        // 데이터, 인덱스, 객체 통째로
        if(id === a.id){
            if(pwd === a.pwd){
                res.status(201).json({
                    message : "로그인이 되었습니다."        
                })
            } else {
                res.status(400).json({
                    message : "비밀번호가 맞지 않습니다."
                })
            }
        } else {
            res.status(400).json({
                message : "해당하는 id가 없습니다."
            })
        }
    })

    // 등록 : map(db)에 저장(put) 해야 함
    
})

// 회원 개별 조회
app.get('/users/:idx', function(req, res){
    let {idx} = req.params
    idx = parseInt(idx)

    const user = db.get(idx)
    if(user == undefined){
        res.status(404).json({
            message : "회원 정보를 찾을 수 없습니다."
        })
    } else{
        res.json(user)
    }
})

// 회원 개별 탈퇴
app.delete('/users/:idx', function(req, res){
    let {idx} = req.params
    idx = parseInt(idx)
    
    var user = db.get(idx)
    if(user){
        const id = user.id
        db.delete(idx)
        
        res.json({
            message : `${id}님, 다음에 또 뵙겠습니다.`
        })
    } else{
        res.status(404).json({
            message : `요청하신 ${id}는 없는 회원 id입니다.`
        })
    }
        
})