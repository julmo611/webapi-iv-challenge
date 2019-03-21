require('dotenv').config();
const server = require('./server.js');


const port = process.env.PORT || 6000;
const greeting = process.env.GREETING;

server.listen(port, () => {
  console.log(`\n*** ${greeting} http://localhost:${port} ***\n`);
});