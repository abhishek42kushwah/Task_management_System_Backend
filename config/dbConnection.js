const mongoose = require("mongoose")
const MONGOOSE_URL = "mongodb://localhost:27017/task"
// "mongodb+srv://abhishek1:n6PW8SKW2ZdQ2Uu9@cluster0.jpxnawv.mongodb.net/task"

require("dotenv").config()

exports.connect = async() => {
    mongoose.connect(MONGOOSE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(
            console.log("Db Connection SuccessFully"),
            
        ).catch((err) => {
            console.log("Db connection failed ", err);
            process.exit(1)
        })
}

