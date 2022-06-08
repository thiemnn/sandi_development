const express = require('express');
const http = require('http');
const cors = require('cors');

//setup app & its routes
const app = express();
app.use(cors());//allow ther cors can call from other domain
app.use(express.json());
const routes = require('./routes/index.route');
app.use(routes);

//start http server
const httpServer = http.createServer(app);
httpServer.listen(9001);
console.log(`http server listening at port ${9001}`);

module.exports = { app };