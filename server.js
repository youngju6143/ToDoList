const express = require('express')
const app = express()
const path = require('path')
const MongoClient = require('mongodb').MongoClient
const cors = require('cors');
var mongodb = require('mongodb');

app.use(express.json());
app.use(express.urlencoded({extended:true})) // 나는 바보다.. 이 코드를 안 넣고 db에 데이터를 넘기려 하다니.. 난 바보다...
app.use(cors());


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


app.use(express.static(path.join(__dirname, 'myreact/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/myreact/build/index.html'))
})