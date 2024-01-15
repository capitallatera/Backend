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
const upload = require('./routes/api/upload.js');
const vegetables = require('./routes/api/vegetables.js');
const inventory = require('./routes/api/inventory.js');
var LocalStorage = require('node-localstorage').LocalStorage;
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
app.use('/files', express.static(path.join(__dirname, './public/images')))


// Routes
app.use('/', root);
app.use('/employee', employees)
app.use('/upload', upload)
app.use('/vegetable', vegetables)
app.use('/inventory', inventory)

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

if (typeof localStorage === "undefined" || localStorage === null) {
    localStorage = new LocalStorage('./scratch');
  }

let LIVELINK;
if(process.env.LIVE == 'true'){
    mongoose.connection.once('open', () => {
        console.log('Connected to MongoDB');
        (async function () {
            const url = await ngrok.connect(ngrokOptions);
            console.log('Live : ', url)
            localStorage.setItem('STORELINK', `${url}`);
        })();
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
} else {
    localStorage.setItem('STORELINK', `http://localhost:${process.env.PORT}`);
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}


// ACCESS_TOKEN_SECRET = 8c5177a73d25109559d47c4ac5c756b12eedaced358720bc81c8825cd11b691f9677c6bd30d9f7f75d5545f8486cdb4255254dfa520299ea6d651a424869e72d
// REFRESH_TOKEN_SECRET = 8382c517eb4eecab30df216c64c28e19fa48e13c611392075863838c83f18283aaf90b12008494ab67399838181f7d4faa1e676264bf2cb10a33b2d0ca0b776f
// # DATABASE_URI = mongodb+srv://sarvesh:tc6colsnujubdbzi@cluster0.8clonjl.mongodb.net/
// DATABASE_URI = mongodb+srv://capitallatera:kKxC5fDqpobUX1f8@cluster0.lqxm8ow.mongodb.net/
// NGROK_TOKEN = 2SkKwVSz2pBG6TObg7DXvkcB125_54KtcjDzRcG1wQFPSWtNa
// PORT= 5001
