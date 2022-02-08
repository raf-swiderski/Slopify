
const urlSearchParams = new URLSearchParams(window.location.search);
const tokens = Object.fromEntries(urlSearchParams.entries());
const access_token = tokens.access_token
const refresh_token = tokens.refresh_token

console.log(access_token)
console.log(refresh_token)