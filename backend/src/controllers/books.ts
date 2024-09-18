import { RequestHandler } from "express";
import BookModel from "../models/book";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { assertIsDefined } from "../util/assertIsDefined";


export const getBooks: RequestHandler = async (req, res, next) => {
    const authenticatedUserId = req.session.userId;
    try{
        assertIsDefined(authenticatedUserId);assertIsDefined(authenticatedUserId);
        const books = await BookModel.find({userId: authenticatedUserId}).exec();
        res.status(200).json(books);
    }catch(error){
        next(error);
    }
};

export const getBook: RequestHandler = async (req, res, next) => {
    const bookId = req.params.bookId;
    const authenticatedUserId = req.session.userId;
    try{
        assertIsDefined(authenticatedUserId);
        if(!mongoose.isValidObjectId(bookId)){
            throw createHttpError(400,"Invalid bookId");
        }
        const book = await BookModel.findById(bookId).exec();
        if(!book){
            throw createHttpError(404, "Book not found");
        }
        if(!book.userId.equals(authenticatedUserId)){
            throw createHttpError(401, "Unauthorized to access this book");
        }
        res.status(200).json(book);
    }catch(error){
        next(error);
    }
};

interface CreateBookBody{
    title?: string,
    course?: string,
    university?: string,
    price?: number,
}

export const createBook: RequestHandler<unknown, unknown, CreateBookBody, unknown> = async (req,res,next) =>{
    const authenticatedUserId = req.session.userId;
    const title = req.body.title;
    const course = req.body.course;
    const university = req.body.university;
    const price = req.body.price;
    try{
        assertIsDefined(authenticatedUserId);
        if(!title || !course || !university || !price || !price){
            throw createHttpError(400, "Invalid input");
        }
        const newBook = await BookModel.create({
            userId: authenticatedUserId,
            title: title,
            course: course,
            university: university,
            price: price,
        });
        res.status(200).json(newBook);
    }catch(error){
        next(error);
    }
};

interface UpdateBookParams{
    bookId:string,
}

interface UpdateBookBody{
    title?: string,
    course?: string,
    university?: string,
    price?: number,
}

export const updateBook: RequestHandler<UpdateBookParams, unknown, UpdateBookBody, unknown> = async (req,res,next) =>{
    const authenticatedUserId = req.session.userId;
    const newTitle = req.body.title;
    const newCourse = req.body.course;
    const newUniversity = req.body.university;
    const newPrice = req.body.price;
    const bookId = req.params.bookId;
    try{
        assertIsDefined(authenticatedUserId);
        if(!mongoose.isValidObjectId(bookId)){
            throw createHttpError(400,"Invalid bookId");
        }
        if(!newTitle){
            throw createHttpError(400, "Book must have a title");
        }
        if(!newCourse){
            throw createHttpError(400, "Book must have a course");
        }
        if(!newUniversity){
            throw createHttpError(400, "Book must have a university");
        }
        if(!newPrice){
            throw createHttpError(400, "Book must have a price");
        }
        const book = await BookModel.findById(bookId).exec();
        if(!book){
            throw createHttpError(404, "Book not found");
        }
        if(!book.userId.equals(authenticatedUserId)){
            throw createHttpError(401, "Unauthorized to access this book");
        }
        book.title = newTitle;
        book.course = newCourse;
        book.university = newUniversity;
        book.price = newPrice;
        const updatedBook = await book.save();
        res.status(200).json(updatedBook);
    }catch(error){
        next(error);
    }
};

export const deleteBook: RequestHandler = async (req, res, next) => {
    const bookId = req.params.bookId;
    const authenticatedUserId = req.session.userId;
    try {
        assertIsDefined(authenticatedUserId);
        if (!mongoose.isValidObjectId(bookId)) {
            throw createHttpError(400, "Invalid book id");
        }
        const book = await BookModel.findById(bookId).exec();
        if (!book) {
            throw createHttpError(404, "Note not found");
        }
        if (!book.userId.equals(authenticatedUserId)) {
            throw createHttpError(401, "You cannot access this note");
        }
        await book.deleteOne();
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};