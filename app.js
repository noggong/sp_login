const express = require("express")
const cookieParser = require('cookie-parser')

const app = express()
app.use(cookieParser())

// json 형태의 body 를 받기 위해서 작성
app.use(express.json())

const users = [
    {name: "우준호", id: "noggong", password: "1234"},
    {name: "이설인", id: "seolin", password: "asdf"},
    {name: "주민석", id: "minseok", password: "hello"},
    {name: "유희선", id: "heesun", password: "94kf"},
    {name: "한동주", id: "dongjoo", password: "vded"},
]

app.get('/login', (req, res) => {
    // console.log(req.query)
    // const id = req.body.id
    // const password = req.body.password
    const id = req.query.id
    const password = req.query.password
    const user = users.find(user => user.id === id)
    console.log(user)

    if (!user) {
        return res.send("너 누구니?")
    }

    if (user.password !== password) {
        return res.send("비밀번호 확인해라")
    }

    res.cookie('user-id', user.id)
    res.send("로그인")
})

app.get('/logout', (req, res) => {

    res.clearCookie("user-id")
    res.send("로그아웃")
})

app.get('/register', (req, res) => {
    const id = req.query.id
    const password = req.query.password
    const name = req.query.name

    const user = users.find(user => user.id === id)
    if (user) {
        return res.send("중복아이디 임다.")
    }

    users.push({id, password, name})
    console.log(users)
    res.send("회원 가입")
})

app.get('/users', (req, res) => {
    const id = req.cookies["user-id"]
    if (!id) {
        return res.send("로그인 부터 하십셔")
    }
    const user = users.find(user => user.id === id)
    if (!user) {
        return res.send("회원 정보 잘못넣어!")
    }
    res.send(user)
})


app.listen(3000, () => {
    console.log("서버 실행")
})

