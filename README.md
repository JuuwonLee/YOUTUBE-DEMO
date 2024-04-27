# 미니 프로젝트

## 진짜 유튜브 운영하는 것처럼

**회원**
1) 로그인
2) 회원가입
3) 회원 정보 조회
4) 회원 탈퇴

회원은 계정 1개당 채널 100개를 가질 수 있다.

**채널** 
- 채널 생성
- 채널 수정
- 채널 삭제

## 회원 API 설계

**회원**
1) 로그인 : POST /login

	- req : body (userId, pwd)
    - res : `${name}님 환영합니다` // 👉🏻 메인 페이지
2) 회원가입 : POST /join

	- req: body (email, name, pwd, contact)
    - res : `${name}님 환영합니다` // 👉🏻 로그인 페이지

3) 회원 개별 "조회" : GET /users

	- req : body (email)
    - res : 회원 객체를 통으로 전달
4) 회원 개별 "탈퇴" : DELETE /users
    
	- req : body (userld)
    - res : `${name}님 다음에 또 뵙겠습니다` or 메인 페이지
        
## 채널 API 설계 (URL, http method/status, req/res)

채널
- 채널 생성
- 채널 수정
- 채널 삭제

1) INSERT 채널 "생성" : POST /channel
- req : body (channelTitle, userId) cf. userId는 body X header 숨겨서.. Token
- res 201 : `${channelTitle}님 채널을 응원합니다` 👉 다른 페이지 ex) 채널 관리 페이지

2) UPDATE 채널 개별 "수정" : PUT /channel/:id
- req : URL (id), body (channelTItle)
- res 200 : `채널명이 성공적으로 수정되었습니다. 기존 : ${} -> 수정 : ${}`

3) DELETE 채널 개별 "삭제" : DELETE /channel/:id
- req : URL (id)
- res 200 : `삭제 되었습니다` 👉🏻 메인페이지

4) SELECT **회원의 채널 전체 "조회" : GET /channels**
- req : body (userId)
- res 200 : 채널 전체 데이터 list, json array

5) SELECT 채널 개별 "조회" : GET /channels/:id
- req : URL (id)
- res 200 : 채널 개별 데이터
