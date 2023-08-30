const mongoose = require('mongoose')

async function dbConnect(uri) {
    try {
        const conn = await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(conn)
    } catch (error) {
        console.log(error)
    }
    
}

module.exports = dbConnect