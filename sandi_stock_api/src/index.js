const express = require('express');
const http = require('http');
const cors = require('cors');
const jwt = require("jsonwebtoken");

//setup app & its routes
const app = express();
app.use(cors());//allow ther cors can call from other domain
app.use(express.json());
const routes = require('./routes/index.route');
app.use(routes);

let refreshTokens = [];
app.post('/login',(req,res)=>{
    const data = req.body;
    const accessToken = jwt.sign(data, 'abcde12345', {expiresIn: '30s'});
    const refreshToken = jwt.sign(data, 'abcde12345', {expiresIn: '30000s'});
    refreshTokens.push(refreshToken);
    res.json({accessToken, refreshToken});
})
app.post('/refresh',(req,res)=>{
    const refreshToken = req.body.token;
    if(!refreshToken) res.sendStatus(401);
    if(!refreshTokens.includes(refreshToken)) res.sendStatus(403);
    jwt.verify(refreshToken, 'abcde12345', (err, data) =>{
        if(err){
            res.sendStatus(403)
        }
        const accessToken = jwt.sign(data, 'abcde12345', {expiresIn: '30s'})
        res.json({accessToken})
    })
})

//start http server
const httpServer = http.createServer(app);
httpServer.listen(9000);
console.log(`http server listening at port ${9000}`);

module.exports = { app };