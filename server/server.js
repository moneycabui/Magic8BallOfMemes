const express = require('express');
const path = require('path');
const axios = require('axios');
const APIKey = require('../APIKey.js');

const app = express();
const port = 3300;

app.use(express.json());
app.use('/static', express.static(path.join(__dirname, '/../client/dist')));
app.use('/', express.static(path.join(__dirname, '..', 'public')));

app.get('/answer', (req, res) => {
  const answerOptions = ['yes', 'absolutely', 'definitely', 'yup', 'yeah', 'alright', 'nod', 'perhaps', 'possibly', 'maybe', 'i don\'t know', 'face palm', 'try again', 'naw', 'nah', 'no', 'nope', 'smh'];
  let randomNumber = Math.floor(Math.random() * 18);
  let answerKeyword = answerOptions[randomNumber];

  axios.get(`http://api.giphy.com/v1/gifs/search`, {
    params: {
      'api_key': APIKey,
      'q': answerKeyword,
      'limit': 10,
      'lang': 'en',
      'rating': 'pg-13'
    }
  })
    .then((result) => {
      res.send(result.data);
      res.status(200);
    })
    .catch((error) => {
      console.log('Server error fetching memes: ', error);
      res.status(400);
    })
})

// app.get('/trending', (req, res) => {
//   const typeOptions = ['gifs', 'sticker'];
//   let randomNumber = Math.floor(Math.random() * 2);
//   let currentType = typeOptions[randomNumber];

//   axios.get(`api.giphy.com/v1/${currentType}/trending`, {
//     params: {
//       api_key: APIKey,
//       limit: 10,
//       rating: 'pg-13',
//     }
//   })
//     .then((result) => {
//       res.send(result.data);
//       res.status(200);
//     })
//     .catch((error) => {
//       console.log('Server error fetching trending memes: ', error);
//       res.status(400);
//     })
// })

app.listen(port,() => {
  console.log(`Server is listening on port ${port}`)
})
