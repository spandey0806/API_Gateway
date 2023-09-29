const express = require('express');
const morgan = require('morgan');
const { createProxyMiddleware } = require ('http-proxy-middleware');
const rateLimit = require('express-rate-limit');

const app = express();

const PORT = 3005;


const limiter =rateLimit({
    windowMs: 2 * 60 * 1000,  // 2 minutes
    max:5,                   // Limit each IP to 5 requests per `window` (per 2 minutes)
                       // allow maximum 5 requests coming from an IP address in 2 minutes
});

app.use(morgan('combined'));

app .use (limiter);

app.use('/bookingservice', createProxyMiddleware({ target: 'http://localhost:3002/', changeOrigin: true }));
 

app.get('/home',(req,res)=>{
     return res.json({message : 'Ok'})
});

app.listen(PORT,()=>{
    console.log(`Server started at PORT ${PORT}`);
});
