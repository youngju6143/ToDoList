const express = require('express')
const app = express()
const path = require('path')
const MongoClient = require('mongodb').MongoClient
const mongodb = require('mongodb');
const cors = require('cors');
const LocalStrategy = require('passport-local').Strategy //로그인
const session = require('express-session')
const passport = require('passport')

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(session({secret: '비밀코드', resave: true, saveUninitialized: false}))
app.use(cors());
app.use(passport.initialize())
app.use(passport.session()) //로그인 세션을 위해 쓴 미들웨어


var db;
MongoClient.connect('mongodb+srv://youngju6143:dudwn0428!@youngju.tcx4coy.mongodb.net/?retryWrites=true&w=majority', { useUnifiedTopology: true } ,function(err, client) {
    if (err) return console.log(err)
    db = client.db('toyProject')

    app.listen(8000, function() {
        console.log('listening on 8000')
    })
}) 

app.get('/add', (req, res) => {
    db.collection('post').find().toArray((err, result) => {
        res.send(result)
    })
})

app.post('/add', (req, res) => {
    db.collection('post').insertOne({title: req.body.title, date: req.body.date}, (err, result) => {
        res.send(req.body)
    })
}) 

app.delete('/delete/:id', (req, res) => {
    db.collection('post').deleteOne({_id: new mongodb.ObjectID(req.params.id)}, (err, result) =>{ 
        if (err)
            res.status(500).send('fail')
        else
            res.send('success')
    })
})


//login, register
app.post('/register', (req, res) => {
    db.collection('writer').insertOne({id: req.body.id, pw: req.body.pw}, (err, result) => {
        res.send('success to register')
    })
})

app.post('/login', passport.authenticate('local', {failureRedirect: '/fail'}) ,(req, res) => {
    db.collection('writer').findOne({_id: new mongodb.ObjectID(req.params.id)}).toArray(), (err, result) => {
        res.redirect('/')
    }
})

app.use(express.static(path.join(__dirname, 'myreact/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/myreact/build/index.html'))
})

passport.use(new LocalStrategy({
    usernameField: 'id',
    passwordField: 'pw',
    session: true,
    passReqToCallback: false, //요청 이후 설정할 거 있는 지 물어보는 거
}, function(inputId, inputPw, done) {
    console.log(inputId, inputPw)
    db.collection('writer').findOne({id: inputId}, (err, result) => {
        if (err) console.log(err)
        if (!result) return done(null, false, {message: '존재하지 않는 아이디입니다.'})
        if (inputPw == result.pw) return done(null, result)
        else return done(null, false, {message: '비밀번호를 틀렸습니다.'})
    })
})) // 로그인 기능 구현

passport.serializeUser(function (user, done) {
    done(null, user.id)
  }); // 쿠키 만듦
passport.deserializeUser(function (id, done) {
    db.collection('writer').findOne({id: id}, (err, result) => {
        done(null, result)
    })
}); 