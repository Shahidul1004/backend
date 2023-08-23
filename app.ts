import express from 'express';
import bodyParser from 'body-parser'
require("dotenv").config();

const app: express.Application = express();

 

app.get('/', (req, res) => {
    res.status(200).json({ message: 'all ok!'})
});
 

app.listen(5000, () => {
    console.log('server started');
});
