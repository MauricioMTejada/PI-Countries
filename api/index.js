//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');

//todo <Original>

// Syncing all the models at once.
const port = process.env.PORT || 3002;

conn.sync({ force: false }).then(() => {
  server.listen(port, () => {
    console.log(`Listen on port ${port}`); // eslint-disable-line no-console
  });
});

//todo <Para prueba de servidor>
/* const PORT = 3002;

server.listen(PORT, ()=> {
  conn.sync();
  console.log(`Listen on port ${PORT}`);
}); */
