require('dotenv').config();
const express = require('express');
const ngrok = require('ngrok');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions.js');
const { logger } = require('./middleware/logEvents.js');
const errorHandler = require('./middleware/errorHandler.js');
const verifyJWT = require('./middleware/verifyJWT.js');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials.js');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn.js');
const PORT = process.env.PORT || 5001
const root = require('./routes/root.js')
const employees = require('./routes/api/employees.js')
const ngrokOptions = {
    addr: 5001,
    authtoken: process.env.NGROK_TOKEN,
}


connectDB();
app.use(logger);
app.use(credentials);
app.use(cors());
// app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use('/', express.static(path.join(__dirname, './public')))

// Routes
app.use('/', root);
app.use('/employee', employees)

app.all("*", (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found")
    }
})

app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    (async function () {
        const url = await ngrok.connect(ngrokOptions);
        console.log('Live : ', url)
    })();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));