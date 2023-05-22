// const { format } = require('date-fns');

// const { v4: uuid } = require('uuid');

// // const uuid = require('uuid');

// console.log(format(new Date(), 'yyyyMMdd\tHH:mm:ss'));

// console.log('ho');
// console.log(uuid());

/**
 * create custom event class and listen to the custom 'log' event,and use setTimeout to imitate the asynchronous
 * function
 */
const logEvents = require('./logEvents');

const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.on('log', (msg) => logEvents(msg));

setTimeout(() => {
  myEmitter.emit('log', 'log event emitted');
}, 2000);
