import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";
import bcrypt from "bcrypt";

export const getAuthenticatedUser: RequestHandler = async (req,res, next) =>{
    try{
        const user = await UserModel.findById(req.session.userId).select("+email").exec();
        res.status(200).json(user);
    }catch(error){
        next(error);
    }
}

interface SignUpBody {
    username?: string,
    email?: string,
    password: string,
    address?: string,
    role?: string,
}

export const signUp: RequestHandler<unknown, unknown, SignUpBody, unknown> = async (req,res,next) =>{
    const username = req.body.username;
    const email = req.body.email;
    const passwordRaw = req.body.password;
    const address = req.body.address;
    try{
        if(!username || !email || !passwordRaw || !address){
            throw createHttpError(400, "All fields are required");
        }

        const existingUsername = await UserModel.findOne({username: username}).exec();

        if(existingUsername){
            throw createHttpError(409, "Username already exists");
        }

        const existingEamil = await UserModel.findOne({email: email}).exec();

        if(existingEamil){
            throw createHttpError(409, "Email already exists");
        }

        const passwordHashed = await bcrypt.hash(passwordRaw, 10);

        const newUser = await UserModel.create({
            username: username,
            email: email,
            password: passwordHashed,
            address: address,
            role: "student",
        });

        req.session.userId = newUser._id;

        res.status(201).json(newUser);

    }catch(error){
        next(error);
    }
};

interface LoginBody{
    username?: string,
    password?: string,
}

export const login: RequestHandler<unknown, unknown, LoginBody, unknown> = async (req, res, next) =>{
    const username = req.body.username;
    const password = req.body.password;
    try{
        if(!username ||!password){
            throw createHttpError(400, "Username and password are required");
        }

        const user = await UserModel.findOne({username: username}).select("+password +email").exec();

        if(!user){
            throw createHttpError(401, "Invalid credentials");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if(!passwordMatch){
            throw createHttpError(401, "Invalid credentials");
        }

        req.session.userId = user._id;

        res.status(201).json(user);

    }catch(error){
        next(error);
    }
};

export const logout: RequestHandler = (req, res, next) =>{
    req.session.destroy(error =>{
        if(error){
            next(error);
        }else{
            res.sendStatus(200);
        }
    })
};