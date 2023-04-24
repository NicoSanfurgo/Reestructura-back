const { MONGODBURL } = require('./config');
const { mongoose } = require('mongoose');

mongoose.set("strictQuery", false);
mongoose.connect(MONGODBURL, (err) => {
    if (err){
        console.log('error:' + err);
    } else {
        console.log('conectado a mongoDB')
    }
});

module.exports = mongoose