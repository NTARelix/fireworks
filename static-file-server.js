const { readFile } = require('fs')
const { createServer } = require('http')

const server = createServer((req, res) => {
  readFile(__dirname + req.url, (err, data) => {
    if (err) {
      res.writeHead(404)
      res.end(JSON.stringify(err))
      return
    }
    const contentType = req.url.endsWith('.html')
      ? 'text/html'
      : req.url.endsWith('.js')
      ? 'text/javascript'
      : 'application/octet-stream'
    res.writeHead(200, { 'Content-Type': contentType })
    res.end(data)
  })
})

server.listen(8080, () => {
  console.log('Serving at http://localhost:8080/index.html')
})
