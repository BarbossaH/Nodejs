const fs = require('fs');
//if we need to deal with big data file, we'd better use createReadStream and createWriteStream to enhance the executing efficiency
const rs = fs.createReadStream('./files/fakebigdata.txt', { encoding: 'utf8' });

//just create the file, but won't write anything in this new file
const ws = fs.createWriteStream('./files/newfakebigdata.txt');

//对流事件的监听，the first parameter data means if there are some data event, it will call the callback function. here, it will execute ws.write(dataChunk) to newfakebigdata.txt

//by this way, the coded can customize the content of callback function, but if we don't need to do it, just use pipe, it will be more efficient.
// rs.on('data', (dataChunk) => {
//   ws.write(dataChunk);
// });
rs.pipe(ws);
