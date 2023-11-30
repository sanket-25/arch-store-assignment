const http = require('http');

const port = 3000;

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/') {
    let data = '';

    req.on('data', (chunk) => {
      data += chunk;
    });

    req.on('end', () => {
      try {
        const payload = JSON.parse(data);
        if (!payload || !payload.str) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid payload' }));
        } else {
          const receivedString = payload.str;
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Received the string successfully', receivedString }));
        }
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal server error' }));
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Route not found' }));
  }
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


// Method POST in the body
/*
{
    "str": ""
}
output -> 
Status: 400 Bad Request
Invalid Payload


{
    "str": "something something"
}
output -> 
Status: 200 Ok
Recieved the string successfully
*/