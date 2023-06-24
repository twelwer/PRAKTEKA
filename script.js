const http = require('http');
const fs = require('fs');
const server = http.createServer((request, response) => {
  if (request.url === '/' && request.method === 'GET') {
    fs.readFile('index.html', 'utf8', (error, data) => {
      if (error) {
        response.writeHead(500, { 'Content-Type': 'text/plain' });
        response.end('Server Error');
      } else {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(data);
      }
    });
  } else if (request.url === '/search' && request.method === 'POST') {
    let requestBody = '';
    request.on('data', chunk => {
      requestBody += chunk.toString();
    });
    request.on('end', () => {
      const keyword = JSON.parse(requestBody).keyword;
      const dictionary = {
        'onepiece': ['https://jut.su/oneepiece/', 'https://amedia.online/6-van-pis/episode/237/seriya-onlayn.html'],
        'barber': ['https://britvabarber.ru/', 'https://oldboybarbershop.com/'],
        '12': ['https://chernomorie-bg.com/uploads/posts/12_resized1.jpg', 'https://i.pinimg.com/originals/48/a5/88/48a588fa23f03dc1b59331b59eb5b58a.jpg'],
      };
      const urls = dictionary[keyword] || [];
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(urls));
    });
  } else {
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.end('Not Found');
  }
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});