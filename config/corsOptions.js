const allowedOrigins = require('./allowedOrigins');

const corsOptions = {
    origin: (origin, callback) =>{
        console.log(
            allowedOrigins.includes(),
            origin, 
            "allowedOrigins"
        )
        if(allowedOrigins.indexof(origin) !== -1 || origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions;