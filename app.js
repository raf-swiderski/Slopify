require('dotenv').config()

// let loginButton = document.getElementById('#login')


var client_id = process.env.CLIENT_ID;
var client_secret = process.env.CLIENT_SECRET;
var redirect_uri = process.env.REDIRECT_URI;

// var client_id = 'e37b4d50f18f45c78df9c4b5bf5ef2ff';
// var client_secret = '1ab664dea8264fa7bfec2062960a5f02';
// var redirect_uri = 'http://localhost:8888/callback';

const AUTHORIZE = "https://accounts.spotify.com/authorize"


function requestAuth() {
  localStorage.setItem('client_id', client_id);
  localStorage.setItem('client_secret', client_secret);

  let url = AUTHORIZE;
  url += "?client_id=" + client_id;
  url += "&response_type=code";
  url += "&redirect_uri=" + encodeURI(redirect_uri);
  url += "&show_dialogue=true";
  url += "&scope=user-read-private user-read-email"

  window.location.href = url; // show spotify's auth screen
}

