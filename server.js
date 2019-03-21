const express = require('express');
const helmet = require('helmet');

const userRoute = require('./routers/user-route');
const postRoute = require('./routers/post-route');

const server = express();

// middleware

function upper(req, res, next) {
    if (req.body.name) {
      req.body.name = req.body.name.toUpperCase();
    }
    next();
  }


server.use(express.json());
server.use(upper);

server.use(helmet());


// routing
server.use('/api/user', userRoute);
server.use('/api/posts', postRoute);


server.get('/', (req, res) => {
    res.send({greeting: process.env.GREETING});
  });
  

module.exports = server;






