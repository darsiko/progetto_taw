import env from "./util/validateEnv";
import mongoose from "mongoose";

const port = env.PORT;

mongoose.connect('mongodb://mongo:27017/mydatabase').then(() => {
    console.log("Mongoose connected");
}).catch(console.error);

