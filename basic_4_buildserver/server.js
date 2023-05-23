const http = require('http');

const logEvents = require('./logEvent');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

//this is a class
const EventEmitter = require('events');
//customize the new emitter to create custom events like 'log'
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

const serveFile = async (filePath, contentType, response) => {
  try {
    const rawData = await fsPromises.readFile(
      filePath,
      !contentType.includes('image') ? 'utf8' : '' //based on the below contentType categories,if the category is related to text, or css or js, than read it as 'utf8' format, otherwise, using the raw data like png format
    );
    //if the type is json format, it should turn to json format. if the type is css or txt, just ust txt format
    const data =
      contentType === 'application/json' ? JSON.parse(rawData) : rawData;

    response.writeHead(filePath.includes('404.html') ? 404 : 200, {
      'Content-Type': contentType,
    });
    // response.end(data); //I wonder why use Json.parse and stringify, prepare for the future operation to the data
    response.end(
      contentType === 'application/json' ? JSON.stringify(data) : data
    );
  } catch (error) {
    console.log(error);
    myEmitter.emit('log', `${error.name}\t${error.message}\n`, 'errLog.txt');
    response.statusCode = 500;
    response.end();
  }
};

const PORT = process.env.PORT || 3500;
//create the server and set up the callback
const server = http.createServer((req, res) => {
  // console.log(req.url, req.method);
  myEmitter.emit('log', `${req.url}\t${req.method}`, 'reqLog.txt');

  // let filePath;
  // if (req.url === '/' || req.url === 'index.html') {
  //   res.statusCode = 200;
  //   res.setHeader('Content-Type', 'text/html');
  //   filePath = path.join(__dirname, 'view', 'index.html');
  //   // fsPromises
  //   //   .readFile(filePath, 'utf-8')
  //   //   .then((data) => res.end(data))
  //   //   .catch((err) => {
  //   //     console.error(err);
  //   //   });
  //   fs.readFile(filePath, 'utf8', (err, data) => {
  //     res.end(data);
  //   });
  // }

  //based on the extension of files to ensure which content type is
  const extension = path.extname(req.url);

  let contentType;

  switch (extension) {
    case '.css':
      contentType = 'text/css';
      break;
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.jpg':
      contentType = 'image/jpeg';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.txt':
      contentType = 'text/plain';
      break;
    default:
      contentType = 'text/html';
  }
  console.log(contentType === 'text/html', req.url.slice(-1) === '/');

  let filePath =
    //if the url is just the basic url like local host/, filepath will be index.html
    contentType === 'text/html' && req.url === '/'
      ? path.join(__dirname, 'views', 'index.html')
      : //to get the subdirectory index.html file, if user input the subdirectory and end up with /(last character)
      contentType === 'text/html' && req.url.slice(-1) === '/'
      ? path.join(__dirname, 'views', req.url, 'index.html')
      : contentType === 'text/html'
      ? //request other html files, but maybe there is no extension of html, for instance localhost/test
        path.join(__dirname, 'views', req.url)
      : //if user request files are other types such as jpg,css and so on
        path.join(__dirname, req.url);
  //in fact, users always don't need to input html at the end of addresses, but here we need to make it work still
  //if the last character is /, which means it's a directory name
  console.log(filePath);
  if (!extension && req.url.slice(-1) !== '/') filePath += '.html';

  //finally, we need to check if the file exists
  const fileExists = fs.existsSync(filePath);

  if (fileExists) {
    //server the file, do the response
    serveFile(filePath, contentType, res);
  } else {
    //could be 404 and 301(redirect)
    // console.log(path.parse(filePath));
    //  {
    //   root: '/',
    //   dir: '/Users/huangbo/Desktop/NodeJS/basic_4_buildserver/views',
    //   base: 'index1.html',
    //   ext: '.html',
    //   name: 'index1'
    // }
    switch (path.parse(filePath).base) {
      case 'old.html':
        res.writeHead(301, { Location: '/new-page.html' });
        res.end();
        break;
      case 'www-page.html':
        res.writeHead(301, { Location: '/' });
        res.end();
        break;
      default:
        // serve a 404 res
        serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res);
    }
  }
});

//listen for the event log,将这个放在服务器启动之前代表服务器启动后，已经设置好了对log的监听，服务器启动之前做好一切配置
myEmitter.on('log', (msg, fileName) => logEvents(msg, fileName));
//start the server and make a listen for incoming network connections on a specified port
server.listen(PORT, () => console.log('Server running on ' + `${PORT}`));
