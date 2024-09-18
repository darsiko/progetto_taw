import { InferSchemaType, model, Schema } from "mongoose";

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true, select: false},
    password: {type: String, required: true, unique: true, select: false},
    address: {type: String, required: true, unique: false, select: false},
    role:  {type: String, required:true, enum: ["student", "moderator"]},
});

type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema);