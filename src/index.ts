import * as dotenv from "dotenv"
dotenv.config();

import "reflect-metadata";
import * as Redis from "ioredis";
import {GraphQLServer} from "graphql-yoga";
import * as bodyParser from "body-parser";
import {mySchema} from "./schema";
import * as passport from "passport";
import {passportInit} from "./auth/passport-config";
import flash = require("express-flash");
import {Request, Response} from "express";
import {CustomError} from "./entity/Error";
import {passwordRegEx, emailRegEx} from "./utils/regEx";
import {
    documentStore,
    USER_COMFIRM_PASSWORD,
    USER_DOES_NOT_EXIST,
    USER_EMAIL_INVALID,
    USER_ERROR,
    USER_EXIST,
    USER_PASSWORD_REQUIREMENTS,
} from "./constants";
import {issueJwt} from "./utils/jwtHandler";
import cookieParser = require("cookie-parser");
import {User} from "./entity/user/User";
import * as bcrypt from "bcrypt";
import * as path from "path";
passportInit(passport);

const cors = {
    credentials: true,
    origin: true //front end server
}

export const startServer = async () => {
    documentStore.initialize()
    const session = documentStore.openSession();
    const redis = new Redis();

    const server = new GraphQLServer({
        schema: mySchema,
        context: ({request}) => ({
            redis,
            url: request.protocol + "://" + request.get("host"),
            session: request.session,
            req: request,
            headers: request.headers,
        })
    });

    server.express.use(bodyParser.json())
    server.express.use(bodyParser.urlencoded({ extended: false }));
    server.express.use(flash());
    server.express.use(passport.initialize());
    server.express.use(passport.session());
    server.express.use(cookieParser());

    server.express.post('/login', async(req: Request, res: Response, next) =>{
        if(!emailRegEx.test(req.body.email)){
            res.send(new CustomError(USER_ERROR, USER_EMAIL_INVALID));
        }
        const user = await User.findUserByEmail(req.body.email);
        if(!user){
            res.status(401).json(new CustomError(USER_ERROR, USER_DOES_NOT_EXIST))
        }
        const jwt = issueJwt(user);
        res.cookie('token', jwt.token, { httpOnly: false });
        res.header( "Access-Control-Allow-Origin" );
        res.send({
            id: user.id,
            email: user.email,
            confirmed: user.confirmed,
        })

    });

    server.express.post('/register', async(req: Request, res: Response, next) => {
        if(!emailRegEx.test(req.body.email)){
            res.send(new CustomError(USER_ERROR, USER_EMAIL_INVALID));
        }

        if(!passwordRegEx.test(req.body.password)){
            res.send( new CustomError(USER_ERROR, USER_PASSWORD_REQUIREMENTS));
        }

        if(req.body.password.trim() !== req.body.confirmPassword.trim()){
            res.send( new CustomError(USER_ERROR, USER_COMFIRM_PASSWORD));
        }

        let newUser = new User(
            req.body.email,
            await bcrypt.hash(req.body.password, 11)
        );

        const userExist = await session.query(User).whereEquals("email",req.body.email).firstOrNull();
        if (userExist) {
            res.send(new CustomError(USER_ERROR, USER_EXIST));
        } else {
            await session.store(newUser);
            await session.saveChanges();
        }

        const jwt = issueJwt(newUser);
        res.cookie('token', jwt.token, { httpOnly: false });
        res.header( "Access-Control-Allow-Origin" );
        res.send({
            id: newUser.id,
            email: newUser.email,
            confirmed: newUser.confirmed,
        })
    })

    server.express.post('/graphql', passport.authenticate('jwt',{session:false}),(req: Request, res: Response, next) => { next();})

    const app = await server.start({
        endpoint: "/graphql",
        playground: "/graphql",
        cors
    })
    console.log("Server running on http://localhost:4000");
    return app;
}

startServer();
