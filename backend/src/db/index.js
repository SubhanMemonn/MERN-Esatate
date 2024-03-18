import mongoose from "mongoose";
import { DB_NAME } from "../constants.js"
const connectDB = async () => {
    try {
        const response = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`Connectes DB!! DB host ${response.connection.host}`);
    } catch (error) {
        console.log(`Error while connected DB ${error}`);
        process.exit(1)
    }
}

export default connectDB