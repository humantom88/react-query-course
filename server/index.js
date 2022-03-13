import http from 'http';
import { postController } from './controllers/post.js';
import { randomController } from './controllers/random.js';
import { timeController } from './controllers/time.js';

const routes = {
  '/api/serverDate': timeController,
  '/api/random': randomController,
  '/api/posts': postController,
};

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.wav': 'audio/wav',
  '.mp4': 'video/mp4',
  '.woff': 'application/font-woff',
  '.ttf': 'application/font-ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'application/font-otf',
  '.wasm': 'application/wasm',
};

http
  .createServer(async function (request, response) {
    if (request.method === 'OPTIONS') {
      sendOptions(response);
      return;
    }

    const [_, controller] = Object.entries(routes).find((route) => {
      const [path] = route;
      return request.url.includes(path);
    });

    try {
      if (controller) {
        sendJSON(response, await controller(request, response));
      } else {
        sendJSON(response, { error: 'No Api Found' });
      }
    } catch(e) {
      response.writeHead(422, getCorsHeaders());
      const buffer = Buffer.from(e.message, 'utf-8');
      response.end(buffer, 'utf-8');
    }

    // console.log('request ', request.url);

    // const filePath = '.' + request.url;
    // if (filePath == './') {
    //   filePath = './index.html';
    // }

    // const extname = String(path.extname(filePath)).toLowerCase();
    // const contentType = mimeTypes[extname] || 'application/octet-stream';

    // fs.readFile(filePath, function (error, content) {
    //   if (error) {
    //     if (error.code == 'ENOENT') {
    //       fs.readFile('./404.html', function (error, content) {
    //         response.writeHead(404, { 'Content-Type': 'text/html' });
    //         response.end(content, 'utf-8');
    //       });
    //     } else {
    //       response.writeHead(500);
    //       response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
    //     }
    //   } else {
    //     response.writeHead(200, { 'Content-Type': contentType });
    //     response.end(content, 'utf-8');
    //   }
    // });
  })
  .listen(8125);

console.log('Server running at http://localhost:8125/');

// utils

function getCorsHeaders () {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Allow-Headers': 'content-type',
    'Access-Control-Max-Age': 2592000,
    'Content-Type': mimeTypes['.json'],
  }
}

function sendJSON(response, data) {
  const content = JSON.stringify(data);
  const buffer = Buffer.from(content, 'utf-8');

  setTimeout(() => {
    response.writeHead(200, getCorsHeaders());
    response.end(buffer, 'utf-8');
  }, 1000);
}

function sendOptions(response) {
  const headers = {};
  // IE8 does not allow domains to be specified, just the *
  // headers["Access-Control-Allow-Origin"] = req.headers.origin;
  headers['Access-Control-Allow-Origin'] = '*';
  headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, DELETE, OPTIONS';
  headers['Access-Control-Allow-Credentials'] = false;
  headers['Access-Control-Max-Age'] = '86400'; // 24 hours
  headers['Access-Control-Allow-Headers'] =
    'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept';
  response.writeHead(200, headers);
  response.end();
}
