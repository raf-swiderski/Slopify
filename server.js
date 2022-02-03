// Server Stuff
const http = require('http')
const fs = require('fs')
const port = 8888

const server = http.createServer(function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' })
  fs.readFile('index.html', function(error, data) {
    if (error) {
      res.writeHead(404)
      res.write('Error: File Not Found')
    } else {
      res.write(data)
    }
    res.end()
  })
})

server.listen(port, function(error) {
  if (error) {
    console.log("Tim Cook grunts disapprovingly before turning away due to the following error", error)
  } else {
    console.log("Tim Cook grunts in approval. Your server is listening on port " + port)
  }
})