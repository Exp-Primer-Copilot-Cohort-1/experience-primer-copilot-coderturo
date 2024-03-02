// Create web server
const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

const comments = {
  '1': 'This is comment 1',
  '2': 'This is comment 2',
  '3': 'This is comment 3',
  '4': 'This is comment 4',
  '5': 'This is comment 5',
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;
  const id = pathname.slice(1);
  if (pathname === '/') {
    fs.createReadStream(path.join(__dirname, 'index.html')).pipe(res);
  } else if (pathname === '/comments') {
    res.end(JSON.stringify(comments));
  } else if (pathname === '/comment') {
    if (req.method === 'GET') {
      res.end(comments[id] || 'Not found');
    } else if (req.method === 'POST') {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
      });
      req.on('end', () => {
        comments[id] = body;
        res.end('OK');
      });
    }
  } else {
    res.statusCode = 404;
    res.end('Not found');
  }
});

server.listen(3000);
```

###



