const fs = require('fs');

//this is an async function
// fs.readFile('./files/test.txt', (err, data) => {
//   if (err) throw err;
//   // console.log(data);
//   //<Buffer 74 68 69 73 20 69 73 20 6a 75 73 74 20 66 6f 72 20 74 68 65 20 74 65 73 74 2e 20 6e 6f 74 68 69 6e 67 20 65 6c 73 65 2e>
//   console.log(data.toString()); //this is just for the test. nothing else.
// });

// fs.readFile('./files/test1.txt', 'utf8', (err, data) => {
//   if (err) throw err;
//   console.log(data); //I just use utf8 to show myself, can you see me.
// });

const path = require('path');
// fs.readFile(path.join(__dirname, 'files', 'test1.txt'), 'utf8', (err, data) => {
//   if (err) throw err;
//   console.log(data); //I just use utf8 to show myself, can you see me.
// });

// fs.writeFile(
//   path.join(__dirname, 'files', 'test2.txt'),
//   'Can I succeed to write into the file?',
//   (err) => {
//     if (err) throw err;

//     //callback hell
//     fs.appendFile(
//       path.join(__dirname, 'files', 'test2.txt'),
//       '\n\n I was appended by the appendFile function in write file function',
//       (err) => {
//         if (err) throw err;
//         fs.rename(
//           path.join(__dirname, 'files', 'test2.txt'),
//           path.join(__dirname, 'files', 'renamedfile.txt'),
//           (err) => {
//             if (err) throw err;
//             console.log('rename finished');
//           }
//         );
//         console.log('Append complete');
//       }
//     );
//     console.log('Finished');
//   }
// );

//fsPromise is better than fs because promise can offer some more convenient way to write async programming
const fsPromise = require('fs').promises;
const fileOperation = async () => {
  try {
    const data = await fsPromise.readFile(
      path.join(__dirname, 'files', 'test.txt'),
      'utf8'
    );
    console.log(data);
    //delete the test1.txt file
    await fsPromise.unlink(path.join(__dirname, 'files', 'test1.txt'));
    await fsPromise.writeFile(
      path.join(__dirname, 'files', 'promiseWrite.txt'),
      data
    );
    await fsPromise.appendFile(
      path.join(__dirname, 'files', 'promiseWrite.txt'),
      '\n\n I just hope there is always hope'
    );
    await fsPromise.rename(
      path.join(__dirname, 'files', 'promiseWrite.txt'),
      path.join(__dirname, 'files', 'promiseRename.txt')
    );
    const newData = await fsPromise.readFile(
      path.join(__dirname, 'files', 'promiseRename.txt'),
      'utf8'
    );
    console.log(newData);
  } catch (error) {
    console.error(error);
  }
};

fileOperation();

//if run server times server.js, the test2.txt just will be executed once. no matter how many time to run the server.js
// fs.appendFile(
//   path.join(__dirname, 'files', 'test2.txt'),
//   '\n\n I was appended by the appendFile function',
//   (err) => {
//     if (err) throw err;
//     console.log('Append complete');
//   }
// );

// console.log('I will be processed first');
//当未捕获的异常在 Node.js 应用程序中发生时，可以使用 process.on('uncaughtException', ...) 方法来捕获并处理这些异常。
process.on('uncaughtException', (err) => {
  console.error(`There was an uncaught error:, ${err}`);
  process.exit(1);
});
