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
      app.use(bodyParser.urlencoded({ extended: true }))

      app.get('/', (req, res) => {
        res.sendFile(__dirname + '/index.html')
      })

      app.post('/quotes', (req, res) => {
        console.log(req.body)
      })

      app.listen(3000, () => {
        console.log('Listening on port: 3000')
      })
  })
  .catch(error => console.error(error))