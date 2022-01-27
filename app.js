const express = require('express')
const app = express()
const port = 3000


var details = {
    auth_token: 'poop'
}

app.get('/', (req, res) => {
  res.send(details)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})