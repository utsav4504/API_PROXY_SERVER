const express=require('express')
const cors=require('cors')
const rateLimit=require('express-rate-limit')
const apicache = require('apicache');
require('dotenv').config()
const PORT=process.env.PORT || 5002
const app=express()
let cache = apicache.middleware;
//Rate Limit
const limiter=rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 5 * 60 * 1000, // Default 5 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX) || 5, // Default 5 requests
    message: 'Too many requests, please try again later.',
})
app.use(cors());
app.set('trust proxy',1)
//Routes
app.use('/api',limiter)
//enable cors


// proxy route
app.use('/api', cache(process.env.CACHE_DURATION || '5 minutes'), require('./routes')); // Use caching
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});