const express = require('express')
const app = express()
const path = require('path')
const MongoClient = require('mongodb').MongoClient
const cors = require('cors');

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
    res.send('add 페이지')
})

app.post('/add', (req, res) => {
    db.collection('post').insertOne({title: req.body.title, date: req.body.date}, (err, result) => {
        res.send(req.body)
    })
}) 

app.use(express.static(path.join(__dirname, 'react/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/react/build/index.html'))
})