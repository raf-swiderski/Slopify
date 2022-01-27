const express = require('express')
require('dotenv').config()

const app = express()
const port = 3000

var client_id = process.env.CLIENT_ID;
var client_secret = process.env.CLIENT_SECRET;
var redirect_uri = process.env.REDIRECT_URI;



var details = {
    auth_token: 'poop'
}

app.get('/', (req, res) => {
  res.send(details)
})


app.get('/login', function(req, res) {

  var state = generateRandomString(16);
  var scope = 'user-read-private user-read-email';

  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})