import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json());

const books = [
    {
        id: 1,
        name: 'chi pheo',
        author: 'abc'
    },
    {
        id: 2,
        name: 'chien tranh',
        author: 'abc'
    }
]

function authenToken(req, res, next){
    const authoizationHeader = req.headers['authorization'];
    const token = authoizationHeader.split(' ')[1];
    if(!token) res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) =>{
        console.log(err,data);
        if(err){
            res.sendStatus(403)
        }
        next();
    })
}

app.get('/books', authenToken, (req,res) => {
    res.json({status: "Success", data: books});
});

app.get('/books2', (req,res) => {
    res.json({status: "Success", data: books});
});

app.listen(PORT,()=>{
    console.log(`Server is runing port ${PORT}`);
});