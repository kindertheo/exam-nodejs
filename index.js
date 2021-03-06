const express = require('express');
const bodyParser = require('body-parser')
// const List = require('./data/liste')

let app = express();

app.use('/js', express.static('./static/js'))
app.use('/css', express.static('./static/css'))
app.use('/img', express.static('./static/img'))
app.use('/html', express.static('./static/html'))
app.use('/data', express.static('./data'))

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var MongoClient = require('mongodb').MongoClient;
const CONNECTION_URL = "mongodb://127.0.0.1:27017";
const DATABASE_NAME = 'exam'

app.listen(3000, () => { 
  console.log('Server launch on port : 3000')
  
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection('country');
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
  }); 


app.get('/', (req, res) => {
  var name= 'hello';
  res.sendFile(__dirname + "/static/html/index.html")
})

app.get('/id/:id', (req, res) => {
  let id = req.params.id
  collection.findOne({'_id': new require('mongodb').ObjectID(id)}).then( (result, error) => 
  {
    if(error){
      return res.status(404).send(error)
    }
    return res.send(result)
  })
})

app.get('/show', (req, res) => {
  let id = req.params.id
  collection.findOne({'_id': new require('mongodb').ObjectID(id)}).then( (result, error) => 
  {
    if(error){
      return res.status(404).send(error)
    }
    return res.sendFile(`${__dirname}/static/html/country.html`)
  })
})


app.get('/country/year/:year', (req, res) => {
  let year = req.params.year
  if(!year.length == 4){
    return res.status(500).send('Erreur dans l\'année')
  }

  //  collection.find({ $or: [ {Year: parseInt(year)}, {Year: year} ] }, {projection:{_id:0, Year:0}}).toArray( (error, result) => {

  collection.find({ $or: [ {Year: parseInt(year)}, {Year: year} ] } ).toArray( (error, result) => {
    if (error){
      return res.status(500).send(error)
    }
    return res.send(result)
  })
})

app.get('/country', (req, res) => {
    //res.send('ok')
    collection.find({}).toArray( (error, result) => {
      if(error){
        return res.status(500).send(error)
      }
      res.send(result)
    })

  } 
);


app.get('/add/form', (req, res) => {
  res.sendFile(`${__dirname}/static/html/form.html`)
})

app.post('/add/country', (req, res) => {

  let data =req.body
  console.log(data)
  collection.insertOne(data, (error, result) => {
    if (error){
      return res.status(418).send(error)
    }
    console.log(result)
    res.redirect("/")

  })
});


app.get('/update', (req, res) => {
  res.sendFile(`${__dirname}/static/html/update_form.html`)
})

app.put('/update/:id', (req, res) => {
  let data = req.body
  console.log(data)
  let query = {'_id':  new require('mongodb').ObjectID(req.params.id)}
  collection.findOneAndUpdate(
    query, 
    { $set : data },
  (err, response) => {
    if(err){
      console.log(err);
      return res.status(500).json({error: req.params.id + ' not found - status 500'})
  }
  else{
      if(response == null) {
          return res.status(404).json({error: req.params.id + ' not found - status 404'})
      }
      else {
          console.log(response);
          console.log("updated");
          res.status(200).json({updated_id:  req.params.id});
          //res.redirect(`/show?id=${req.params.id}`)
      }
    }
  })
})


app.delete('/delete/:id', (req, res) => {

  console.log("id", req.params.id);
  let query = {'_id':  new require('mongodb').ObjectID(req.params.id)}
  collection.deleteOne(query, function(err, response){
      if(err){
          console.log(err);
          return res.status(500).json({error: req.params.id + ' not found - status 500'})
      }
      else{
          if(response == null) {
              return res.status(404).json({error: req.params.id + ' not found - status 404'})
          }
          else {
              console.log(response);
              console.log("deleted");
              res.status(200).json({deleted_id:  req.params.id});
          }
      }
  });

})