// 3) Return 200 OK if at least 8 words 

const http = require('http');

const port = 3000;
const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/") {
    let data = "";

    req.on("data", (chunk) => {
      data += chunk;
    });

    req.on("end", () => {
      try {
        const payload = JSON.parse(data);
        if (!payload || !payload.str) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ "error": "Invalid payload" }));
        } else {
          const receivedString = payload.str;

          // Regex to match words (assuming a word is a sequence of characters separated by spaces)
          const wordCount = (receivedString.match(/\S+/g) || []).length;

          if (wordCount >= 8) {
            // At least 8 words found
            console.log("Received String contains at least 8 words:", receivedString);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ "message": "Received the string with at least 8 words", "receivedString": receivedString }));
          } else {
            // Less than 8 words found
            console.log("Received String contains less than 8 words:", receivedString);
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ "error": "Received string must contain at least 8 words" }));
          }
        }
      } catch (error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ "error": "Internal server error" }));
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ "error": "Route not found" }));
  }
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



// Method POST in the body
/*
{
    "str": "one two three four five"
}
output -> 
Status: 400 Bad Request
Received String contains less than 8 words: ${recievedSt}


{
    "str": "one two three four five six seven eight nine ten"
}
output -> 
Status: 200 Ok
Received String contains at least 8 words: ${recievedString}
*/
