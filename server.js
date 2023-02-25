const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient
const connectionString =
  'mongodb+srv://admin:admin123@cluster0.nzuywvc.mongodb.net/?retryWrites=true&w=majority'

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('star-wars-quotes')
    const quotesCollection = db.collection('quotes')
      app.use(express.static('public'))
      app.use(bodyParser.urlencoded({ extended: true }))
      app.use(bodyParser.json())
      app.set('view engine', 'ejs')

      app.get('/', (req, res) => {
        db.collection('quotes').find().toArray()
        .then(results => {
          res.render('index.ejs', {quotes: results})
        })
        .catch(err => console.error(err))
        
        
      })

      app.post('/quotes', (req, res) => {
        quotesCollection.insertOne(req.body)
        .then(result => {
          res.redirect('/')
        })
        .catch(error => console.error(error))
      })

      app.put('/quotes', (req,res) => {
        console.log(req.body);
      })

      app.listen(3000, () => {
        console.log('Listening on port: 3000')
      })
  })
  .catch(error => console.error(error))