import "dotenv/config";
import express from "express";
import morgan from "morgan";
import session from "express-session";
import env from "./util/validateEnv";
import MongoStore from "connect-mongo";
import createHttpError, {isHttpError} from "http-errors";
import userRoutes from "./routes/users";
import bookRoutes from "./routes/books";
import {requiredAuth} from "./middleware/auth";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use(session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000,
    },
    rolling: true,
    store: MongoStore.create({
        mongoUrl: env.MONGO_CONNECTION_STRING
    }),
}));

app.use("/api/users", userRoutes);

app.use("/api/books", requiredAuth, bookRoutes);

app.use((req, res, next)=>{
    next(createHttpError(404, "Endpoint not found"));
});

/*app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "An unknown error occurred";
    let statusCode = 500;
    if(isHttpError(error)){
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({error: errorMessage});
});*/

export default app;
