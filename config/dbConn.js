const mongoose = require('mongoose');

// const URI = "mongodb+srv://sarvesh:tc6colsnujubdbzi@cluster0.8clonjl.mongodb.net/"
// const URI = "mongodb+srv://capitallatera:kKxC5fDqpobUX1f8@cluster0.lqxm8ow.mongodb.net/"
const URI = "mongodb+srv://capitallaterA:Anil@178@cluster0.skbanci.mongodb.net/"

const connectDB =  async () => {
    try{
        await mongoose.connect(process.env.DATABASE_URI, {
            useNewUrlParser: true,
            useUnifiedTopology:true
        });
    } catch (err) {
        console.error(err);
    }
}

module.exports = connectDB;