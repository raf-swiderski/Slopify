const express = require('express')

//node modules
require('dotenv').config()
var cookieParser = require('cookie-parser');
var cors = require('cors');
var querystring = require('querystring');
const axios = require('axios');

//local modules
var generateRandomString = require('./generateRandomString')

const app = express()
const port = 8888

var client_id = process.env.CLIENT_ID;
var client_secret = process.env.CLIENT_SECRET;
var redirect_uri = process.env.REDIRECT_URI;
var stateKey = 'spotify_auth_state';

app.use(express.static('static'))
   .use(cors())
   .use(cookieParser())

app.get('/', (req, res) => {
  res.sendFile('static/index.html', {root: __dirname })
})

app.get('/home', (req, res) => {
  res.sendFile('static/home.html', {root: __dirname })
})


app.get('/login', function(req, res) {

  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = 'user-read-private user-read-email user-top-read';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});



app.get('/callback', (req, res) => {
  const code = req.query.code || null;

  axios({
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    data: querystring.stringify({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirect_uri
    }),
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${new Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
    },
  })
    .then(response => {
      if (response.status === 200) {
        
        const access_token = response.data.access_token
        const refresh_token = response.data.refresh_token

        //redirect to front end
        //pass along tokens in query params

        const queryParams = querystring.stringify({
          access_token,
          refresh_token
        })

        res.redirect(`http://localhost:8888/home?${queryParams}`)

      } else {
        res.redirect(`/?${querystring.stringify({
          error: 'invalid token'
        })}`);
      }
    })
    .catch(error => {
      res.send(error);
    });
});
  


app.get('/refresh_token', (req, res) => {
  const { refresh_token } = req.query;

  axios({
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    data: querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    }),
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${new Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
    },
  })
    .then(response => {
      res.send(response.data);
    })
    .catch(error => {
      res.send(error);
    });
});




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})