// import * as passportLocal from "passport-local";
// import * as bcrypt from "bcrypt";
import * as passportJwt from "passport-jwt";
import * as fs from "fs";
import * as path from "path";
import request from "graphql-request";
import {User} from "../entity/user/User";

// const LocalStrategy = passportLocal.Strategy;

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
const pathToKey = path.join(__dirname, '../..', 'id_rsa_pub.pem')
console.log(pathToKey);
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8')


export const passportInit = (passport) => {
    /*
    --------------------------------------------
    -------------- Local Strategy --------------
    --------------------------------------------

    passport.use(new LocalStrategy({usernameField: "email"}, async (email, password, done) => {
        const user = await UserRepository.findUserByEmail(email);
        if (user == null) {
            return done(null, false, {message: 'No user with this email'});
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false, {message: 'Password incorrect'});
            }
        } catch (e) {
            return done(e);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    passport.deserializeUser(async (id, done) => {
        return done(null, await UserRepository.findUserByID(id));
    })
     */

    /*
    --------------------------------------------
    -------------- Jwt Strategy --------------
    --------------------------------------------

     */

    let cookieExtractor = function (req){
        let token = null;
        if(req && req.cookies){
            token = req.cookies["token"]
        }
        return token;
    }

    const jwtOptions: passportJwt.StrategyOptions = {
        jwtFromRequest: cookieExtractor,
        secretOrKey: PUB_KEY,
        algorithms: ['RS256']
    };


    passport.use(new JwtStrategy(jwtOptions, ((payload, done) => {
        User.findUserByID(payload.sub)
            .then(user => {
                if(user){
                    return done(null, user)
                }
                else{
                    return done(null, false);
                }
            })
            .catch(error => {
                done(error,null);
            });
    })));
}