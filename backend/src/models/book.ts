import { InferSchemaType, model, Schema } from "mongoose";

const bookSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, required: true },
    title: {type: String, required: true},
    course: {type: String, required: true, unique: false, select: false},
    university: {type: String, required: true, unique: false, select: false},
    price: {type: Number, required: true, unique: false, select: false},
});

type Book = InferSchemaType<typeof bookSchema>;

export default model<Book>("Book", bookSchema);