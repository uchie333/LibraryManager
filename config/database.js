const mongoose = require("mongoose")

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.mongodb)
        console.log("mongo Db is connected")
    }
    catch(error)
    {
        console.error(error);
        process.exit(1);
    }
}