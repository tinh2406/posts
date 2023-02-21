const mongoose = require('mongoose')
const config = require('config')
const db = config.get('mongoURI')

const ConnectDB = async ()=>{
    try {
        await mongoose.connect(db,{
            // useCreateIndex:true,
            useNewUrlParser:true,
            useUnifiedTopology:true,
            // useFindAndModify:true
        })
        console.log("Connect to DB successfully")
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}
module.exports = ConnectDB