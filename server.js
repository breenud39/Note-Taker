const express = require('express');
const fs = require('fs');
const path = require('path');
const { index } = require('./db/db.json')

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// GET method route

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
})

app.post('/api/notes', (req, res) => {
  console.log(req.body);
  fs.writeFile('./db/db.json', req.body, (err) => {
    if (err)
      console.log(err);
    else {
      console.log("File written successfully\n");
      console.log("The written has the following contents:");
      console.log(fs.readFileSync('./db/db.json', "utf8"));
    }
  });
})


// add unique identifier for each note uuid
// add id to the object the value is uuid
// then rewrite json file with up to date data

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
})

// router.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../../public/index.html'));
// });

app.listen(3001, () => {
  console.log(`API server now on port 3001!`);
})