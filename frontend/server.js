const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 5173;

const server = http.createServer((req, res) => {
  // Serve index.html and static files from the dist directory
  const filePath = req.url === '/' ? '/index.html' : req.url;
  const file = path.resolve(__dirname, 'dist', filePath.substring(1));

  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404);
      return res.end('File not found');
    }

    // Set the appropriate MIME type based on the file extension
    let mimeType = 'text/html';
    if (file.endsWith('.js')) {
      mimeType = 'application/javascript';
    } else if (file.endsWith('.css')) {
      mimeType = 'text/css';
    }

    // Set the Content-Type header
    res.writeHead(200, { 'Content-Type': mimeType });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
