require('dotenv').config()

const express = require('express')
const app = express()
const path = require('path')
const MongoClient = require('mongodb').MongoClient
const mongodb = require('mongodb');
const cors = require('cors');
const LocalStrategy = require('passport-local').Strategy //로그인
const session = require('express-session')
const passport = require('passport')
// const bcrypt = require('bcrypt') // compare password
const cookieParser = require('cookie-parser') // 마이페이지 구현할 때 사용 예정
const helmet = require('helmet') // 웹 보안
const saltRounds = 10; // bcrypt 해싱에 사용될 salt 라운드 수

  
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(session({secret: '비밀코드', resave: true, saveUninitialized: false}))
app.use(cors());
app.use(cookieParser()) // 쿠키 쉽게 추출해주는 미들웨어
app.use(passport.initialize())
app.use(passport.session()) //로그인 세션을 위해 쓴 미들웨어


var db;
MongoClient.connect(process.env.DB_URL, { useUnifiedTopology: true } ,function(err, client) {
    if (err) return console.log(err)
    db = client.db('toyProject')

    app.listen(process.env.PORT, function() {
        console.log('success listening')
    })
}) 

app.get('/add', (req, res) => {
    var user = req.user.id
    db.collection('post').find().toArray((err, result) => {
        res.send([result, user])
    })
})

app.post('/add', (req, res) => {
    db.collection('post').insertOne({title: req.body.title, date: req.body.date, completed: req.body.completed, writer: req.user.id}, (err, result) => {
        res.send(result)
    })
}) 

app.post('/completed/:id', (req, res) => {
    db.collection('post').findOne({_id: new mongodb.ObjectID(req.params.id)}, (err, result) => {
        db.collection('post').updateOne({_id: new mongodb.ObjectID(req.params.id)}, {$set: {completed: req.body.completed}}, (err, result =>{
            if (err)
                res.send('completed 에러 남')
            else {
                res.send('complete 바뀜!')
            }
        }))
    })
})

app.delete('/delete/:id', (req, res) => {
    var user = req.user.id
    db.collection('post').deleteOne({_id: new mongodb.ObjectID(req.params.id), writer: user}, (err, result) =>{ 
        if (result.deletedCount == 0)
            res.send('fail')
        else
            res.send(req.body)
    })
})

app.post('/register', (req, res) => {
    db.collection('writer').findOne({id: req.body.id}, (err, result) => { 
        if (result) {
            res.status(200).send('중복된 아이디 (server)')
        }
        else {
            db.collection('writer').insertOne({id: req.body.id, pw: req.body.pw}, (err, result) => {
                res.status(200).send('success to register')
            })
            
            }
    })
})

app.post('/login', passport.authenticate('local', {failureRedirect: '/login'}) ,(req, res) => {
    res.status(200).send('success to login')  
})

passport.use(new LocalStrategy({
    usernameField: 'id',
    passwordField: 'pw',
    session: true,
    passReqToCallback: false, //요청 이후 설정할 거 있는 지 물어보는 거
}, (inputId, inputPw, done) => {
    db.collection('writer').findOne({id: inputId}, (err, user) => {
        if (err) {
            console.error(err);
            return done(err);
        }
        if (user) {
            comparePasswords(inputPw, user.pw, (err, result) => {
                if (err) {
                    console.error(err);
                    return done(err);
                }
                if (result) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: '비밀번호가 일치하지 않습니다.' })
                }
            })
        }
         else {
            return done(null, false, { message: '가입되지 않았습니다.' });
        }
    })
})) 
   
function comparePasswords(inputPw, pw, callback) {
    if (inputPw == pw) {
        callback(null, true);
    } else {
        callback(null, false);
    }
}

passport.serializeUser(function (user, done) {
    done(null, user.id)
  }); // 쿠키 만듦
passport.deserializeUser(function (id, done) {
    db.collection('writer').findOne({id: id}, (err, result) => {
        done(null, result)
    })
}); 


app.use(express.static(path.join(__dirname, 'myreact/build')));


function Logined(req, res, next) {
    if (req.user) {
        next()
    } else {
        res.send('not logined')
    }
}
 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/myreact/build/index.html'))
})
app.get('*', Logined, (req, res) => {
    res.sendFile(path.join(__dirname, '/myreact/build/index.html'))
})

