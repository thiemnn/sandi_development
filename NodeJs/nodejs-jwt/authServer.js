import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const app = express();
const PORT = 5500;

dotenv.config();

let refreshTokens = [];

app.use(express.json());


app.post('/login',(req,res)=>{
    const data = req.body;
    const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '30s'});
    const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '30000s'});
    refreshTokens.push(refreshToken);
    res.json({accessToken, refreshToken});
})

app.post('/refresh',(req,res)=>{
    const refreshToken = req.body.token;
    if(!refreshToken) res.sendStatus(401);
    if(!refreshTokens.includes(refreshToken)) res.sendStatus(403);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) =>{
        console.log(err,data);
        if(err){
            res.sendStatus(403)
        }
        const accessToken = jwt.sign({username: data.username}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '30s'})
        res.json({accessToken})
    })
})

app.listen(PORT,()=>{
    console.log(`Server is runing port ${PORT}`);
});