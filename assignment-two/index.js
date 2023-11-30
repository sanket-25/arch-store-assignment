const http = require('http');
const PORT = 3000;

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/') {
    let data = '';

    req.on('data', (chunk) => {
      data += chunk;
    });

    req.on('end', () => {
      try {
        const payload = JSON.parse(data);
        if (payload && payload.str) {
          const wordCount = (payload.str.match(/\S+/g) || []).length;

          if (wordCount >= 8) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'At least 8 words found' }));
          } else {
            res.writeHead(406, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Not enough words (less than 8)' }));
          }
        } else {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid payload format' }));
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

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});



// Method POST in the body
/*
{
    "str": "one two three four five"
}
output ->
status: 406 not acceptable
{
  "error": "Not enough words (less than 8)"
}


{
    "str": "one two three four five six seven eight nine ten"
}
output -> 
status: 200 OK
{
  "message": "At least 8 words found"
}
*/