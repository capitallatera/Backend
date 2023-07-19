const mongoose = require('mongoose');

const URI = "mongodb+srv://sarvesh:tc6colsnujubdbzi@cluster0.8clonjl.mongodb.net/"
const connectDB =  async () => {
    try{
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology:true
        });
    } catch (err) {
        console.error(err);
    }
}

module.exports = connectDB;