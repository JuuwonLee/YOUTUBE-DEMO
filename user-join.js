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

app.use(express.json()) // http 외 모듈인 '미들웨어' :json 설정
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