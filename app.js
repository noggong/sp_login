const express = require("express")

const app = express()

app.post('/login', (req, res) => {
    res.send("로그인")
})


app.post('/logout', (req, res) => {
    res.send("로그아웃")
})

app.post('/register', (req, res) => {
    res.send("회원 가입")
})

app.get('/users', (req, res) => {
    res.send("회원 정보")
})


app.listen(3000, () => {
    console.log("서버 실행")
})

