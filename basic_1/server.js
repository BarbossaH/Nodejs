console.log('node server');

const os = require('os');
const path = require('path');

//show some information about the current computer operation system,such type ,version,and home directory
// console.log(os.type());
// // console.log(os.version());
// // console.log(os.homedir());

// //show the sever file entire path and filename
// console.log(__dirname); ///Users/huangbo/Desktop/NodeJS/basic_1
// console.log(__filename); ///Users/huangbo/Desktop/NodeJS/basic_1/server.js

// console.log(path.dirname(__filename)); ///Users/huangbo/Desktop/NodeJS/basic_1
// console.log(path.basename(__filename)); //server.js
// console.log(path.extname(__filename)); //.js

// console.log(path.parse(__filename));
// {
//   root: '/',
//   dir: '/Users/huangbo/Desktop/NodeJS/basic_1',
//   base: 'server.js',
//   ext: '.js',
//   name: 'server'
// }

const math = require('./math');
const { add, subtract, divide, multiply } = require('./math');
console.log(math.add(1, 2));

console.log(add(1, 1), subtract(3, 1), divide(4, 2), multiply(2, 1));
